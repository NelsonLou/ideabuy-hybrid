<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="发票填写" :back-to-web="true"></header-bar>
    </div>
    <div class="container">
      <div class="whiteBox">
       <div class="maxBox">
           <div class="minBox border-top">
             <span class="minBox-gray">发票类型</span>
             <span class="minBox-black">企业</span>
             <i class="icon-arrow-right"></i>
           </div>
           <div class="minBox border-top">
             <span class="minBox-gray">发票抬头</span>
             <span class="minBox-black" style="margin-right: 41px">宁波维凯网络有限公司(测试)</span>
           </div>
           <div class="minBox">
             <span class="minBox-gray">纳税人识别号</span>
           </div>
          <div class="dobtn">
            <footer-btn title="确认" @submit="submitInvoice"></footer-btn>
          </div>
       </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang='scss'>
  @import './../assets/css/mixin';
  .my-div{
    background: #eee;
  }
  .container {
    padding-top: 96px;
    background-color: #eee;
    width:100vw;
    min-height:100vh;
  }
  .whiteBox {
    width: 100vw;
    height: 18.3rem;
    background: white;
  }
  .maxBox {
    margin: 0 40px 0 40px;
  }
  .minBox {
    position: relative;
    width: 100%;
    height: 6.1rem;
    line-height: 6.1rem;
  }
  .minBox i{
    @include arraw-right(6.1rem,41px)
  }
  .minBox-gray {
    font: 28px SourceHanSansCN-Regular;
    color: #A7A7A7;
  }
  .minBox-black {
    font: 28px SourceHanSansCN-Regular;
    color: #2E2E2E;
    float: right;
    display: inline-block;
    height: 100%;
    line-height: 6.1rem;
    margin-right: 91px;
  }
  .border-top {
    border-bottom: 1px solid #e5e5e5;
  }
  .minBox-btn {
    width: 33.6rem;
    height: 4.1rem;
    background: #FF8C56;
    border: none;
    border-radius: 10px;
    margin-top: 3rem;
    font-size: 28px;
    color: white;
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
</style>
<script>
  import {
    setScroll
  } from '../../../assets/js/common'
  import headerBar from '../../../components/header-bar.vue'
  import footerBtn from '../../../components/submit-btn.vue'
  import eventHub from '@/assets/js/eventhub'
  export default {
    beforeRouteLeave(to, from, next) {
      setScroll()
      next()
    },
    components: {
      headerBar,
      footerBtn
    },
    methods: {
      submitInvoice() {
        this.$router.go(-1)
        eventHub.$emit('backword')
      }
    }
  }
</script>
