<template>
<div>
  <div class="top-space"></div>
  <div v-show="index === 0 || index === 1">
    <div class="form">
      <div>
        <input type="number" :placeholder="numberTips" v-model="phone" :class="{'before-input':phone === '', 'after-input':phone !== ''}">
        <span class="icon icon-linkman" @click="chosePhone"></span>
        <span class="text" v-show="phone.length >= 11">{{phoneMsg.user}}; 欠费金额: <tt>{{phoneMsg.arrearage}}</tt></span>
      </div>
      <div class="recharge" v-show="recharge">
        <input type="text" placeholder="请输入充值卡密码" v-model="rechargeCard">
      </div>
    </div>
    <div class="select" v-show="!recharge">
      <div @click="selectAmount(index)" v-for="(item,index) in selectFee" :key="item.amount" :class="{'bd-orange': phone.length !== 11, 'bd-gray': phone.length >= 11 && !selectFee[index].select, 'bg-orange': !isInputFocus && selectFee[index].select}">
        <p>{{item.amount}}元</p>
        <p>售价{{item.price}}元</p>
      </div>
      <div :class="selectBorder">
        <input type="number" :placeholder="isInputFocus ? '' : '其他金额'" v-model="otherAmount" :class="{mini: isInputFocus || otherAmount !== ''}" @focus="inputFocus(true)" @blur="inputFocus(false)">
        <tt v-show="isInputFocus || otherAmount !== ''">元</tt>
      </div>
    </div>
  </div>
  <div v-show="index === 2">
    <div class="form-net">
      <div>
        <input type="text" v-model="formNet.number" placeholder="请输入宽带拨号账号">
      </div>
      <div>
        <group>
          <x-address title="省份地市" v-model="formNet.city" raw-value :list="addressData" hide-district placeholder="请选择"></x-address>
        </group>
      </div>
      <div>
        <group>
          <popup-picker title="号码类型" :data="numberTypeList" v-model="formNet.numberType" placeholder="请选择"></popup-picker>
        </group>
      </div>
      <div>
        <label>￥</label>
        <input id="amount" type="text" v-model="formNet.amount" placeholder="交费金额">
      </div>
    </div>
  </div>
  <div class="submit">
    <submit-btn class="submit-btn" :title="'立即支付'" @submit="gotoPayNow" :disabled="!(!recharge && phone.length >= 11 && isSelect || phone.length >= 11 && otherAmount !== '' || formNet.number !== '' && formNet.amount !== '' || recharge && rechargeCard !== '')"></submit-btn>
  </div>
