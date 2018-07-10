<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="在线客服" :back-to-app="true"></header-bar>
    </div>
    <div class="container">
       <img v-if="imgO" class="online" src="../../../assets/img/onlineServiceOneT.png">
       <img v-if="imgO" @click="go" class="online" src="../../../assets/img/onlineServiceOneO.png">
       <img v-if="imgT" @click="black" class="online" src="../../../assets/img/onlineServiceTwo.png">

    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .container {
    padding-top: 96px;
    width: 100vw;
    min-height: 100vh;
  }
  .online {
    width: 100%;
    height: 100%;
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
    data: () => ({
       imgO: true,
       imgT: false
    }),
    methods: {
      backOut () {
         setupWebViewJavascriptBridge((bridge) => {
            bridge.callHandler('WKJSBridge_back', {}, () => {
            })
        })
      },
       go() {
         this.imgO = false
         this.imgT = true
       },
       black() {
         this.imgO = true
         this.imgT = false
       }
    },
    components: {
      headerBar
    }
  }
</script>
