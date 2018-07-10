<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="号码校验" :back-to-web="true"></header-bar>
    </div>
    <div class="container">
      <div class="main">
        <div class="inputBox">
          <div class="group-line">
            <input type="text" v-model="mobile" placeholder="请输入手机号">
          </div>          
          <div class="group-line">
            <input type="text" v-model="code" placeholder="请输入验证码">
            <span class="getverifycode" @click="getVerifyCode">获取</span>
          </div>
        </div>
      </div>
      <div class="dobtn">
        <footer-btn title="确认" @submit="submitVerifyCode"></footer-btn>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  @import './../assets/css/mixin';
  .my-div{
    background-color: #eee;
  }
  .container {
    padding-top: 96px;
    background: #eee;
    .main{
      background-color: #fff;
      .inputBox{
        padding: 0 41px;
        .group-line{
          @include line-height(120px);
          background-color: #fff;
          border-bottom: 1px solid #e5e5e5;
          &> input{
            width: calc(100% - 100px)
          }
        }
        .getverifycode{
          @include line-height(80px)
          display:inline-block;
          border-left: 1px solid #e5e5e5;
          width: 80px;
          text-indent: 20px;
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
        code: '', // 验证码
        mobile: ''
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
      // 获取验证码
      getVerifyCode() {
        let that = this
        let tempcode = Math.random() * 1000000
        that.code = tempcode.toFixed(0)
      },
      // 提交
      submitVerifyCode() {
        let that = this
        if (that.mobile === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '手机号不能为空(测试)'
          })
        } else {
          this.$store.state.selectParams.number.number = that.mobile
          this.$router.go(-1)
          eventHub.$emit('backword')
        }
      }
    }
  }
</script>
