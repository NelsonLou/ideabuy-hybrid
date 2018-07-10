<template>
<div class="my-header-bar" :class="{dark:dark}" :style="noBorder?'border-style:none;':''" ref="headerBar" name="headerBar">
  {{title}}
  <div class="back" v-if="backToWeb||backToApp||backOperation" @click="goBack">
    <!--<span class="icon-arrow-left"></span>-->
    <img src="../assets/img/icon_back@3x.png" width="14" height="24">
  </div>
  <div class="operation">
    <slot></slot>
  </div>
</div>
</template>
<style scoped lang="scss">
.my-header-bar {
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*z-index: 100;*/
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 96px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    font-size: 32px;
    // line-height: 96px;
    &.dark {
        color: #fff;
        border-bottom-style: none;
        background-color: #000;

        .back {
            color: #fff;
        }
    }

    .back {
        position: absolute;
        z-index: 1001;
        top: 0;
        left: 0;
        width: 100px;
        height: 96px;
        line-height: 96px;
    }

    .operation {
        position: absolute;
        top: 0;
        right: 0;
        height: 96px;
        line-height: 96px;
    }
}
</style>
<script>
import eventhub from '../assets/js/eventhub'
import {
  setupWebViewJavascriptBridge
} from '../assets/js/common'
export default {
  props: ['title', 'backToWeb', 'backToApp', 'backOperation', 'dark', 'noBorder'],
  methods: {
    goBack() {
      console.log('后退')
      if (this.backToWeb === true) {
        //          window.myScrollTop = document.body.scrollTop
        //          document.querySelectorAll('body #identity div')[0].style.top = '-' + window.myScrollTop + 'px'
        //          document.getElementsByName('headerBar')[0].style.position = 'absolute'
        //          document.getElementsByName('headerBar')[0].style.top = window.myScrollTop + 'px'
        this.$router.go(-1)
        eventhub.$emit('backword')
        //          setupWebViewJavascriptBridge((bridge) => {
        //            bridge.callHandler('  WKJSBridge_showNavigationBar', {}, () => {})
        //          })
        return
      } else if (this.backToApp === true) {
        setupWebViewJavascriptBridge((bridge) => {
          bridge.callHandler('WKJSBridge_back', {}, () => {})
        })
        return
      } else if (this.backOperation === true) {
        this.$emit('backOperation')
      }
    }
  },
  mounted() {
    //      window.addEventListener('touchmove', () => {
    //        this.$refs.headerBar.style.position = 'fixed'
    //        this.$refs.headerBar.style.top = 0 + 'px'
    //      })
  }
}
</script>
