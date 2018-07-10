<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="剩余语音"
                  :back-to-app="true"></header-bar>
    </div>
    <div class="container">
      <div class="head">
        <div class="title">
          当前套餐：4G全国套餐-76元套餐（新）
        </div>
        <div class="text">
          基本套餐76元-200分钟国内语音，800M国内流量（首月全量全价）
        </div>
        <div class="date">查询日期：2017-08-22
          10:57:36
        </div>
      </div>
      <div class="cell">
        <div class="title">
          <span
            class="icon icon-flow"></span><span
          style="line-height:40px;">流量详情</span>
        </div>
        <div class="list">
          <div class="list-title">
            76元套餐内流量（800M）
          </div>
          <div class="list-text">
            <div>共800.00MB</div>
            <div>剩余 <span
              style="color:#ff8c56;font-size:28px;">0.00MB</span>
            </div>
          </div>
          <div class="progress-container">
            <div class="progress"
                 style="width:100%;background:#ff8c56"></div>
          </div>
        </div>
        <div class="list">
          <div class="list-title">
            全国流量半年包
          </div>
          <div class="list-text">
            <div>共800.00MB</div>
            <div>剩余 <span
              style="color:#ff8c56;font-size:28px;">0.00MB</span>
            </div>
          </div>
          <div class="progress-container">
            <div class="progress"
                 style="width:100%;background:#ff8c56"></div>
          </div>
        </div>
        <div class="list">
          <div class="list-title">
            促销0元1GB套餐包（套餐内流量1.0G）
          </div>
          <div class="list-text">
            <div>共800.00MB</div>
            <div>剩余 <span
              style="color:#ff8c56;font-size:28px;">373.23MB</span>
            </div>
          </div>
          <div class="progress-container">
            <div class="progress"
                 style="width:70%;background:#3cc51f"></div>
          </div>
        </div>
      </div>
      <div class="cell">
        <div class="title">
          <span
            class="icon icon-mike"></span><span
          style="line-height:40px;">语音详情</span>
        </div>
        <div class="list">
          <div class="list-title">
            76元套餐内语音（200分钟）
          </div>
          <div class="list-text">
            <div>共200分钟</div>
            <div>剩余 <span
              style="color:#ff8c56;font-size:28px;">72分钟</span>
            </div>
          </div>
          <div class="progress-container">
            <div class="progress"
                 style="width:60%;background:#3cc51f"></div>
          </div>
        </div>
      </div>
      <div class="cell">
        <div class="title">
          <span
            class="icon icon-message" style="font-size:30px;"></span><span
          style="line-height:40px;">短信详情</span>
        </div>
        <div class="list">
          <div class="list-title">
            短信网龄升级计划
          </div>
          <div class="list-text">
            <div>共300条</div>
            <div>剩余 <span
              style="color:#ff8c56;font-size:28px;">300条</span>
            </div>
          </div>
          <div class="progress-container">
            <div class="progress"
                 style="width:1%;background:#3cc51f"></div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div
          style="font-size:28px;margin-bottom:30px;">
          注：
        </div>
        <div class="footer-text">
          1.本页数据包含套餐内产品、赠送产品、流量包产品等当前生效产品的使用情况，供您参考，详细内容以当地营业厅查询为准
        </div>
        <div class="footer-text">
          2.如您在产品规定的使用范围外使用，将按照标准资费计费，请注意。
        </div>
        <div
          style="margin-top:62px;font-size:28px;">
          您可能需要
        </div>
        <div class="footer-banner">
          <div class="img"></div>
          <div class="text">
            <div>
              <div
                style="display: flex;align-items: center">
                <div
                  style="font-size:1.8rem;margin-right:0.8rem;">
                  存120得360
                </div>
                <div
                  style="width:5rem;height:34px;line-height:34px;background:#f65a44;text-align:center;color:#fff;">
                  服务
                </div>
              </div>
              <div
                style="font-size:20px;color:#999;margin-top:10px;padding-right:2rem;">
                您的专属套餐，存120的360点击办理
              </div>
            </div>
          </div>
        </div>
        <div
          style="margin-top:50px;font-size:32px;color:#999">
          温馨提示：
        </div>
        <div class="tip">1.此界面仅为您提供当月余量信息查询</div>
        <div class="tip">
          2.对于超出套餐及订阅产品包外的情况，将按照标准资费计费，请您注意
        </div>
        <div class="tip" style="color:#ff8c56"
             v-show="more" @click="more=false">
          点击了解更多 >
        </div>
        <div v-show="!more">
          <div class="tip">
            3.本页数据不包含免费流量、免费语音、国际漫游流量包、国际漫游语音包。
          </div>
          <div class="tip">4.详细内容以当地营业厅查询为准。</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .icon{
    color:#4885d1;
  }
  .container {
    padding-top: 96px;
    width: 100vw;
    min-height: 100vh;
    font-size: 24px;
    .head {
      background: #fff;
      padding: 2rem;
      .title {
        font-size: 32px;
        color: #212121;
      }
      .text {
        color: #999;
        margin-top: 38px;
        line-height: 40px;
      }
      .date {
        margin-top: 30px;
        color: #999
      }
    }
    .cell {
      margin-top: 1rem;
      background: #fff;
      padding: 2rem;
      padding-bottom: 3rem;
      .title {
        display: flex;
        line-height: 40px;
        align-items: center;
        font-size: 28px;
        .icon {
          font-size: 40px;
          margin-right: 1.5rem;
        }
      }
      .list {
        margin-top: 50px;
        .list-title {
          color: #999;
        }
        .list-text {
          margin-top: 32px;
          display: flex;
          justify-content: space-between;
        }
        .progress-container {
          width: 100%;
          background: #eee;
          height: 20px;
          margin-top: 24px;
          .progress {
            height: 20px;
          }
        }
      }
    }
    .footer {
      margin-top: 1rem;
      padding: 2rem;
      background: #fff;
      .footer-text {
        font-size: 24px;
        color: #999;
        line-height: 35px;
      }
      .footer-banner {
        width: 100vw;
        margin-left: -2rem;
        margin-top: 24px;
        padding: 20px 0;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        display: flex;
        .img {
          width: 372px;
          height: 162px;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          background-image: url('../../../assets/img/pic.png');
        }
        .text {
          display: flex;
          /*flex-direction: column;*/
          align-items: center;
        }
      }
      .tip {
        margin-top: 20px;
        line-height: 35px;
        color:#999;
      }
    }
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
    data () {
      return {
        more: true
      }
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
