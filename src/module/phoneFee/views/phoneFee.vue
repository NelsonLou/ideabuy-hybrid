<template>
<div class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="话费充值" :back-to-app="true">
      <!-- <div class="my-opeartion" @click="goInvoice">
        发票
      </div> -->
    </header-bar>
    <tab bar-active-color="#ff8c56" active-color="#ff8c56">
      <tab-item :selected="index === 0" @on-item-click="tabChange">手机
      </tab-item>
      <tab-item :selected="index === 1" @on-item-click="tabChange">固话
      </tab-item>
      <tab-item :selected="index === 2" @on-item-click="tabChange">宽带
      </tab-item>
    </tab>
  </div>
  <div class="container">
    <phone-fee-body :index="index" :recharge="recharge"></phone-fee-body>
    <div class="footer">
      <div class="label">温馨提示</div>
      <div class="tips">
        <div class="text" v-html="tips"></div>
        <div class="more">
          <span @click="openTips">{{isOpenTips ? '收起' : '更多'}}</span>
        </div>
      </div>
      <div class="footer-btn">
        <span @click="handleRechargeCard">{{recharge ? '交话费' : '充值卡充值'}}</span>
        <span></span>
        <span @click="goMyIndent">我的订单</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
const tipsClose = '<p>1. 充值话费24小时到账，若充值失败将在48小时内退款。</p><p>2. 手机营业厅交费功能适用于中国联通手机、无线上网卡、固定电话、宽带捆绑的固话。</p>'
const tipsOpen = '<p>1. 充值话费24小时到账，若充值失败将在48小时内退款。</p><p>2. 手机营业厅交费功能适用于中国联通手机、无线上网卡、固定电话、宽带捆绑的固话。</p><p>3. 宽带交费只适用于普通宽带包月交费，暂不支持宽带包年交费功能。</p><p>4. 尊敬的用户，中国联通手机营业厅暂不支持4G用户使用统一宽带编码进行宽带直冲、充值业务。</p>'
import {
  setScroll,
  setupWebViewJavascriptBridge
} from '../../../assets/js/common'
import headerBar from '../../../components/header-bar.vue'
import submitBtn from '../../../components/submit-btn.vue'
import {
  Tab,
  TabItem
} from 'vux'
import phoneFeeBody from '../components/phone-fee-body.vue'
export default {
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  data() {
    return {
      index: 0,
      recharge: false,
      isOpenTips: false,
      tips: tipsClose
    }
  },
  methods: {
    goInvoice() {
      this.$router.push('/phoneFee/invoice')
      console.log('1')
    },
    tabChange(index) {
      this.index = index
    },
    handleRechargeCard() {
      this.recharge = !this.recharge
      this.index = 0
    },
    openTips() {
      this.isOpenTips = !this.isOpenTips
      if (this.isOpenTips) {
        this.tips = tipsOpen
      } else {
        this.tips = tipsClose
      }
    },
    goMyIndent() {
      this.$router.push('/phoneFee/myIndent')
    }
  },
  mounted() {
    setupWebViewJavascriptBridge((bridge) => {
      bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {})
    })
  },
  components: {
    headerBar,
    Tab,
    TabItem,
    submitBtn,
    phoneFeeBody
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.my-opeartion {
    font-size: 28px;
    padding-right: 1.5rem;
}
.container {
    padding-top: 176px;
    width: 100vw;
    min-height: 100vh;
    background: #fff;
}
.footer {
    width: 100%;
    padding: 20px 40px 0;
    & .label {
        height: 42px;
        width: 140px;
        color: #212121;
        font-size: 28px;
        padding: 5px 0 9px;
    }
    & .tips {
        & .text {
            color: #ccc;
            font-size: 20px;
            font-style: normal;
            font-weight: normal;
        }
        & .more {
            color: #999;
            font-size: 22px;
            text-align: right;
            margin-top: 30px;
            padding-right: 16px;
        }
    }
    & .footer-btn {
        padding: 80px 0;
        text-align: center;
        font-size: 27px;
        color: #3978d6;
        & span {
            display: inline-block;
            vertical-align: top;
            height: 32px;
            line-height: 32px;
            font-size: 28px;
        }
        span:nth-child(2) {
            width: 2px;
            margin: 0 15px;
            height: 32px;
            display: inline-block;
            border-left: 2px solid #ccc;
        }
    }
}
</style>
