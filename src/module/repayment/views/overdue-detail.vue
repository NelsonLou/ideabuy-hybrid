<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="逾期详情"
                  :back-to-web="true"></header-bar>
    </div>
    <div class="container">
      <div class="banner">
        <div class="title">逾期总金额（元）</div>
        <div class="money">
          <occupy
            :data="overdueDetail.total_overdue_fee"
            :config="config.money">
            {{overdueDetail.total_overdue_fee}}
          </occupy>
        </div>
        <div class="total-money"><occupy :data="this.overdueDetail.total_overdue_fee" :config="config.text">逾期总金额{{this.overdueDetail.total_overdue_fee}}（包含违约金）</occupy></div>
      </div>
      <div
        style="color:#999;line-height:80px;font-size:24px;padding-left:2rem;">
        账单金额包含违约金
      </div>
      <div class="group">
        <div class="order"
             v-for="item in overdueDetail.install_list">
          <div class="order-title">
            {{item.title}}
          </div>
          <div style="color:#de0000">
            ￥{{item.overdue_fee}}
          </div>
        </div>
        <div class="order"
             v-for="item in overdueDetail.uninstall_list">
          <div class="order-title">
            {{item.title}}
          </div>
          <div style="color:#de0000">
            ￥{{item.overdue_fee}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .container {
    padding-top: 96px;
    min-height: 100vh;
    width: 100vw;
    .banner {
      padding: 30px 0;
      text-align: center;
      background: #fff;
      .title {
        font-size: 28px;
        color: #212121;
      }
      .money {
        font-size: 72px;
        color: #de0000;
        margin-top: 42px;
      }
      .total-money {
        margin-top: 46px;
        font-size: 24px;
        color: #999;
      }
    }
    .group {
      background: #fff;
      > div {
        line-height: 100px;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        padding: 0 2rem;
        font-size: 28px;
        &:last-child {
          border-bottom: none;
        }
        .order-title {
          width: 22rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
</style>
<script type="es6">
  import {
  	setScroll,
    requestURLparas
  } from '../../../assets/js/common'
  import headerBar from '../../../components/header-bar.vue'
  import occupy from '../../../components/occupy.vue'
  export default{
    beforeRouteLeave(to, from, next) {
      setScroll()
      next()
    },
    data () {
      return {
        overdueDetail: {
          total_overdue_fee: '',
          install_list: [],
          uninstall_list: []
        },
        config: {
          money: {
            width: '14rem',
            height: '82px',
            margin: '0 auto'
          },
          text: {
            width: '11rem',
            height: '27px',
            margin: '0 auto'
          }
        }
      }
    },
    computed: {
      overdueText () {
        return this.overdueDetail.total_overdue_fee ? `逾期总金额${this.overdueDetail.total_overdue_fee}（含服务费、违约金）` : ''
      }
    },
    activated () {
      this.$store.commit('loading_setDelay', true)
      this.axios.get(`/user-overdueinfo?date=${requestURLparas('date')}`).then(res => {
        if (res) {
          this.overdueDetail = res.data
        }
      })
    },
    components: {
      headerBar,
      occupy
    }
  }
</script>
