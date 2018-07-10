<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="账单分期"
                  :back-to-web="true"></header-bar>
      <div class="fix-height"></div>
    </div>
    <div class="container">
      <div class="order-group">
        <div class="order"
             v-for="(order,index) in orderList">
          <div class="circle-container"
               @click="chose(index)"
               :class="{actived:mySelected[index]!=null}">
            <div class="circle"><span
              class="icon icon-right"></span>
            </div>
          </div>
          <div class="order-right">
            <div style="width:18rem;">
              <div class="line1">
                {{order.goods_name}}
              </div>
              <div class="line2">
                {{order.created_date}}
              </div>
            </div>
            <div class="money">
              ￥{{order.order_amount}}
            </div>
          </div>
        </div>
      </div>
      <div class="img-container"
           v-if="orderList.length==0">
        <img
          src="../../../assets/img/no-order.png">
        <div
          style="color:#999;font-size:28px;margin-top:30px;">
          没有账单可以分期
        </div>
      </div>
    </div>
    <div class="footer my-fixed">
      <div
        style="height:20px;background:#eee;"></div>
      <div class="circle-container"
           :class="{actived:ifAllCheck}"
           @click="checkAll">
        <div class="circle"><span
          class="icon icon-right"></span></div>
      </div>
      <div class="footer-detail">
        <span>总金额</span>
        <span style="color:#ff8c56;">￥{{total_money}}</span>
      </div>
      <div class="btn"
           :class="{actived:ifCheckOne}"
           @click="toByStages">确认分期
      </div>
    </div>
    <by-stages :show="byStagesShow"
               @close="close"
               :data="stages"
               :money="total_money"
               :orderSn="orderSn"
               @byStagesOver="byStagesOver"
    ></by-stages>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .fix-height {
    background: #eee;
    height: 1rem;
  }

  .container {
    padding-top: 96px;
    padding-bottom: 120px;
    width: 100vw;
    min-height: 100vh;
    color: #282828;
    .order-group {
      margin-top: 1rem;
      background: #fff;
      .order {
        height: 150px;
        border-bottom: 1px solid #ddd;
        .circle-container {
          width: 6rem;
          float: left;
          height: 150px;
          position: relative;
          .circle {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -20px;
            margin-top: -20px;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            background: #ddd;
            text-align: center;
            line-height: 45px;
            color: #ddd;
          }
          &.actived {
            .circle {
              color: #fff;
              background: #ff8c56;
            }
          }
        }
        &:last-child {
          border-bottom: none;
        }
        .order-right {
          display: flex;
          justify-content: space-between;
          padding: 0 2rem 0 0;
          .line1 {
            margin-top: 36px;
            font-size: 28px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .line2 {
            margin-top: 20px;
            font-size: 28px;
            color: #aaa;
          }
          .money {
            font-size: 32px;
            line-height: 150px;
          }
        }
      }
    }
    .img-container {
      text-align: center;
      padding-top: 20vh;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    width: 100%;
    height: 120px;
    .btn {
      position: absolute;
      right: 0;
      top: 20px;
      height: 100px;
      width: 11rem;
      text-align: center;
      line-height: 100px;
      color: #fff;
      background: #dbdbdb;
      font-size: 28px;
      &.actived {
        background: #ff8c56;
      }
    }
    .circle-container {
      width: 6rem;
      float: left;
      height: 100px;
      position: relative;
      .circle {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -20px;
        margin-top: -20px;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        background: #ddd;
        text-align: center;
        padding: 10px 0;
        color: #ddd;
      }
      &.actived {
        .circle {
          color: #fff;
          background: #ff8c56;
        }
      }
    }
    .footer-detail {
      height: 100px;
      padding-right: 13rem;
      /*line-height: 100px;*/
      font-size: 32px;
      display: flex;
      align-items: center;
    }
  }
</style>
<script>
  import headerBar from '../../../components/header-bar.vue'
  import byStages from '../components/by-stages.vue'
  import eventhub from '../../../assets/js/eventhub'
  import {setScroll} from '../../../assets/js/common'
  export default{
    beforeRouteLeave(to, from, next) {
      setScroll()
      next()
    },
    data () {
      return {
        byStagesShow: false,
        stages: [],
        mySelected: [],
        orderSn: '',
        myTotalMoney: 0.00
      }
    },
    computed: {
      orderList () {
        return this.$store.state.bill.orderList
      },
      ifAllCheck () {
        if (this.mySelected.length === 0) {
          return false
        }
        for (let i = 0; i < this.mySelected.length; i++) {
          if (this.mySelected[i] === null) {
            return false
          }
        }
        return true
      },
      ifCheckOne () {
        for (let i = 0; i < this.mySelected.length; i++) {
          if (this.mySelected[i]) {
            return true
          }
        }
      },
      total_money () {
        let money = 0
        for (let i = 0; i < this.mySelected.length; i++) {
          if (this.mySelected[i] !== null) {
            money += parseFloat(this.mySelected[i].order_amount)
          }
        }
        return money.toFixed(2)
      }
    },
    methods: {
      chose (index) {
        if (this.mySelected[index] === null) {
          this.$set(this.mySelected, index, this.orderList[index])
        } else {
          this.$set(this.mySelected, index, null)
        }
      },
      checkAll () {
        if (this.ifAllCheck === true) {
          for (let i = 0; i < this.mySelected.length; i++) {
            this.$set(this.mySelected, i, null)
          }
        } else {
          for (let i = 0; i < this.orderList.length; i++) {
            this.$set(this.mySelected, i, this.orderList[i])
          }
        }
      },
      init () {
        for (let i = 0; i < this.orderList.length; i++) {
          this.$set(this.mySelected, i, null)
        }
      },
      toByStages () {
        if (this.ifCheckOne) {
          let orderSn = []
          for (let i = 0; i < this.mySelected.length; i++) {
            if (this.mySelected[i]) {
              orderSn.push(this.mySelected[i].order_sn)
            }
          }
          this.orderSn = orderSn.join(',')

          if (this.myTotalMoney === this.total_money) {
            this.byStagesShow = true
            return
          }
          this.axios.post('/user-getinstalltypeplan', {
            amount: this.total_money
          }).then(res => {
            if (res) {
              this.myTotalMoney = this.total_money
              this.stages = res.data
              this.byStagesShow = true
            }
          })
        }
      },
      close () {
        this.byStagesShow = false
      },
      byStagesOver () {
        this.close()
        this.$router.go(-1)
        eventhub.$emit('backword')
        eventhub.$emit('repayment_refresh')
      }
    },
    activated () {
      this.mySelected = []
      this.init()
    },
    components: {
      headerBar,
      byStages
    }
  }
</script>
