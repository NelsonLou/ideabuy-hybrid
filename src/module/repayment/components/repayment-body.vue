<template>
  <div>
    <div v-show="index==0">
      <div class="banner">
        <div class="month">
          <occupy
            :data="res.account.info.real_month"
            :config="config.month">
            {{res.account.info.real_month}}月剩余应还
          </occupy>
        </div>
        <div class="total-money">
          <occupy
            :data="res.account.info.total_should_pay_fee"
            :config="config.money">
            {{res.account.info.total_surplus_pay_fee}}
          </occupy>
        </div>
        <div class="date">
          <occupy
            :data="res.account.info.plan_pay_date"
            :config="config.date">
            还款日{{res.account.info.plan_pay_date}}
          </occupy>
        </div>
        <div class="repay-money-container">
          <div>
            <div class="title">本月账单金额</div>
            <div class="money">
              <occupy
                :data="res.account.info.total_surplus_pay_fee"
                :config="config.date">
                {{res.account.info.total_should_pay_fee}}
              </occupy>
            </div>
          </div>
          <div>
            <div class="title">本月已还金额</div>
            <!--<div class="money" v-occupy="{data:res.account.info.total_real_pay_fee,config:config.date}"></div>-->
            <div class="money">
              <occupy
                :data="res.account.info.total_real_pay_fee"
                :config="config.date">
                {{res.account.info.total_real_pay_fee}}
              </occupy>
            </div>
          </div>
        </div>
      </div>
      <div class="order-group">
        <div class="order"
             v-for="item in res.account.install_list"
             @click="goByStagesDetail(item)">
          <div class="order-left">
            <div class="line1">
              {{item.title}}
            </div>
            <div class="line2">
              <div class="date">
                {{item.current_month}}/{{item.month}}期
              </div>
              <div class="status">
                账单分期
              </div>
            </div>
          </div>
          <div class="order-right">
            <span class="money">{{item.bill_pay_fee}}</span>
            <span
              class="icon icon-arrow-right"></span>
          </div>
        </div>
        <div class="order"
             v-for="item in res.account.uninstall_list"
             @click="goOrderDetail(item)">
          <div class="order-left">
            <div class="line1">
              {{item.goods_name}}
            </div>
            <div class="line2">
              <div class="date">
                {{item.created_date}}
              </div>
            </div>
          </div>
          <div class="order-right">
            <span class="money">{{item.order_amount}}</span>
            <span
              class="icon icon-arrow-right"></span>
          </div>
        </div>
        <div
          v-if="res.account.info.total_overdue_fee!='0.00'">
          <div class="order"
               @click="goOverdueDetail">
            <div class="order-left">
              <div
                style="color:#de0000;line-height:120px;">
                逾期总金额（含违约金）
              </div>
            </div>
            <div class="order-right">
              <span class="money">{{res.account.info.total_overdue_fee}}</span>
              <span
                class="icon icon-arrow-right"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="img-container"
           v-if="res.account.install_list.length==0&&res.account.uninstall_list.length==0&&res.account.info.total_overdue_fee=='0.00'">
        <img
          src="../../../assets/img/no-order.png">
        <div class="img-text">无消费记录</div>
      </div>
    </div>
    <div v-show="index!=0">
      <div class="banner banner-1">
        <div class="month">
          <occupy
            :data="res.unaccount.info.real_month"
            :config="config.month">
            {{res.unaccount.info.real_month}}月剩余应还
          </occupy>
        </div>
        <div class="total-money">
          <occupy
            :data="res.unaccount.info.total_plan_pay_fee"
            :config="config.money">
            {{res.unaccount.info.total_plan_pay_fee}}
          </occupy>
        </div>
        <div class="date">
          <occupy
            :data="res.unaccount.info.plan_pay_date"
            :config="config.date">
            还款日{{res.unaccount.info.plan_pay_date}}
          </occupy>
        </div>
      </div>
      <div class="order-group">
        <div class="order"
             v-for="item in res.unaccount.install_list"
             @click="goByStagesDetail(item)">
          <div class="order-left">
            <div class="line1">
              {{item.title}}
            </div>
            <div class="line2">
              <div class="date">
                {{item.current_month}}/{{item.month}}期
              </div>
              <div class="status">账单分期</div>
            </div>
          </div>
          <div class="order-right">
            <span class="money">{{item.plan_pay_fee}}</span>
            <span
              class="icon icon-arrow-right"></span>
          </div>
        </div>
        <div class="order"
             v-for="item in res.unaccount.uninstall_list"
             @click="goOrderDetail(item)">
          <div class="order-left">
            <div class="line1">
              {{item.goods_name}}
            </div>
            <div class="line2">
              <div class="date">
                {{item.created_date}}
              </div>
            </div>
          </div>
          <div class="order-right">
            <span class="money">{{item.order_amount}}</span>
            <span
              class="icon icon-arrow-right"></span>
          </div>
        </div>
      </div>
      <div class="img-container img-container-1"
           v-if="res.unaccount.install_list.length==0&&res.unaccount.uninstall_list.length==0">
        <img
          src="../../../assets/img/no-order.png">
        <div class="img-text">无消费记录</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .img-container {
    margin-top: 40px;
    text-align: center;
    &.img-container-1 {
      margin-top: 100px;
    }
    .img-text {
      margin-top: 36px;
      color: #8e8e8e;
      font-size: 28px;
    }
  }

  .banner {
    &.banner-1 {
      padding-bottom: 60px;
    }
    position: relative;
    padding: 64px 0 200px 0;
    color: #fff;
    text-align: center;
    background-image: url('../assets/img/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    .month {
      font-size: 32px;
    }
    .total-money {
      margin-top: 54px;
      font-size: 72px;
    }
    .date {
      color: #ff8c56;
      font-size: 28px;
      margin-top: 46px;
    }
    .repay-money-container {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 140px;
      width: 100%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      justify-content: space-between;
      > div {
        text-align: center;
        width: 50%;
        height: 140px;
        .title {
          margin-top: 32px;
          font-size: 28px;
          color: #dbdbdb;
        }
        .money {
          margin-top: 20px;
          font-size: 28px;
          color: #fff;
        }
      }
    }
  }

  .order-group {
    margin-top: 20px;
    .order {
      height: 120px;
      background: #fff;
      border-bottom: 1px solid #ddd;
      padding-left: 2rem;
      &:last-child {
        border: none;
      }
      .order-left {
        float: left;
        height: 120px;
        width: 22rem;
        font-size: 28px;
        .line1 {
          color: #282828;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          padding-top: 24px;
        }
        .line2 {
          margin-top: 10px;
          > div {
            display: inline-block;
            &.date {
              color: #979797;
              line-height: 38px;
            }
            &.status {
              text-align: center;
              border-radius: 10px;
              color: #fff;
              font-size: 24px;
              height: 38px;
              line-height: 38px;
              background: #61a5d4;
              width: 126px;
            }
          }
        }
      }
      .order-right {
        padding-right: 3.5rem;
        text-align: right;
        line-height: 120px;
        position: relative;
        .icon {
          position: absolute;
          line-height: 120px;
          top: 0;
          right: 2rem;
          color: #979797;
        }
        .money {
          font-size: 28px;
          color: #282828;
        }
      }
    }
  }
</style>
<script>
  import occupy from '../../../components/occupy.vue'
  export default{
    props: ['index', 'res'],
    data () {
      return {
        config: {
          month: {
            width: '11rem',
            height: '36px',
            margin: '0 auto',
            background: '#3c3c3c'
          },
          money: {
            width: '14rem',
            height: '82px',
            margin: '0 auto',
            background: '#3c3c3c'
          },
          date: {
            width: '11rem',
            height: '32px',
            margin: '0 auto',
            background: '#3c3c3c'
          }
        }
      }
    },
    methods: {
      goAllBills () {
        this.$router.push('/repayment/all-bills')
      },
      goByStagesDetail (item) {
        console.log(item)
        this.$store.commit('loading_setDelay', true)
        this.$store.dispatch('bill_getByStagesDetail', item.contract_sn)
        this.$router.push(`/repayment/by-stages-detail1`)
      },
      goOrderDetail (item) {
        this.$store.commit('bill_setOrderDetail', item)
        this.$router.push('/repayment/order-detail')
      },
      goOverdueDetail () {
        this.$router.push(`/repayment/overdue-detail?date=${this.res.account.info.date}`)
      }
    },
    components: {
      occupy
    }
  }
</script>
