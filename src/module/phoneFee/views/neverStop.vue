<template>
<div class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="永不停机" :back-to-web="true">
    </header-bar>
  </div>
  <div class="never_banner">
    <img src="../images/never_img_banner@2x.png" alt="">
  </div>
  <div class="contaienr">
    <div class="never_current">
      <div class="never_left">
        <span>1</span>
        <img src="../images/never_img1@2x.png" alt="">
      </div>
      <div class="never_right">
        <h3>开通永不停机，畅通无忧</h3>
        <p>永不停机是由联通集团和华夏国投共同提供的手机话费自动充值及消费信贷服务</p>
      </div>
    </div>
    <div class="never_current">
      <div class="never_left">
        <span>2</span>
        <img src="../images/never_img2@2x.png" alt="">
      </div>
      <div class="never_right">
        <h3>话费余额不足，自动充值</h3>
        <p>优先使用“沃白条”额度为手机充值话费，若是后付费用户，同时开通月末话费代扣业务。</p>
      </div>
    </div>
    <div class="never_current">
      <div class="never_left">
        <span>3</span>
        <img src="../images/never_img3@2x.png" alt="">
      </div>
      <div class="never_right">
        <h3>按时还款，畅享永不停机</h3>
        <p>使用信用额度充值，可享最长40天免息，按时还款，积累个人信用值</p>
      </div>
    </div>
    <div class="never_btn">
      <button type="button" @click="handleSubmit">立即开通</button>
    </div>
    <div class="never_prompt">
      <p>温馨提示:</p>
      <ol>
        <li>开通永不停机服务，即表示您认可每月沃白条支付话费100元，在出账日至还款日期间还款即可；</li>
        <li>开通永不停机服务支付的金额暂不能开取发票；</li>
        <li>只能成为当前登录并认证的联通手机号开通此服务；</li>
        <li>开通成功后的次月开始可取消开通此服务；</li>
      </ol>
    </div>
  </div>
</div>
</template>

<script>
import {
  setScroll,
  setupWebViewJavascriptBridge
} from '../../../assets/js/common'
import {
  AlertPlugin
} from 'vux'
import headerBar from '../../../components/header-bar.vue'
export default {
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  components: {
    headerBar,
    AlertPlugin
  },
  methods: {
    handleSubmit() {
      this.$vux.alert.show({
        content: '开通成功（测试）'
      })
      setTimeout(() => {
        this.$vux.alert.hide()
        setupWebViewJavascriptBridge((bridge) => {
          bridge.callHandler('WKJSBridge_back', {}, () => {})
        })
      }, 1500)
    }
  }
}
</script>

<style scoped lang="scss">
.never_banner {
    margin-top: 96px;
}

.never_banner img {
    width: 100%;
}
.never_current {
    overflow: hidden;
    margin: 40px 0;
    font-family: "微软雅黑";
    h3 {
        margin: 0;
        font-size: 31px;
        letter-spacing: 3px;
        font-weight: normal;
        color: #212121;
    }
    p {
        margin: 0;
        font-size: 28px;
        margin: 22px 0;
        color: #919191;
        letter-spacing: 2px;
    }
}
.never_current div {
    img {
        width: 100%;
    }
    span {
        display: block;
        width: 36px;
        height: 36px;
        line-height: 36px;
        border-radius: 50%;
        background: #549DFF;
        position: absolute;
        text-align: center;
        font-weight: bold;
        color: #fff;
        top: 0;
        left: 0;
    }
}
.never_btn {
    margin-bottom: 54px;
    button {
        width: 100%;
        height: 80px;
        border-radius: 10px;
        border: none;
        background: #FF8C56;
        color: #fff;
        font-size: 28px;
        letter-spacing: 3px;
    }
}
.contaienr {
    padding: 38px 40px;
    background: #fff;
}
.never_left {
    position: relative;
    float: left;
    margin-right: 24px;
    width: 36%;
}
.never_right {
    float: right;
    width: 59%;
}
.never_prompt {
    ol {
        margin: 30px 0;
        padding: 0 0 0 36px;
        font-size: 26px;
        color: #999999;
        li {
            line-height: 55px;
            letter-spacing: 1px;
        }
    }
    p {
        margin: 0;
        color: #212121;
        font-size: 32px;
        font-weight: normal;
        font-family: "微软雅黑";
    }
}
</style>
