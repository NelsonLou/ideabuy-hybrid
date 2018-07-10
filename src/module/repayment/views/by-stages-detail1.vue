<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="分期明细"
                  :back-to-web="true"></header-bar>
    </div>
    <div class="container">
      <div class="banner">
        <div class="title">分期剩余应还（元）</div>
        <div class="money">
          <occupy
            :data="byStageDetail.surplus_should_pay"
            :config="config.money">
            {{byStageDetail.surplus_should_pay}}
          </occupy>
        </div>
        <!--<div class="total-money" v-occupy="{data:detailText,config:config.detail}">-->
        <div class="total-money">
          <occupy :data="detailText"
                  :config="config.detail">
            {{detailText}}
          </occupy>
        </div>
      </div>
      <div class="detail"
           @click="goByStagesDetail">
        <div class="label">分期明细</div>
        <div class="date">
          <!--<span v-occupy="{data:dateDetail,config:config.date}" v-if="test"></span>-->
          <div style="display: inline-block">
            <occupy :config="config.date"
                    :data="dateDetail">
              {{dateDetail}}
            </occupy>
          </div>
          <span
            class="icon icon-arrow-right"></span>
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
        color: #212121;
        margin-top: 42px;
      }
      .total-money {
        margin-top: 46px;
        font-size: 24px;
        color: #999;
      }
    }
    .detail {
      padding: 0 2rem;
      margin-top: 1rem;
      background: #fff;
      display: flex;
      justify-content: space-between;
      font-size: 28px;
      height: 88px;
      line-height: 88px;
      .date {
        span {
          color: #999;
          &.icon {
            margin-left: 1rem;
            font-size: 24px;
          }
        }
      }
    }
  }
</style>
<script type="es6">
  import headerBar from '../../../components/header-bar.vue'
  import occupy from '../../../components/occupy.vue'
  import {setScroll} from '../../../assets/js/common'
  export default{
    name: 'byStagesDetail1',
    beforeRouteLeave(to, from, next) {
      setScroll()
      next()
    },
    data () {
      return {
        config: {
          money: {
            width: '14rem',
            height: '82px',
            margin: '0 auto'
          },
          detail: {
            width: '11rem',
            height: '27px',
            margin: '0 auto'
          },
          date: {
            width: '5rem',
            height: '32px',
            display: "inline-block"
          }
        },
        test: true
      }
    },
    computed: {
      byStageDetail () {
        return this.$store.state.bill.byStagesDetail
      },
      detailText () {
        return this.byStageDetail.total_plan_pay_fee ? '分期总额' + this.byStageDetail.total_plan_pay_fee + '（含手续费' + this.byStageDetail.total_service_fee + '）' : ''
      },
      dateDetail () {
        return (this.byStageDetail.real_pay_month === 0 || this.byStageDetail.real_pay_month) ? '已还' + this.byStageDetail.real_pay_month + '期' : ''
      }
    },
    methods: {
      goByStagesDetail () {
        this.$router.push('/repayment/by-stages-detail1/by-stages-detail2')
      }
    },
    components: {
      headerBar,
      occupy
    }
  }
</script>
