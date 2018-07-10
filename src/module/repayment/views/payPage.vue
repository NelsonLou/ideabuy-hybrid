<template>
<div class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="支付页面"></header-bar>
  </div>
  <div class="container">
    <div class="money">
      <div class="title">
        支付金额
      </div>
      <div class="money-text">
        ￥{{payPageInfo.amount}}
      </div>
    </div>
    <div class="group-container">
      <div class="card-icon">
        <img :src="payPageInfo.choseCard.bank_logo" width="100" height="100">
      </div>
      <div class="card-detail">
        <div class="line1">
          {{payPageInfo.choseCard.bank_name}}
        </div>
        <div class="line2">
          尾号{{payPageInfo.choseCard.card_number.slice(payPageInfo.choseCard.card_number.length-4)}}借记卡
        </div>
      </div>
    </div>
    <div class="group-container" style="height:80px;display:block;">
      <div class="label">
        验证码
      </div>
      <div class="message">
        <input type="number" placeholder="请输入验证码,验证码已发送至您手机上" v-model="code">
        <!-- <div class="message-btn" @click="getCode" :class={actived:!timing}>
          {{timing?time+' S':'获取'}}
        </div> -->
      </div>
    </div>
    <div class="btn-container">
      <div class="btn-left" @click="pay('2')">
        取消支付
      </div>
      <div class="btn-right" @click="pay('1')">
        立即支付
      </div>
    </div>
  </div>
  <toast text="支付成功" :show="toastShow" @cb="cb"></toast>
</div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
.container {
    padding-top: 96px;
    width: 100vw;
    min-height: 100vh;
    background: #fff;
    font-size: 28px;
    .money {
        .title {
            padding-top: 40px;
        }
        .money-text {
            padding-top: 20px;
            font-size: 48px;
            color: #ff8c56;
        }
        text-align: center;
    }
    .group-container {
        height: 120px;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        margin-top: 20px;
        display: flex;
        padding: 0 2rem;
        align-items: center;
        position: relative;
        .card-icon {
            display: flex;
            align-items: center;
        }
        .card-detail {
            .line1 {}
            .line2 {
                color: #aaa;
                margin-top: 15px;
            }
        }
        .label {
            position: absolute;
            height: 80px;
            display: flex;
            align-items: center;
        }
        .message {
            display: flex;
            justify-content: space-between;
            padding-left: 100px;
            height: 80px;
            align-items: center;
            margin-left: 0.5rem;
            input {
                width: 25rem;
            }
            .message-btn {
                border-left: 1px solid #ddd;
                width: 100px;
                text-align: center;
                line-height: 60px;
                float: right;
                color: #aaa;
                &.actived {
                    color: #282828;
                }
            }
        }
    }
    .btn-container {
        margin-top: 80px;
        display: flex;
        justify-content: center;
        > div {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 10rem;
            border-radius: 15px;
            height: 60px;
            background: #ff8c56;
            color: #fff;
        }
        .btn-left {
            margin-right: 2rem;
        }
    }
}
</style>
<script>
import {
  setScroll
} from '../../../assets/js/common'
import headerBar from '../../../components/header-bar.vue'
import toast from '../../../components/toast.vue'
import eventhub from '../../../assets/js/eventhub'
export default {
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  data() {
    return {
      timer: null,
      time: 60,
      timing: false,
      code: '',
      toastShow: false
    }
  },
  computed: {
    payPageInfo() {
      return this.$store.state.bill.payPageInfo
    }
  },
  methods: {
    getCode() {
      if (this.timing === false) {
        this.timing = true
        this.timer = setInterval(() => {
          this.time--
            if (this.time === 0) {
              clearInterval(this.timer)
              this.timing = false
              this.time = 60
            }
        }, 1000)
      }
    },
    pay(status) {
      if (status === '1' && this.code === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请输入验证码'
        })
        return
      }
      this.axios.post('kft-confirmpay', {
        confirmFlag: status,
        card_mobile: this.payPageInfo.card_mobile,
        smsCode: this.code,
        amount: this.payPageInfo.amount,
        orderNo: this.payPageInfo.orderNo
      }).then(res => {
        if (res.code === 1) {
          this.toastShow = true
        } else {
          this.$router.go(-1)
          eventhub.$emit('backword')
          eventhub.$emit('repayment_alert_failed')
        }
      })
    },
    cb() {
      this.toastShow = false
      this.$router.go(-1)
      eventhub.$emit('backword')
      eventhub.$emit('repayment_refresh')
    }
  },
  activated() {
    this.code = ''
  },
  components: {
    headerBar,
    toast
  }
}
</script>
