<template>
<div class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="我的账单" :back-to-app="true">
      <div class="my-opeartion" @click="goAllBills">
        全部账单
      </div>
    </header-bar>
    <tab bar-active-color="#ff8c56" active-color="#ff8c56">
      <tab-item selected @on-item-click="tabChange">已出账
      </tab-item>
      <tab-item @on-item-click="tabChange">未出账
      </tab-item>
    </tab>
  </div>
  <div class="container">
    <repayment-body :index="index" :res="res"></repayment-body>
  </div>
  <div class="footer my-fixed">
    <div class="footer-btn">
      <submit-btn :title="index==0?'立即还款':'去分期'" @submit="submit" :disabled="(res.account.info.total_surplus_pay_fee=='0.00'||res.account.info.total_surplus_pay_fee=='')&&index==0"></submit-btn>
    </div>
  </div>
  <payment :money="res.account.info.total_surplus_pay_fee" :cardList="cardList" :pay_type="pay_type"></payment>
</div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
.my-opeartion {
    font-size: 28px;
    padding-right: 1.5rem;
}

.tab-container {
    z-index: 1;
    position: fixed;
    top: 88px;
    left: 0;
    width: 100%;
}

.container {
    padding-top: 184px;
    padding-bottom: 140px;
    width: 100vw;
    min-height: 100vh;
}

.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: space-between;
    background: #fff;
    .footer-btn {
        padding: 16px 2rem;
        border-top: 1px solid transparent;
        width: 100%;
    }
}
</style>
<script type="es6">
import {
  setScroll,
  setupWebViewJavascriptBridge,
  getToken
} from '../../../assets/js/common'
import headerBar from '../../../components/header-bar.vue'
import submitBtn from '../../../components/submit-btn.vue'
import {
  Tab,
  TabItem
} from 'vux'
import payment from '../components/payment.vue'
import repaymentBody from '../components/repayment-body.vue'
import eventhub from '../../../assets/js/eventhub'
export default {
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  data() {
    return {
      index: 0,
      res: {
        account: {
          info: {
            is_pay_off: '',
            plan_pay_date: '',
            real_month: '',
            total_overdue_fee: '0.00',
            total_real_pay_fee: '',
            total_should_pay_fee: '',
            total_surplus_pay_fee: ''
          },
          install_list: [],
          uninstall_list: []
        },
        unaccount: {
          info: {
            plan_pay_date: '',
            real_month: '',
            total_plan_pay_fee: ''
          },
          install_list: [],
          uninstall_list: []
        }
      },
      cardList: [],
      auth: {},
      pay_type: '1'
    }
  },
  methods: {
    dataInit() {
      this.res = {
        account: {
          info: {
            is_pay_off: '',
            plan_pay_date: '',
            real_month: '',
            total_overdue_fee: '0.00',
            total_real_pay_fee: '',
            total_should_pay_fee: '',
            total_surplus_pay_fee: ''
          },
          install_list: [],
          uninstall_list: []
        },
        unaccount: {
          info: {
            plan_pay_date: '',
            real_month: '',
            total_plan_pay_fee: ''
          },
          install_list: [],
          uninstall_list: []
        }
      }
    },
    goAllBills() {
      this.$router.push('/repayment/all-bills')
    },
    goByStages() {
      this.$store.commit('bill_setOrderList', this.res.unaccount.uninstall_list)
      this.$router.push('/repayment/by-stages')
    },
    submit() {
      if (this.index === 1) {
        this.goByStages()
      } else {
        // 判断是否有未通过的认证信息
        //          for (let i = 0; i < this.auth.length; i++) {
        //            if (requestURLparas(this.auth[i]) === '0') {
        //              console.log('有未通过信息')
        //              setupWebViewJavascriptBridge((bridge) => {
        //                bridge.callHandler('WKJSBridge_handleAuthState', {}, () => {
        //                })
        //              })
        //              return
        //            }
        //          }
        for (let key in this.auth) {
          if (this.auth[key] === '0') {
            setupWebViewJavascriptBridge((bridge) => {
              bridge.callHandler('WKJSBridge_handleAuthState', {}, () => {})
            })
            return
          }
        }
        this.$store.commit('bill_togglePayment', true)
      }
    },
    tabChange(index) {
      this.index = index
    },
    getData() {
      this.axios.get('/user-repaymentsindex').then(res => {
        this.res = res.data.bill_list
        this.cardList = res.data.user_card
        this.pay_type = res.data.pay_type
      })
    }
  },
  mounted() {
    console.log(this.auth)
    setupWebViewJavascriptBridge((bridge) => {
      bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {})
      bridge.registerHandler('WKJSBridge_getAuthState', (res) => {
        if (typeof res === 'string') {
          res = JSON.parse(res)
        }
        this.auth = res
        this.getData()
      })
      bridge.registerHandler('WKJSBridge_repaymentPayAlert', () => {
        this.$vux.alert.show({
          title: '提示',
          content: '为了您的资金安全，您的还款金额将在12小时内核实到账，届时页面自动更新，请随时关注，给您带来的不便敬请谅解！！'
        })
      })
      bridge.callHandler('WKJSBridge_RefreshRepayment', {}, () => {})
    })
    getToken().then(() => {
      this.getData()
    })
    eventhub.$on('repayment_refresh', () => {
      this.dataInit()
      this.getData()
    })
    eventhub.$on('repayment_alert_failed', () => {
      setTimeout(() => {
        this.$vux.alert.show({
          title: '提示',
          content: '支付失败'
        })
      },500)
    })
    //      document.body.addEventListener('touchend', () => {
    //        alert(document.body.scrollTop)
    //      })
  },
  components: {
    headerBar,
    Tab,
    TabItem,
    submitBtn,
    payment,
    repaymentBody
  }
}
</script>
