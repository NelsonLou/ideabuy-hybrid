<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="挂失成功" :back-to-web="true"></header-bar>
    </div>
    <div class="container">
       <div class="minBox">
          <img class="successImg" src="../../../assets/img/lossSuccessImg.png">
          <div class="successP"><span>恭喜你，挂失成功</span></div>
          <button class="successBtn" @click="goBack">返回上一级</button>
       </div>
    </div>
  </div>
</template>
<style scoped>
  .container {
    padding-top: 96px;
    width:100vw;
    min-height:100vh;
  }
  .minBox { 
    margin: 0 40px 0 40px;
  }
  .successImg {
    width: 21rem;
    height: 13.9rem;
    display: block;
    margin: 0 auto;
    margin-top: 9.5rem;
  }
  .successP {
    margin-top: 4.5rem;
    text-align: center;
    font: 36px PingFangSC-Regular;
    color: #212121;
  }
  .successBtn {
    width: 100%;
    height: 80px;
    border: none;
    border-radius: 10px;
    background-color: #FF8C56;
    color: white;
    font: 28px PingFangSC-Regular;
    margin-top: 7.5rem;
  }
</style>
<script>
  import eventhub from '../../../assets/js/eventhub'
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
    goBack() {
        this.$router.go(-1)
        eventhub.$emit('backword')
    }
  },
    components: {
      headerBar
    }
  }
</script>
