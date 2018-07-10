<template>
<div class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="添加银行卡" :back-to-web="page_type==='0'?true:false" :back-operation="page_type==='1'?true:false" :back-to-app="page_type==='2'?true:false" @backOperation="backOperation"></header-bar>
  </div>
  <div class="container">
    <div class="prompt">
      为保障资金安全，请填写持卡本人信息
    </div>
    <div class="form">
      <div>
        <div class="item-title">持卡人</div>
        <div class="item-name">{{nickname}}
        </div>
        <span class="icon icon-circle-exclamatory" @click="showAlert" style="color:#3978d6"></span>
      </div>
      <div>
        <input type="number" placeholder="请输入您的银行卡卡号" v-model="bankCard">
        <!--<div class="icon icon2" @click="confirmShow=true"></div>-->
        <span class="icon icon-circle-ask" style="color:#bdbdbd" @click="showBank"></span>
      </div>
      <!--<div @click="choseBank">-->
      <!--<div>银行选择<span class="color-gray" :class="{actived:bank.length!=0}">{{bank.length==0?'请选择':bankName}}</span>-->
      <!--</div>-->
      <!--<span class="icon icon-arrow-right"></span>-->
      <!--</div>-->
      <div>
        <input type="number" placeholder="请输入您的银行预留手机号" v-model="phone">
        <!-- <div>
          {{phone}}
        </div> -->
      </div>
      <div class="code">
        <input type="number" placeholder="请输入验证码" v-model="code">
        <div class="get-code-btn" :class="{actived:actived}" @click="getCode">
          {{timing?time+' S':'获取'}}
        </div>
      </div>
    </div>
    <div class="safe">
      沃白条智能加密，保障您的用卡安全， <span style="color:#4885d1" @click="showSafe">了解安全保障</span>
    </div>
    <div class="footer-btn">
      <submit-btn :title="submitText" :disabled="disabled" @submit="goNext"></submit-btn>
    </div>
  </div>
  <!--<popup-picker :show="bankShow" :data="bankArr" v-model="bank"-->
  <!--@on-hide="bankShow=false" :show-name="true" :show-cell="false"></popup-picker>-->
  <div v-transfer-dom>
    <alert v-model="bankShow" title="支持的银行">
      <div class="bank-alert">
        <div v-for="bank in bankArr">
          <img :src="bank.bank_logo" alt="" style="vertical-align: middle;"><span>{{bank.bank_name}}</span>
        </div>
      </div>
    </alert>
  </div>
  <toast text="添加银行卡成功" :show="toastShow" @cb="cb"></toast>
</div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
.bank-alert {
    max-height: 35rem;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}

.color-gray {
    color: #ddd;
    margin-left: 2rem;
    &.actived {
        color: #282828;

    }
}

