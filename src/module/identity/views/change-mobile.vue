<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="更改手机号" :back-to-web="true"></header-bar>
    </div>
    <div class="container">
      <div class="header">
        <div class="photo" :style="'background-image:url('+user_portrait+')'"></div>
        <div class="text">水水水哥</div>
      </div>
      <div class="body">
        <div class="group">
          <div class="label">新手机号：</div>
          <div><input type="number" placeholder="输入要绑定的手机号" v-model="phone"></div>
        </div>
        <div class="group">
          <div class="label">短信验证码：</div>
          <div><input type="number" placeholder="请输入验证码" v-model="code"></div>
          <div class="get-code" :class="{actived:actived}" @click="getCode">{{timing?time+' S':'获取'}}</div>
        </div>
      </div>
      <div class="footer">
        <submit-btn title="确定" @submit="submit" :disabled="disabled"></submit-btn>
      </div>
    </div>
    <toast :show="show" text="手机绑定成功！" @cb="cb"></toast>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .container {
    padding-top: 96px;
    width: 100vw;
    min-height: 100vh;
    .header {
      background: #fff;
      text-align: center;
      padding: 2.3rem 0;
      .photo {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        display: inline-block;
        background-color: #ddd;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
      .text {
        font-size: 28px;
        color: #999;
        margin-top: 1rem;
      }
    }
    .body {
      margin-top: 1rem;
      background: #fff;
      .group {
        border-bottom: 1px solid #ddd;
        font-size: 28px;
        color: #212121;
        position: relative;
        &:last-child {
          border-bottom: none;
        }
        &::after {
          content: '';
          display: block;
          clear: both;
        }
        > div {
          float: left;
          line-height: 100px;
          input {
            padding-left: 1rem;
          }
        }
        .label {
          padding-left: 2rem;
          color: #222;
        }
        .get-code {
          position: absolute;
          top: 50%;
          right: 0;
          margin-top: -34px;
          color: #ddd;
          padding: 0 2.7rem;
          border-left: 1px solid #ddd;
          line-height: 68px;
          &.actived {
            color: #212121;
          }
        }
      }
    }
    .footer {
      border-top: 1px solid transparent;
      margin-top: 3rem;
      padding: 0 2rem;
    }
  }
</style>
<script type="es6">
  import headerBar from '../../../components/header-bar.vue'
  import submitBtn from '../../../components/submit-btn.vue'
  import toast from '../../../components/toast.vue'
  import {setScroll, requestURLparas} from '../../../assets/js/common'
  import eventhub from '../../../assets/js/eventhub'
  export default{
    data () {
      return {
        timer: null,
        time: 60,
        timing: false,
        phone: '',
        code: '',
        user_portrait: decodeURIComponent(requestURLparas('photo')),
        show: false
      }
    },
    computed: {
      mobile () {
        const myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
        return myreg.test(this.phone)
      },
      actived () {
        if (!this.mobile || this.timing) {
          return false
        }
        return true
      },
      disabled () {
        if (!this.mobile || !this.code) {
          return true
        }
        return false
      }
    },
    beforeRouteLeave (to, from, next) {
      setScroll()
      next()
    },
    activated () {
      this.phone = ''
      this.code = ''
    },
    methods: {
      getCode () {
        if (this.actived === true) {
          this.axios.post('/sms-send?myloading=false', {
            mobile: this.phone,
            type: 5
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
      submit () {
        if (!this.disabled) {
          this.axios.post('/user-changemobile', {
            user_mobile: this.phone,
            code: this.code
          }).then(res => {
            if (res) {
              this.show = true
              eventhub.$emit('identity-change-mobile', this.phone)
              setupWebViewJavascriptBridge((bridge) => {
                bridge.callHandler('WKJSBridge_refreshMineVC', {}, () => {})
              })
            }
          })
        }
      },
      cb () {
        this.show = false
        this.$router.go(-1)
      }
    },
    components: {
      headerBar,
      submitBtn,
      toast
    }
  }
</script>
