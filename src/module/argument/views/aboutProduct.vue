<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="关于沃白条" :back-to-app="true"></header-bar>
    </div>
    <div class="container">
      <div class="text-group">
        <div class="text">
          <div class="title">
            <span class="icon-cmcc img" style="color:#ff6a37"></span>
            <div class="title-text">
              联通沃白条
            </div>
          </div>
          <div class="body">
            <div>沃白条APP业务平台,支持实体类，虚拟类等产品和服务交易,能够无缝对接微信、支付宝等第三方支付系统平台利用征信体系对用户进行评级授信，用户获得授信额度后,可在平台上进行各类交易。</div>
          </div>
        </div>
        <div class="text">
          <div class="title">
            <span class="icon-direction img" style="color:#24d481"></span>
            <div class="title-text">
              沃白条以用户需求为导向
            </div>
          </div>
          <div class="body">
            <div>
              白条是为消费者提供以消费为目的的贷款。具有单笔授信额度小审批速度快、无需抵押担保、使用方式灵活、贷款期限多样等独特优势。并具有“消费+金融”的双重属性,客户可享有高质量个性化消费贷产品,能更好的满足消费需求
            </div>
          </div>
        </div>
        <div class="text" style="padding-bottom:100px;">
          <div class="title">
            <span class="icon-global img" style="color:#24aef7"></span>
            <div class="title-text">
              沃白条愿景
            </div>
          </div>
          <div class="body">
            <div>
              华夏国投资产管理有限公司是经国家工商局核准成立的综合性金融服务企业,业务领域涵盖资产管理、股权基金-(Pre-IPO)、产业投资、信用风险评估与管理、信用数据整合、财务顾问、直接投资等诸多领域,形成了金融服务产业集群和综合经营集团架构,为社会公众和机构团体提供完善的金融管理咨询等服务。
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div>Copyright&copy; 2015-2017,weikai.com.cn.All rights reserved.By</div>
        <div>宁波维凯网络科技有限公司浙ICP备14031255号-1</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .container {
    padding: 88px 2rem 0 2rem;
    min-height: 100vh;
    background: #fff;
    position: relative;
    .text-group {
      margin-top: 0.8rem;
      .text {
        padding: 1.9rem 0 2.3rem 0;
        border-bottom: 1px solid #ddd;
        &:last-child {
          border: none;
        }
        .title {
          .img {
            font-size: 40px;
            float: left;
          }
          .title-text {
            padding-left: 3rem;
            font-size: 30px;
            color: #212121;
            line-height: 2rem;
          }

        }
        .body {
          margin-top: 1.5rem;
          > div {
            font-size: 24px;
            color: #999;
            line-height: 48px;
          }
        }
      }
    }
    .footer {
      width: 33.5rem;
      position: absolute;
      bottom: 1.6rem;
      > div {
        text-align: center;
        font-size: 18px;
        color: #cbcacc;
        line-height: 30px;
      }
    }
  }
</style>
<script>
  import headerBar from '../../../components/header-bar.vue'
  import {setScroll, setupWebViewJavascriptBridge} from '../../../assets/js/common'
  export default{
    beforeRouteLeave (to, from, next) {
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
