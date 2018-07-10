<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="入网资料" :back-to-web="true"></header-bar>
    </div>
    <div class="container">
      <div class="main">
        <p class="title">新用户入网认证</p>
        <div class="inputBox">
          <div class="group-line">
            <input type="text" v-model="name" placeholder="请输入姓名">
          </div>          
          <div class="group-line">
            <input type="text" v-model="idCard" placeholder="身份证号码">
          </div>
        </div>
      </div>
      <div class="dobtn">
        <footer-btn title="确认" @submit="submitWebInfo"></footer-btn>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  @import './../assets/css/mixin';
  .my-div{
    background: #eee;
  }
  .container {
    padding-top: 96px;
    background-color: #eee;
    .main{
      background-color: #fff;
      .title{
        padding: 0 41px;
        @include line-height(100px);
        background-color: #e5e5e5;
        color: #a7a7a7;
      }
      .inputBox{
        padding: 0 41px;
        .group-line{
          @include line-height(120px);
          background-color: #fff;
          border-bottom: 1px solid #e5e5e5;
        }
      }
    }
    .dobtn{
      padding: 53px 30px 20px 30px;
      text-align:center;
      &> span{
        @include line-height(80px);
        display:inline-block;
        width: calc(100% - 82px);
        text-align: center;
        background-color: #FF8C56;
        color: #fff;
        border-radius: 10px;
      } 
    }
  }
</style>
<script>
  import {
    setScroll
  } from '../../../assets/js/common'
  import headerBar from '../../../components/header-bar.vue'
  import footerBtn from '../../../components/submit-btn.vue'
  import eventHub from '@/assets/js/eventhub'
  // import data from './../data/buyphone'
  export default {
    data () {
      return {
        name: '维凯', // 姓名
        idCard: 330227199102321593 // 身份证号
      }
    },
    beforeRouteLeave(to, from, next) {
      setScroll()
      next()
    },
    components: {
      headerBar,
      footerBtn
    },
    mounted() {
    },
    methods: {
      submitWebInfo() {
        this.$router.go(-1)
        eventHub.$emit('backword')
      }
    }
  }
</script>
