<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="网点查询" :back-to-app="true"></header-bar>
    </div>
    <div class="container">
       <div class="webInput">
         <span class="icon-search icon"></span>
         <input type="text" placeholder="请输入查询地址">
       </div>
    </div>
  </div>
</template>
<style scoped>
  .container {
    padding-top: 96px;
    width:100vw;
    min-height:100vh;
    background: url(../../../assets/img/webImg.png) no-repeat center center fixed;
    background-size: 100%;
  }
  .webInput {
    width: 31.5rem;
    height: 3.8rem;
    background: white;
    border-radius: 10px;
    margin-left: 1rem;
    margin-top: 16px;
  }
  .icon {
    font-size: 30px;
    margin: 0 12px 0 16px;
    line-height: 3.8rem;
  }
  .webInput input {
    font-size: 28px;
    color: #212121;
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
        bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {
        })
      })
    },
    components: {
      headerBar
    }
  }
</script>
