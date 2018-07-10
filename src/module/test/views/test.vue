<template>
<div class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="测试1" :back-to-app="true"></header-bar>
  </div>
  <div class="container">
    <div class="group" @click="go1(1)">
      跳转一
    </div>
    <div class="group" @click="go1(2)">
      跳转二
    </div>
    <div class="group" @click="go1(3)">
      跳转三
    </div>
  </div>
</div>
</template>
<style scoped>
  .contaienr {
    padding-top: 96px;
  }
</style>
<script>
  import {
    setScroll
  } from '../../../assets/js/common'
  import headerBar from '../../../components/header-bar.vue'
  export default {
    beforeRouteLeave(to, from, next) {
      setScroll()
      next()
    },
    components: {
      headerBar
    }
  }
</script>
