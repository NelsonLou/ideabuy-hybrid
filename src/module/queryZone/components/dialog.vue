<template>
  <div class="dialog" v-if="show"
       @touchmove="noScroll">
    <div class="container">
      <div class="title">
        <span
          class="icon icon-mobile-phone"></span>
        <span>身份验证</span>
      </div>
      <div class="content">
        <span
          class="user-name">185666666666</span>
        <span>用户，您好！</span>
        <p>该业务涉及个人信息，为保障安全，请输入短信验证码后查看。</p>
        <div class="dxmsg">
          <input type="number" v-model="msg"
                 placeholder="请输入短信验证码">
          <span class="btn"
                @click="sendOut">发送</span>
        </div>
        <input
          class="submit"
          :class="{'active-submit':msg != ''}"
          @click="submit" type="submit"
          value="提交验证">
        <p class="prompt">获取不到验证码，建议您立即反馈我们</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['show'],
    data: () => ({
      msg: ''
    }),
    methods: {
      noScroll (e) {
        e.preventDefault()
      },
      sendOut() {
        this.msg = ''
        for (var i = 0; i < 6; i++) {
          this.msg += Math.floor(Math.random() * 10)
        }
      },
      submit() {
        if (this.msg !== '') {
          console.log(123)
          this.$emit('submit', false)
        } else {
          return false
        }
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .dialog {
    position: fixed;
    top: 96px;
    z-index: 10000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    .container {
      position: relative;
      width: 80%;
      height: 605px;
      background: #FFF;
      border-radius: 10px;
      padding-left: 2rem;
      padding-right: 2rem;
      .title {
        font-size: 32px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        margin-top: 48px;
        margin-right: 1rem;
        .icon {
          margin-right: 16px;
          margin-top: 3px;
        }
      }
      .content {
        margin-top: 36px;
        .user-name {
          color: #FF865C;
          font-size: 28px;
        }
        span {
          color: #999;
          font-size: 28px;
        }
        p {
          margin-top: 26px;
          font-size: 28px;
          color: #999;
        }
        .dxmsg {
          margin-top: 36px;
          width: 100%;
          max-height: 88px;
          box-sizing: border-box;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          position: relative;
          input {
            width: 71%;
            height: 86px;
            font-size: 28px;
            text-indent: 28px;
            border: 1px solid #999;
            box-shadow: none;
            background:#fff;
            -webkit-appearance: none;
            outline: hidden;
            border-radius: 6px 0 0 6px;
          }
          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: 0;
            width: 29%;
            height: 86px;
            background: #FF865C;
            color: #FFF;
            margin-left: -10px;
            border-radius: 0 5px 5px 0;
          }
        }
        .submit {
          width: 100%;
          height: 88px;
          margin-top: 30px;
          color: #FFF;
          text-indent: 0;
          border-radius: 6px;
          font-size: 28px;
          background:#ddd;
        }
        .active-submit {
          background: #FF865C;
        }
        .prompt {
          color: #212121;
          margin-top: 1rem;
          font-size: 24px;
          text-align: center;
        }
      }
    }
  }
</style>
