<template>
<div class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="挂失/解挂" :back-to-app="true"></header-bar>
  </div>
  <div class="container">
    <div class="loss-head">
      <img class="head-img" src="../../../assets/img/icon_loss.png">
      <div class="headMinBox">
        <ul class="minBox-ul">
          <li class="minBox-li">
            <span>
                 <div class="minBox-or">免费</div>
                 <div class="minBox-font">资费标准</div>
                </span>
          </li>
          <li class="minBox-li">
            <span>
                 <div class="minBox-or">正常使用</div>
                 <div class="minBox-font">当前状态</div>
                </span>
          </li>
          <li class="minBox-li">
            <span>
                 <div class="minBox-or">立即生效</div>
                 <div class="minBox-font">生效方式</div>
                </span>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <div class="loss-body">
        <div>
          <p class="lossBody-contOne-h">业务介绍</p>
          <p class="lossBody-contOne">挂失/解挂业务时中国联通为用户提供一项特殊服务功能，用户 在遇到手机遗失或失窃情况下，为防止手机被恶意呼叫而为用户提供的一种保护手段。
            </br>
            挂失/解挂是一项免费业务，用户挂失号码或解挂号码不收取任 何功能费，不过挂失后，任然按正常状态时收取套餐合其他业务费用。
          </p>
        </div>
        <button @click="go" class="lossBody-btn">立即挂失</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>
<style scoped>
   ul, menu, dir {
    display: block;
    list-style-type: disc;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
}
  .minBox-ul {
    list-style: none;
    width: 100%;
    overflow: hidden;
  }
  .minBox-li {
    width: 33.3%;
    float: left;
    margin: 80px 0 30px 0;
    text-align: center; 
  }
  .container {
    padding-top: 96px;
    width:100vw;
    min-height:100vh;
    background: #fff;
  }
  .head-img {
    display: block;
    width: 342px;
    height: 278px;
    margin: 50px auto;
  }
  .loss-head {
    margin: 0 40px 0 40px;
    border-bottom: 1px solid #e5e5e5;
  }
  .headMinBox {
    width: 100%;
  }
  .minBox-font {
    font: 24px MicrosoftYaHei;
    color: #212121;
    margin-top: 20px;
  }
  .minBox-top {
    margin-top: 23px;
  }
  .minBox-or {
    color: #FF8C56;
    font: 28px MicrosoftYaHei;
  }
  .loss-body{
    margin: 40px 40px 0 40px;
  }
  .lossBody-contOne {
    font: 24px MicrosoftYaHei;
    color: #999999;
    -webkit-margin-before: 40px;
    -webkit-margin-after: 0em;
    line-height: 46px;
  }
  .lossBody-contOne-h {
    color: #212121;
    font: 28px MicrosoftYaHei;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
  }
  .lossBody-btn {
    background-color: #FF8C56;
    width: 100%;
    border: none;
    border-radius: 10px;
    height: 88px;
    font: 28px MicrosoftYaHei;
    color: #ffffff;
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
  .lossBody-contTow-h {
    color: #212121;
    font-size: 28px;
    -webkit-margin-before: 50px;
    -webkit-margin-after: 0em;
  }
</style>
<script>
import {
  setScroll,
  setupWebViewJavascriptBridge
} from '../../../assets/js/common'
import headerBar from '../../../components/header-bar.vue'
export default {
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  mounted() {
    setupWebViewJavascriptBridge((bridge) => {
      bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {})
    })
  },
  methods: {
    go() {
      this.$router.push('/lossSuccess')
    }
  },
  components: {
    headerBar
  }
}
</script>
