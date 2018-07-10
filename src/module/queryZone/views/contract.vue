<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="合约期查询"
                  :back-to-app="true"></header-bar>
    </div>
    <div class="container">
      <div class="inquiry-hear">
        <div class="hear-pBox">
          <span
            class="hear-p">尊敬的合约用户，距离您的合约到期还有：</span>
        </div>
        <div class="hear-time">
          <span class="numberBig">100</span>
          <span class="stringSmall">天</span>
          <span class="numberBig">14</span>
          <span class="stringSmall">小时</span>
          <span class="numberBig">26</span>
          <span class="stringSmall">分钟</span>
        </div>
        <div class="hear-queryTime">
          <span>查询日期：<span>2017.08.22 09:22:26</span></span>
        </div>

      </div>
      <div class="inquiry-body">
        <div class="contentBox">
          <div class="boxHear">
            <span
              class="icon-group " style="font-size:40px;color:#ff8c56;margin-right:1rem;"></span>
            <span>合约详情</span>
          </div>
          <div class="boxBody">
            <div class="contentLine">
              <span class="textHear">客户姓名：</span>
              <span class="textFlast">张飞</span>
            </div>
            <div class="contentLine">
              <span class="textHear">合约号码：</span>
              <span
                class="textFlast">1866162345</span>
            </div>
            <div class="contentLine">
              <span class="textHear">合约名称：</span>
              <span class="textOr textCenter">2015年10月全国免预存送240元合约76元至596元档(12个月)[自有渠道]</span>
            </div>
            <div class="contentLine">
              <span class="textHear">生效时间：</span>
              <span
                class="textFlast">2016年12月01日</span>
            </div>
            <div class="contentLine">
              <span class="textHear">到期时间：</span>
              <span
                class="textOr">2017年11月30日</span>
            </div>
            <div class="contentLine">
              <span class="textHear">温馨提示：</span>
              <span class="textFlast textCenter">您当前离合约到期还有100天，部分合约到期
                     后会自动续订。如需退订或更变，请您务
                     必在到期前一个月内办理。感谢您对联通合
                     约业务的支持，期间有业务疑惑，请立即反馈我们。
                     </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .contentLine {
    margin-top: 30px;
  }

  .textCenter {
    display: block;
    margin-left: 145px;
    margin-top: -36px;
  }

  .textOr {
    font: 28px PingFangSC-Regular;
    color: #ff8c56;
  }

  .textFlast {
    font: 28px PingFangSC-Regular;
    color: #212121;
  }

  .textHear {
    font: 28px PingFangSC-Regular;
    color: #777777;
  }

  .boxHear {
    border-bottom: 1px solid #EEEEEE;
    height: 4.3rem;
    display: flex;
    align-items: center;
  }

  .boxHear span {
    font: 32px PingFangSC-Regular;
    color: #212121;
  }

  .container {
    padding-top: 96px;
    width: 100vw;
    min-height: 100vh;
  }

  .inquiry-hear {
    width: 100%;
    padding-bottom: 40px;
    background-color: #FF8C56;
  }

  .hear-pBox {
    text-align: center;
    padding-top: 3.6rem;
  }

  .hear-p {
    font: 28px PingFangSC-Medium;
    color: #ffffff;
  }

  .hear-time {
    text-align: center;
    margin: 3.5rem auto;

  }

  .numberBig {
    font: 60px PingFangSC-Medium;
    color: #ffffff;
  }

  .stringSmall {
    font: 28px PingFangSC-Regular;
    color: #ffffff;
  }

  .hear-queryTime {
    width: 22.5rem;
    height: 50px;
    text-align: center;
    border-radius: 50px;
    background-color: #FFE8DD;
    margin: 0 auto;
    font: 24px PingFangSC-Medium;
    line-height: 50px;
  }

  .inquiry-body {
    width: 100%;
    padding-bottom: 2rem;
    background: white;
    margin-top: 1rem
  }

  .contentBox {
    margin: 0 40px 0 40px;
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
    mounted () {
      setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {
        })
      })
    },
    components: {
      headerBar
    }
  }
</script>
