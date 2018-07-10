<template>
  <div id="repayment">
    <transition :name="transitionName" @enter="enter" @after-enter="end">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import eventHub from '../../assets/js/eventhub.js'
  export default {
    name: 'repayment',
    data () {
      return {
        transitionName: '',
        back: false,
        forward_arr: [],
        back_arr: [],
        back_headerbar: null
      }
    },
    created () {
      eventHub.$on('backword', () => {
        console.log('触发backword事件')
        this.transitionName = 'slide-right'
        this.back = true
      })
    },
    watch: {
      '$route' (to, from) {
        if (from.name === null) {
          this.transitionName = ''
          return
        }
        if (this.back === true) {
          this.back = false
          return
        }
        if (to.name === undefined) {
          return
        }
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
//        if (this.transitionName === 'slide-left') {
//          eventHub.$emit('myRouter')
//        }
      }
    },
    methods: {
      enter () {
        // 前进
        this.forward_arr = document.querySelectorAll('.slide-left-enter-active .my-fixed')
        if (document.querySelector('.slide-left-enter-active') !== null) {
//          let bottom = document.querySelector('.slide-left-enter-active').offsetHeight - window.screen.availHeight * 2
          let bottom = document.querySelector('.slide-left-enter-active').offsetHeight - window.screen.availHeight * 2 + window.myFixedbottom
          for (let i = 0; i < this.forward_arr.length; i++) {
            this.forward_arr[i].style.position = 'absolute'
            this.forward_arr[i].style.bottom = bottom + 'px'
          }
        }
        // 后退
        this.back_arr = document.querySelectorAll('.slide-right-leave-active .my-fixed')
        if (document.querySelector('.slide-right-leave-active') !== null) {
          this.back_headerbar = document.querySelector('.slide-right-leave-active .header-bar')
          this.back_headerbar.style.position = 'absolute'
          this.back_headerbar.style.top = window.myScrollTop + 'px'
          let bottom = document.querySelector('.slide-right-leave-active').offsetHeight - window.screen.availHeight * 2 - window.myScrollTop + window.myFixedbottom
//          let bottom = document.querySelector('.slide-right-leave-active').offsetHeight - window.screen.availHeight * 2 - window.myScrollTop
          for (let i = 0; i < this.back_arr.length; i++) {
            this.back_arr[i].style.position = 'absolute'
            this.back_arr[i].style.bottom = bottom + 'px'
          }
        }
      },
      end () {
        for (let i = 0; i < this.forward_arr.length; i++) {
          this.forward_arr[i].removeAttribute('style')
        }
        for (let i = 0; i < this.back_arr.length; i++) {
          this.back_arr[i].removeAttribute('style')
        }
        if (this.back_headerbar !== null) {
          this.back_headerbar.removeAttribute('style')
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  /*后退动画*/
  .slide-right-leave-active {
    transition: all 0.5s;
    position: fixed;
    z-index: 1000;
  }

  .slide-right-leave-to {
    transform: translateX(100%);
    /*margin-left:100%*/
  }

  .slide-right-enter {

  }

  .slide-right-enter-active {
    transition: all 0.5s;
    position: relative;
    z-index: -1;
  }

  /*前进动画*/
  .slide-left-leave-active {
    transition: all 0.45s;
    position: relative;
  }

  .slide-left-leave-to {
  }

  .slide-left-enter {
    transform: translateX(100%);
    /*margin-left:100%*/
  }

  .slide-left-enter-active {
    transition: all 0.5s;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
</style>
