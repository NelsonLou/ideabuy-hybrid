<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="沃白条" :back-to-web="true"></header-bar>
    </div>
    <div class="contianer">
      <span class="icon icon-success"></span>
      <div class="text">
        绑定成功
      </div>
      <div class="footer-btn">
        <submit-btn title="完成" @submit="submit"></submit-btn>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .contianer {
    padding-top: 96px;
    text-align: center;
    min-height:100vh;
    .icon {
      display:inline-block;
      margin-top: 8.1rem;
      font-size:8.6rem;
    }
    .text {
      font-size: 1.8rem;
      color: #212121;
      margin-top: 1.7rem;
    }
    .footer-btn {
      border-top:1px solid transparent;
      margin-top: 5rem;
      padding: 0 2rem;
    }
  }
</style>
<script>
  import headerBar from '../../../components/header-bar.vue'
  import submitBtn from '../../../components/submit-btn.vue'
  import {setScroll} from '../../../assets/js/common'
  export default{
    beforeRouteLeave (to, from, next) {
      setScroll()
      next()
    },
    methods: {
      submit () {
        console.log('提交完成')
      }
    },
    components: {
      headerBar,
      submitBtn
    }
  }
</script>
