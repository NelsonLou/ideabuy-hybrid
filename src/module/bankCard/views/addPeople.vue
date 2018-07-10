<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="常用联系人"
                  :back-operation="page_type==='1'?true:false"
                  :back-to-app="page_type==='2'?true:false"
                  @backOperation="backOperation"></header-bar>
    </div>
    <div class="container">
      <div class="prompt">
        信息有误或不匹配，将影响授信额度！
      </div>
      <div class="form">
        <div>
          <div class="label">联系人</div>
          <input type="text"
                 placeholder="请输入联系人真实姓名"
                 v-model="nickname">
        </div>
        <div @click="getPhone">
          <div class="label">手机号码</div>
          <!--<input type="number"-->
          <!--placeholder="请输入手机号码"-->
          <!--v-model="phone">-->
          <div class="my-placeholder"
               :class="{gray:phone==''}">
            {{phone==''?'请选择手机号':phone}}
          </div>
        </div>
        <div @click="show=true">
          <div class="label">关系</div>
          <span class="color-gray"
                :class="{chosed:relation.length!=0}">{{relation.length==0?'请选择':relation[0]}}</span>
          <!--<div class="icon icon2"></div>-->
          <span
            class="icon icon-arrow-right"></span>
        </div>
      </div>
      <div class="safe">
        同意并签署 <span style="color:#4885d1"
                    @click="goCredit">《征信及综合授权书》</span>，授权联通查询、报送贷款信息至金融信用信息基础数据库。
      </div>
      <div class="footer-btn">
        <submit-btn title="同意协议并绑定"
                    :disabled="disabled"
                    @submit="submit"></submit-btn>
      </div>
    </div>
    <popup-picker :show="show" :show-cell="false"
                  :data="relationArr"
                  v-model="relation"
                  @on-hide="show=false"></popup-picker>
    <toast text="添加联系人成功" :show="toastShow"
           @cb="cb"></toast>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .container {
    padding-top: 96px;
    min-height: 100vh;
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
        height: 6rem;
        line-height: 6rem;
        font-size: 1.4rem;
        border-bottom: 1px solid #dcdcdc;
        padding-right: 5rem;
        &:last-child {
          border: none;
        }
        .label {
          display: inline-block;
          margin-right: 2.6rem;
        }
        .my-placeholder {
          display: inline-block;
          &.gray {
            color: #ddd;
          }
        }
        input {
          border: none;
          outline: none;
          width: 20rem;
          &::-webkit-input-placeholder {
            color: #ddd;
            font-size: 1.4rem;
          }
        }
        .icon {
          position: absolute;
          top: 50%;
          right: 2rem;
          margin-top: -1rem;
          border-radius: 50%;
          font-size: 2rem;
          &.icon-arrow-right {
            font-size: 1.5rem;
            margin-top: -0.75rem;
            color: #dbdbdb;
          }
        }
        .color-gray {
          color: #ddd;
          &.chosed {
            color: #000
          }
        }
      }
    }
    .safe {
      margin-top: 2.2rem;
      font-size: 1.2rem;
      padding: 0 2rem;
      color: #999;
      line-height: 2rem;
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
  import {PopupPicker} from 'vux'
  import toast from '../../../components/toast.vue'
  import {
    setScroll,
    setupWebViewJavascriptBridge,
    requestURLparas
  } from '../../../assets/js/common'
  export default{
    beforeRouteLeave (to, from, next) {
      setScroll()
      next()
    },
    data () {
      return {
        nickname: '',
        phone: '',
        relation: [],
        show: false,
        relationArr: [['亲人', '同事', '朋友']],
        toastShow: false,
        back_type: requestURLparas('type') ? requestURLparas('type') : '0',
        page_type: requestURLparas('page_type') === '' ? '0' : requestURLparas('page_type'),  // 0:通过银行卡列表绑定银行卡  1：认证流程  2：还款页面跳过来
        auth: {}
      }
    },
    computed: {
      disabled () {
        if (this.nickname !== '' && this.phone !== '' && this.relation.length !== 0) {
          return false
        }
        return true
      },
      mobile () {
        const myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
        return myreg.test(this.phone)
      },
      checkName () {
        if (/\d+/.test(this.nickname) || this.nickname.length > 12) {
          return false
        }
        return true
      }
    },
    methods: {
      submit () {
        if (!this.disabled) {
          if (!this.checkName) {
            this.$vux.alert.show({
              title: '提示',
              content: '联系人名字不能包含数字或长度大于12'
            })
            return
          }
          if (!this.mobile) {
            this.$vux.alert.show({
              title: '提示',
              content: '请填写格式正确的手机号码'
            })
            return
          }
          this.axios.post('/userlink-add', {
            link_man: this.nickname,
            link_mobile: this.phone,
            link_relation: this.relation[0]
          }).then(res => {
            if (res) {
              this.toastShow = true
              setupWebViewJavascriptBridge((bridge) => {
                bridge.callHandler('WKJSBridge_refreshAuthInfo', {
                  is_pay_password: this.auth.is_pay_password,
                  is_bankcard: this.auth.is_bankcard,
                  is_linkman: '1'
                }, () => {
                })
              })
            }
          })
        }
      },
      goCredit () {
        this.$router.push('/bankCard/addCard/addPeople/creditText')
      },
      backOperation () {
        let me = this
        this.$vux.confirm.show({
          content: `<div>确定退出申请吗？</div>
                  <div>急速审核，最快一分钟放款</div>`,
          cancelText: '残忍拒绝',
          confirmText: '继续申请',
          onCancel () {
            if (me.back_type === '1') {
              setupWebViewJavascriptBridge((bridge) => {
                bridge.callHandler('WKJSBridge_dismiss', {}, () => {
                })
              })
            } else if (me.back_type === '0') {
              setupWebViewJavascriptBridge((bridge) => {
                bridge.callHandler('WKJSBridge_back', {}, () => {
                })
              })
            }
          }
        })
      },
      cb () {
        this.toastShow = false
        if (this.back_type === '1') {
          setupWebViewJavascriptBridge((bridge) => {
            bridge.callHandler('WKJSBridge_dismiss', {}, () => {
            })
          })
        } else if (this.back_type === '0') {
          setupWebViewJavascriptBridge((bridge) => {
            bridge.callHandler('WKJSBridge_RefreshRepayment', {}, () => {
            })
          })
          setupWebViewJavascriptBridge((bridge) => {
            bridge.callHandler('WKJSBridge_back', {}, () => {
            })
          })
        }
      },
      getPhone () {
        setupWebViewJavascriptBridge((bridge) => {
          bridge.callHandler('WKJSBridge_peoplePicker', {}, (res) => {
            if (typeof res === 'string') {
              res = JSON.parse(res)
            }
            this.phone = res.mobile
          })
        })
      }
    },
    mounted () {
      setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {
        })
        bridge.callHandler('WKJSBridge_passAuthInfo', {}, (res) => {
          if (typeof res === 'string') {
            res = JSON.parse(res)
          }
          this.auth = res
        })
        bridge.callHandler('WKJSBridge_forbidSwipeBack', {}, () => {
        })
      })
    },
    components: {
      headerBar,
      submitBtn,
      PopupPicker,
      toast
    }
  }
</script>
