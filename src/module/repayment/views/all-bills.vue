<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="全部账单"
                  :back-to-web="to==''"
                  :back-to-app="to!=''"
      ></header-bar>
    </div>
    <div class="container">
      <div v-for="(year,key) in all_bill_list">
        <div class="year">
          {{key}}年
        </div>
        <div class="bill-group">
          <div class="bill" v-for="item in year"
               @click="goDetail(key,item)">
            <div>
              <div class="line1">
                {{item.month}}月账单
              </div>
              <div class="line2">
                {{item.should_pay_fee}}
              </div>
            </div>
            <div>
            <span
              :class="{red:item.status_name=='逾期'}">{{item.status_name}}</span><span
              class="icon icon-arrow-right"></span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="all_bill_list.length==0"
           class="img-container">
        <img
          src="../../../assets/img/no-order.png">
        <div class="img-text">还没有历史账单</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .container {
    padding-top: 96px;
    width: 100vw;
    min-height: 100vh;
    .year {
      line-height: 86px;
      font-size: 28px;
      color: #9f9f9f;
      padding-left: 2rem;
    }
    .bill-group {
      .bill {
        background: #fff;
        border-bottom: 1px solid #ddd;
        height: 120px;
        display: flex;
        justify-content: space-between;
        padding: 0 2rem;
        > div {
          .line1 {
            font-size: 28px;
            color: #282828;
            margin-top: 24px;
          }
          .line2 {
            margin-top: 14px;
            color: #979797;
            font-size: 28px;
          }
          > span {
            line-height: 120px;
            font-size: 28px;
            color: #a5a5a5;
            &.red {
              color: #de0000;
            }
            &.icon {
              margin-left: 1rem;
              font-size: 24px;
            }
          }
        }
        &:last-child {
          border: none;
        }
      }
    }
    .img-container {
      text-align: center;
      margin-top: 10rem;
      .img-text {
        margin-top: 32px;
        font-size: 28px;
        color: #999;
      }
    }
  }
</style>
<script type="es6">
  import {
    setScroll,
    requestURLparas,
    setupWebViewJavascriptBridge
  } from '../../../assets/js/common'
  import headerBar from '../../../components/header-bar.vue'
  import eventhub from '../../../assets/js/eventhub'
  export default{
    beforeRouteLeave(to, from, next) {
      setScroll()
      next()
    },
    data () {
      return {
        all_bill_list: {},
        to: requestURLparas('to'),
        if_refresh: true
      }
    },
    methods: {
      goDetail (year, item) {
        this.$store.commit('loading_setDelay', true)
        this.$store.dispatch('bill_getMonthBill', item.date)
        this.$router.push(`/repayment/month-bill`)
      },
      getData () {
        if (this.if_refresh) {
          this.$store.commit('loading_setDelay', true)
          this.axios.get('/user-allbill').then(res => {
            if (res) {
              this.all_bill_list = res.data.account_list
              this.if_refresh = false
            }
          })
        }
      }
    },
    computed: {
//      ifEmpty () {
//        alert(JSON.stringify(this.all_bill_list))
//        return JSON.stringify(this.all_bill_list) === '{}'
//      }
    },
    mounted () {
      setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {
        })
      })
      eventhub.$on('refresh_allBills', () => {
        this.if_refresh = true
      })
    },
    activated () {
      this.getData()
    },
    components: {
      headerBar
    }
  }
</script>