.container {
    padding-top: 96px;
    min-height: 100vh;
    width: 100vw;
    .prompt {
        padding-left: 2rem;
        height: 100px;
        font-size: 28px;
        color: #fff;
        background: #000;
        line-height: 100px;
    }
    .form {
        background: #fff;
        padding-left: 2rem;
        > div {
            position: relative;
            height: 120px;
            line-height: 120px;
            font-size: 28px;
            border-bottom: 1px solid #dcdcdc;
            padding-right: 5rem;
            &:last-child {
                border: none;
            }
            &.code {
                padding-right: 0;
                input {
                    width: 20rem;
                }
                .get-code-btn {
                    position: absolute;
                    top: 50%;
                    right: 0;
                    height: 88px;
                    line-height: 88px;
                    margin-top: -44px;
                    border-left: 1px solid #dcdcdc;
                    padding: 0 2.7rem;
                    color: #ddd;
                    &.actived {
                        color: #000;
                    }
                }
            }
            input {
                width: 100%;
                &::-webkit-input-placeholder {
                    color: #ddd;
                    font-size: 28px;
                }
            }
            .icon {
                position: absolute;
                top: 50%;
                right: 2rem;
                margin-top: -1rem;
                border-radius: 50%;
                font-size: 40px;
                &.icon-arrow-right {
                    font-size: 30px;
                    margin-top: -15px;
                    color: #ccc;
                }
            }
        }
        .item-title {
            float: left;
            margin-right: 2.9rem;
        }
        .item-name {
            float: left;
        }
    }
    .safe {
        margin-top: 2.2rem;
        font-size: 24px;
        padding-left: 2rem;
        color: #999;
    }
    .footer-btn {
        border-top: 1px solid transparent;
        margin-top: 1.6rem;
        padding: 0 2rem;
    }
}
</style>
<script type="es6">
import headerBar from '../../../components/header-bar.vue'
import submitBtn from '../../../components/submit-btn.vue'
import toast from '../../../components/toast.vue'
import eventhub from '../../../assets/js/eventhub'
import {
  requestURLparas,
  setScroll,
  setupWebViewJavascriptBridge,
  getToken
} from '../../../assets/js/common'
import {
  PopupPicker,
  Alert,
  TransferDomDirective as TransferDom
} from 'vux'
export default {
  directives: {
    TransferDom
  },
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  data() {
    return {
      toastShow: false,
      bankArr: [],
      //        bank: [],
      nickname: '',
      bankCard: '',
      bankShow: false,
      phone: '',
      code: '',
      timer: null,
      time: 60,
      timing: false,
      //        submitText: requestURLparas('to') === '' ? '提交' : '下一步',
      submitText: '',
      back_type: requestURLparas('type') ? requestURLparas('type') : '0',
      is_linkman: requestURLparas('is_linkman') ? requestURLparas('is_linkman') : '',
      //        type: requestURLparas('to') === '' ? '2' : '1',
      confirmShow: false,
      page_type: requestURLparas('page_type') === '' ? '0' : requestURLparas('page_type'), // 0:通过银行卡列表绑定银行卡  1：认证流程（有残忍拒绝提示）  2：还款页面跳过来（无残忍拒绝提示）
      auth: {}
    }
  },
  computed: {
    disabled() {
      if (this.bankCard !== '' && this.code !== '') {
        return false
      }
      return true
    },
    actived() {
      if (this.timing || !this.bankCard) {
        return false
      }
      return true
    }
    //      bankName () {
    //        for (let i = 0; i < this.bankArr[0].length; i++) {
    //          if (this.bankArr[0][i].value === this.bank[0]) {
    //            return this.bankArr[0][i].name
    //          }
    //        }
    //        return ''
    //      }
  },
  activated() {
    this.dataInit()
  },
  methods: {
    dataInit() {
      this.bankCard = ''
      this.code = ''
    },
    cb() {
      this.toastShow = false
      if (this.page_type === '0') {
        eventhub.$emit('bank-card-reload')
        this.$router.go(-1)
      } else {
        if (this.submitText === '提交') {
          setupWebViewJavascriptBridge((bridge) => {
            bridge.callHandler('WKJSBridge_RefreshRepayment', {}, () => {})
          })
          if (this.back_type === '1') {
            setupWebViewJavascriptBridge((bridge) => {
              bridge.callHandler('WKJSBridge_dismiss', {}, () => {})
            })
          } else {
            setupWebViewJavascriptBridge((bridge) => {
              bridge.callHandler('WKJSBridge_back', {}, () => {})
            })
          }
        } else {
          this.$router.push(`/bankCard/addCard/addPeople?type=${this.back_type}&page_type=${this.page_type}`)
        }
      }
    },
    backOperation() {
      let me = this
      this.$vux.confirm.show({
        content: `<div>确定退出申请吗？</div>
                  <div>急速审核，最快一分钟放款</div>`,
        cancelText: '残忍拒绝',
        confirmText: '继续申请',
        onCancel() {
          if (me.back_type === '1') {
            setupWebViewJavascriptBridge((bridge) => {
              bridge.callHandler('WKJSBridge_dismiss', {}, () => {})
            })
          } else if (me.back_type === '0') {
            setupWebViewJavascriptBridge((bridge) => {
              bridge.callHandler('WKJSBridge_back', {}, () => {})
            })
          }
        }
      })
    },
    showBank() {
      this.bankShow = true
    },
    //      choseBank () {
    //        this.bankShow = true
    //      },
    getCode() {
      if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        this.$vux.alert.show({
          title: '提示',
          content: `手机号码有误，请重填`
        })
        return
      }
      if (this.actived === true) {
        this.axios.post('/sms-send', {
          type: '4',
          mobile: this.phone
        })
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
    luhmCheck(bankno) {
      if (bankno.length < 16 || bankno.length > 19) {
        return false
      }
      var num = /^\d*$/
      if (!num.exec(bankno)) {
        return false
      }

      var strBin = '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99'
      if (strBin.indexOf(bankno.substring(0, 2)) === -1) {
        return false
      }
      var lastNum = parseInt(bankno.substr(bankno.length - 1, 1))

      var first15Num = bankno.substr(0, bankno.length - 1)
      var newArr = []
      for (var i = first15Num.length - 1; i > -1; i--) {
        newArr.push(first15Num.substr(i, 1))
      }
      var arrJiShu = []
      var arrJiShu2 = []

      var arrOuShu = []
      for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 === 1) {
          if (parseInt(newArr[j]) * 2 < 9) {
            arrJiShu.push(parseInt(newArr[j]) * 2)
          } else {
            arrJiShu2.push(parseInt(newArr[j]) * 2)
          }
        } else {
          arrOuShu.push(newArr[j])
        }
      }

      var jishuChild1 = []
      var jishuChild2 = []
      for (var h = 0; h < arrJiShu2.length; h++) {
        jishuChild1.push(parseInt(arrJiShu2[h]) % 10)
        jishuChild2.push(parseInt(arrJiShu2[h]) / 10)
      }

      var sumJiShu = 0
      var sumOuShu = 0
      var sumJiShuChild1 = 0
      var sumJiShuChild2 = 0
      var sumTotal = 0
      for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m])
      }

      for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n])
      }

      for (var p = 0; p < jishuChild1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishuChild1[p])
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishuChild2[p])
      }

      sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2)

      var k = parseInt(sumTotal) % 10 === 0 ? 10 : parseInt(sumTotal) % 10
      var luhm = 10 - k

      if (lastNum === luhm) {
        return true
      } else {
        return false
      }
    },
    goNext() {
      if (this.disabled) {
        return
      }
      //        if (!this.luhmCheck(this.bankCard)) {
      //          this.$vux.alert.show({
      //            title: '提示',
      //            content: `银行卡不符合规则`
      //          })
      //          return
      //        }
      this.axios.post('/user-cardadd', {
        card_number: this.bankCard,
        card_mobile: this.phone,
        code: this.code
      }).then(res => {
        if (res) {
          if (res.code === 1) {
            this.toastShow = true
            setupWebViewJavascriptBridge((bridge) => {
              bridge.callHandler('WKJSBridge_refreshAuthInfo', {
                is_pay_password: this.auth.is_pay_password,
                is_bankcard: '1',
                is_linkman: this.auth.is_linkman
              }, () => {})
            })
          } else if (res.code === 10146) {
            let me = this
            this.$vux.confirm.show({
              content: '暂不支持该银行',
              confirmText: '查看解决方案',
              onConfirm() {
                me.$vux.alert.show({
                  title: '绑卡失败解决方案',
                  content: `<div style="text-align:left;">1.请与发卡行确认您的发卡行的身份证号，姓名，银行卡号，预留手机号（网银预留手机号或快捷支付手机号）是否与您填写的信息一致</div>
                              <div style="text-align:left;">2.请确保您已开通银联在线支付（无卡支付），您可以通过发卡行的客服电话或网上银行或柜面开通银联在线支付或个人电脑登录中国银联网站：https://www.95516.com/portal/open/init.do?entry=open 开通银联在线支付</div>`
                })
              }
            })
          }
        }
      })
    },
    showAlert() {
      this.$vux.alert.show({
        title: '持卡人说明',
        content: `<div>为保障账户资金安全，只能绑定</div><div>认证用户本人的银行卡</div>`
      })
    },
    showSafe() {
      this.$vux.alert.show({
        title: '安全保障',
        content: `<div style="margin-bottom:2rem;text-align: left">1.安全保障：账户保护。实时监控。紧急冻结等多重金融安全保障。</div>
                    <div style="margin-bottom:2rem;text-align: left">2.双重认证：每次付款均验证支付密码，大额支付还需短信验证。</div>
                    <div style="margin-bottom:2rem;text-align: left">3.隐私保护：高强度数据加密，保护用户隐私信息</div>
                    <div style="margin-bottom:2rem;text-align: left">4.支付理赔：沃白条安全由华夏国投保险承担</div>
                    <div style="margin-bottom:2rem;text-align: left">5.了解详情，请致电中国联通客服10010</div>`
      })
    },
    initSubmitText() {
      if (this.page_type === '0') {
        this.submitText = '提交'
      } else {
        this.submitText = '下一步'
        if (this.auth.is_linkman === '1') {
          this.submitText = '提交'
        }
      }
    }
  },
  mounted() {
    setupWebViewJavascriptBridge((bridge) => {
      bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {})
      bridge.callHandler('WKJSBridge_passAuthInfo', {}, (res) => {
        if (typeof res === 'string') {
          res = JSON.parse(res)
        }
        this.auth = res
        this.initSubmitText()
      })
      bridge.callHandler('WKJSBridge_forbidSwipeBack', {}, () => {})
    })
    getToken().then(() => {
      this.$store.commit('loading_setDelay', true)
      this.axios.get('user-card').then(res => {
        if (res) {
          this.nickname = res.data.real_name
          this.bankArr = res.data.bank
          this.phone = res.data.user_mobile
        }
      })
    })
  },
  components: {
    headerBar,
    submitBtn,
    PopupPicker,
    Alert,
    toast
  }
}
</script>
