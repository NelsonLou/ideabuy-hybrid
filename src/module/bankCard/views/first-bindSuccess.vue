<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="沃白条" :back-to-web="true"></header-bar>
    </div>
    <div class="container">

      <div class="light">
        <!--<div class="circle-container">-->
        <!--<div class="circle1" :class="{color:colorStatus}"></div>-->
        <!--<div class="circle2" :class="{color:colorStatus}"></div>-->
        <!--</div>-->
        <spinner type="dots"></spinner>
      </div>
      <div class="title">
        绑卡成功，您的额度计算中
      </div>
      <div class="text line1">
        排队的小伙伴过多，系统忙坏了，
      </div>
      <div class="text line2">
        我们正在抓紧审核您的申请，请耐心等待审核结果
      </div>
      <div class="footer-btn">
        <submit-btn title="完成" @submit="submit"></submit-btn>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .container {
    padding-top: 96px;
    min-height: 100vh;
    .light {
      margin-top: 5rem;
      display: flex;
      justify-content: center;
      .circle-container {
        width: 4rem;
        display: flex;
        justify-content: space-between;
        .circle1, .circle2 {
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
        }
        .circle1 {
          background-color: #70a6ff;
          &.color {
            background-color: #ff8c56
          }
        }
        .circle2 {
          background-color: #ff8c56;
          &.color {
            background-color: #70a6ff
          }
        }
      }
    }
    .title {
      text-align: center;
      margin-top: 4.2rem;
      font-size: 1.8rem;
      color: #212121;
    }
    .text {
      text-align: center;
      font-size: 1.2rem;
      color: #999;
      &.line1 {
        margin-top: 2.7rem;
      }
      &.line2 {
        margin-top: 1rem;
      }
    }
    .footer-btn {
      margin-top: 2.7rem;
      border-top: 1px solid transparent;
      padding: 0 2rem;
    }
  }
</style>
<script>
  import headerBar from '../../../components/header-bar.vue'
  import submitBtn from '../../../components/submit-btn.vue'
  import {Spinner} from 'vux'
  import {setScroll} from '../../../assets/js/common'
  export default{
    beforeRouteLeave (to, from, next) {
      setScroll()
      next()
    },
    data () {
      return {
//        colorStatus: false,
//        timer: null
      }
    },
    methods: {
      submit () {
        console.log(111)
      }
    },
    mounted () {
//      this.timer = setInterval(() => {
//        this.colorStatus = !this.colorStatus
//      }, 200)
    },
    components: {
      headerBar,
      submitBtn,
      Spinner
    }
  }
</script>