</div>
</template>
<script>
import submitBtn from '../../../components/submit-btn.vue'
import {
  Group,
  XAddress,
  PopupPicker
} from 'vux'
import addressList from '../../../assets/js/address'
import {
  setupWebViewJavascriptBridge
} from '../../../assets/js/common'
export default {
  props: ['index', 'recharge'],
  data() {
    return {
      phone: '',
      rechargeCard: '',
      phoneMsg: {
        user: 'Z*信(浙江 杭州)',
        arrearage: 62.42
      },
      selectFee: [{
          amount: '20',
          price: '20.00',
          select: false
        },
        {
          amount: '30',
          price: '30.00',
          select: false
        },
        {
          amount: '50',
          price: '50.00',
          select: false
        },
        {
          amount: '100',
          price: '100.00',
          select: true
        },
        {
          amount: '300',
          price: '300.00',
          select: false
        }
      ],
      otherAmount: '',
      isInputFocus: false,
      buy: {
        amount: 100,
        price: 100
      },
      addressData: addressList,
      numberTypeList: [
        ['与宽带绑定的固话', '宽带拨号账号', '统一宽带编码']
      ],
      formNet: {
        number: '',
        city: [],
        numberType: [],
        amount: ''
      }
    }
  },
  methods: {
    chosePhone() {
      setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler('WKJSBridge_peoplePicker', {}, (res) => {
          if (typeof res === 'string') {
            res = JSON.parse(res)
          }
          this.phone = res.mobile
        })
      })
    },
    clearSelect() {
      var s = this.selectFee
      for (let i = 0; i < s.length; i++) {
        s[i].select = false
      }
    },
    selectAmount(i) {
      this.clearSelect()
      this.otherAmount = ''
      this.selectFee[i].select = true
      this.buy = {
        amount: this.selectFee[i].amount,
        price: this.selectFee[i].price * 1
      }
    },
    inputFocus(bool) {
      if (bool) {
        this.clearSelect()
      }
      this.isInputFocus = bool
    },
    gotoPayNow() {
      var para = {
        name: '中国联通固话话费充值',
        desc: this.otherAmount === '' ? this.buy.price + ' 元' : this.otherAmount + ' 元',
        price: this.otherAmount === '' ? this.buy.price + ' 元' : this.otherAmount + ' 元'
      }
      if (this.index === 1) {
        para.name = '中国联通固话话费充值'
      } else if (this.index === 2) {
        para = {
          name: '中国联通宽带充值',
          desc: this.formNet.amount + ' 元',
          price: this.formNet.amount * 1 + ' 元'
        }
      } else {
        para.name = '中国联通手机话费充值'
      }
      if (!this.recharge && this.phone.length >= 11 && this.isSelect || this.phone.length >= 11 && this.otherAmount !== '' || this.formNet.number !== '' && this.formNet.amount !== '' || this.recharge && this.rechargeCard !== '') {
        this.$store.dispatch('submitPay', para)
        this.$router.push('/phoneFee/paynow')
      }
    }
  },
  computed: {
    numberTips: function() {
      return this.index === 0 ? '手机号码' : this.index === 1 ? '区号-固话号码' : ''
    },
    selectBorder: function() {
      return {
        'bd-orange': this.isInputFocus || this.phone.length < 11,
        'bd-gray': !this.isInputFocus && this.phone.length >= 11,
        other: true
      }
    },
    isSelect: function() {
      var s = this.selectFee
      for (let i = 0; i < s.length; i++) {
        if (s[i].select) {
          return true
        }
      }
      return false
    }
  },
  watch: {
    index: function(newVal) {
      this.phone = ''
      this.otherAmount = ''
    }
  },
  components: {
    submitBtn,
    Group,
    XAddress,
    PopupPicker
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.top-space {
    width: 100vw;
    height: 20px;
    background: #eee;
}
.form-net {
    background: #fff;
    padding: 0 2rem;
    > div {
        position: relative;
        font-size: 28px;
        height: 120px;
        line-height: 120px;
        border-bottom: 1px solid #dcdcdc;
        input {
            border: none;
            outline: none;
            width: 100%;
            padding-left: 0;
            &::-webkit-input-placeholder {
                color: #ddd;
                font-size: 28px;
            }
        }
        input:nth-child(2) {
            width: 85%;
            font-size: 36px;
            &::-webkit-input-placeholder {
                color: #ddd;
                font-size: 36px;
            }
        }
        label {
            font-size: 36px;
            margin-left: 10px;
            line-height: 105px;
        }
    }
}
.form {
    background: #fff;
    padding: 0 2rem;
    .recharge {
        height: 120px;
    }
    > div {
        position: relative;
        font-size: 48px;
        line-height: 120px;
        border-bottom: 1px solid #dcdcdc;
        padding-right: 5rem;
        input {
            border: none;
            outline: none;
            padding-left: 0;
            width: 30rem;
            &::-webkit-input-placeholder {
                color: #ddd;
                font-size: 36px;
            }
        }
        .before-input {
            height: 148px;
        }
        .after-input {
            height: 80px;
        }
        .icon {
            position: absolute;
            top: 50%;
            right: 10px;
            margin-top: -1rem;
            border-radius: 50%;
            font-size: 48px;
            color: #bdbdbd;
            &.icon-arrow-right {
                font-size: 1.5rem;
                margin-top: -0.75rem;
                color: #dbdbdb;
            }
        }
        .text {
            display: block;
            line-height: 20px;
            font-size: 20px;
            margin-top: -20px;
            color: #999;
            & tt {
                color: #f65a45;
            }
        }
    }
    div:nth-child(1) {
        height: 150px;
    }
}
.select {
    background: #fff;
    padding: 30px 40px 0;
    font-size: 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .bd-orange {
        border: 2px solid #ff8c56;
        & p {
            color: #212121;
        }
        p:nth-child(2) {
            color: #999;
        }
    }
    .bd-gray {
        border: 2px solid #ccc;
        & p {
            color: #212121;
        }
        p:nth-child(2) {
            color: #999;
        }
    }
    .bg-orange {
        background: #ff8c56;
        & p {
            color: #fff;
        }
        p:nth-child(2) {
            color: #fff;
        }
    }
    & div {
        display: inline-block;
        width: 31%;
        height: 120px;
        margin: 0 15px 18px 0;
        padding: 5px 0;
        vertical-align: top;
        & p {
            margin: 17px 0;
            font-size: 30px;
            color: #212121;
            text-align: center;
        }
        p:nth-child(2) {
            font-size: 25px;
            color: #999;
            margin: 0;
        }
    }
    div:nth-child(3),
    div:nth-child(6) {
        margin-right: 0;
    }
    .other {
        text-align: center;
        padding: 0;
        line-height: 120px;
        & input {
            width: 100%;
            height: 110px;
            line-height: 30px;
            font-size: 30px;
            color: #ff8c56;
            text-align: center;
            &::-webkit-input-placeholder {
                color: #212121;
                font-size: 30px;
            }
        }
        .mini {
            width: 100px !important;
            text-align: right;
            padding-right: 10px;
        }
        & tt {
            color: #ff8c56;
            font-size: 30px;
        }
    }
}
.submit {
    background: #fff;
    padding: 20px 2rem;
    .submit-btn {
        padding: 0 2rem;
        border-top: 1px solid transparent;
        width: 100%;
    }
}
</style>
<style media="screen" lang="scss" rel="stylesheet/scss">
.form-net {
    .vux-cell-box .weui-cell {
        line-height: 118px;
    }
    .weui-cell .vux-cell-primary {
        padding-left: 2rem;
    }
    .vux-popup-picker-select {
        overflow: hidden;
    }
    .vux-popup-picker-value {
        float: left;
    }
    .vux-cell-box .vux-popup-picker-placeholder {
        float: left;
    }
    .vux-cell-box .weui-cell,
    .weui-cell__hd {
        padding: 0;
        font-size: 28px;
    }
    .vux-cell-box .weui-cell label {
        color: #000;
    }
    .weui-cells:before {
        border-top: none;
    }
    .vux-no-group-title {
        margin-top: 0;
    }
    .weui-cells:after {
        border-bottom: none;
    }
    .weui-cell_access .weui-cell__ft:after {
        width: 16px;
        height: 16px;
    }
    .vux-popup-picker-value {
        margin-right: 15px;
    }
}
</style>
