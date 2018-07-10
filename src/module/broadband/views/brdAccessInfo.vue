<template>
<div class="">
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="宽带新装" :back-to-web="true"></header-bar>
    </div>
    <div class="container">
      <div class="accessPrice bgColor clearfix">
        <span>20M单宽带600元包年不限时</span>
        <span>包两年（买16送6）再送4个月</span>
        <span class="right">{{amount}}元</span>
      </div>
      <div class="accessInfotitle">
        <span>宽带入网信息</span>
      </div>
      <div class="accessInfo bgColor">
        <span>安装地区：{{add}}</span>
        <span><input placeholder="请输入详细的安装地址" type="text" name="" value=""></span>
        <span><input placeholder="请输入联系人手机号" type="text" name="" value=""></span>
        <span><input placeholder="请输入机主姓名" type="text" name="" value=""></span>
        <span>温馨提示</span>
        <span class="accessInfoRule">根据国家工信部《电话用户真实身份信息登记规定》（工业和信 息化部令第25号文件）要求，用户通过网络办理宽带新装业务须 上传身份证照片进行实名认证，所有资料联通严格保密。</span>
        <span>如上传，请忽略！</span>
        <button type="button" name="button" @click='upData'>未上传</button>
      </div>
      <div class="accessPayTitle">
        <span>付款信息</span>
      </div>
      <div class="accessPay bgColor">
        <ul class="clearfix">
          <li class="left">是否分期</li>
          <li class="left">是</li>
          <li class="left">
            <span @click='Stages()' v-bind:class="{ 'display' : isStages === false }" class="check-null"></span>
            <span v-bind:class="{ 'display' : isStages === true }" class="icon-orange icon-circle-cheaked"></span>
          </li>
          <li class="left">否</li>
          <li class="left">
            <span @click='notStages()' v-bind:class="{ 'display' : isStages === true }" class="check-null"></span>
            <span v-bind:class="{ 'display' : isStages === false }" class="icon-orange icon-circle-cheaked"></span>
          </li>
        </ul>
        <div class="payWays">
          <div class="item" @click="selectPayWay(1)">
            <div class="icon"></div>
            <div class="text">
              <div class="row">
                <span>畅想购白条支付</span>
                <span class="icon-fire" style="color: #ff9a00; font-size: 32px"></span>
                <span class="icon-favourable  " style="color: #f35719; font-size: 32px"></span>
              </div>
              <div class="row">
                <span>10秒获取额度，最长12期免息</span>
              </div>
            </div>
            <div :class="{radio: true, 'icon-circle-cheaked': checked === 1, check: checked !== 1}"></div>
          </div>
          <div class="item" @click="selectPayWay(2)">
            <div class="icon icon-wechat" style="color: #41b035; font-size:64px"></div>
            <div class="text">
              <div class="row">
                <span>微信支付</span>
              </div>
              <div class="row">
                <span>仅支持微信4.2及以上版本</span>
              </div>
            </div>
            <span :class="{radio: true, 'icon-circle-cheaked': checked === 2, check: checked !== 2}"></span>
          </div>
          <div class="item" @click="selectPayWay(3)">
            <div class="icon icon-alipay" style="color: #19a0e5; font-size:64px"></div>
            <div class="text">
              <div class="row">
                <span>支付宝钱包支付</span>
              </div>
              <div class="row">
                <span>推荐支付宝用户使用</span>
              </div>
            </div>
            <div :class="{radio: true, 'icon-circle-cheaked': checked === 3,  check: checked !== 3}"></div>
          </div>
        </div>
      </div>
      <div class="accessBtn bgColor">
        <button @click='push'>提交并支付</button>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped lang='scss'>
.container {
    padding-top: 96px;
    width: 100vw;
    min-height: 100vh;
    font-size: 28px;
}

.accessPrice {
    overflow: hidden;
    width: 100vw;
}

.accessPrice span {
    display: block;
}
.accessPrice span:nth-child(1) {
    font-family: STFangsong;
    margin: 2rem auto auto 2rem;
    font-size: 30px;
}
.accessPrice span:nth-child(2) {
    margin: 1rem auto auto 2rem;
    font-size: 24px;
    color: #898989;
}
.accessPrice span:nth-child(3) {
    margin: 1rem 2rem 1.2rem auto;
    font-size: 36px;
    color: #F65600;
}

.accessInfotitle {
    width: 100vw;
    height: 4.05rem;
    overflow: hidden;
}

.accessInfotitle span {
    display: block;
    margin: 1.2rem auto auto 2rem;
    color: #898989;
}

.accessInfo {
    width: 100vw;
}

.accessInfo span {
    display: block;
    margin-left: 2rem;
}
.accessInfo span:nth-child(1),
.accessInfo span:nth-child(2),
.accessInfo span:nth-child(3),
.accessInfo span:nth-child(4) {
    height: 4.35rem;
    line-height: 4rem;
    border-bottom: 1px solid #E5E5E5;
}
.accessInfo span:nth-child(5) {
    margin-top: 1.7rem;
    display: block;
    font-family: PingFang-SC-Medium;
}
.accessInfo span:nth-child(6) {
    margin-top: 1rem;
    line-height: 36px;
    font-size: 24px;
    color: #AAAAAA;
}
.accessInfo span:nth-child(7) {
    margin-top: 1.45rem;
    font-size: 24px;
    color: #333333;
}

.accessInfo button {
    height: 2.3rem;
    border: 1px solid #3978D6;
    border-radius: 4px;
    background-color: #ffffff;
    font-size: 24px;
    color: #3978D6;
    margin: 0.9rem auto 1rem 2rem;
}

.accessPayTitle {
    width: 100vw;
    padding-top: 1.3rem;
}

.accessPayTitle span {
    display: block;
    margin-left: 1.85rem;
    margin-bottom: 1.35rem;
    color: #999999;
    font-family: PingFang-SC-Medium;
}

.accessPay {
    border-bottom: 1px solid #E5E5E5;
    width: 100vw;
}

.accessPay ul {
    margin-left: 2rem;
}
.accessPay ul:nth-child(1) li {
    line-height: 40px;
    margin-top: 2rem;
}
.accessPay ul:nth-child(1) li:nth-child(2) {
    margin-left: 1.4rem;
    line-height: 40px;
}
.accessPay ul:nth-child(1) li:nth-child(4) {
    margin-left: 1.3rem;
    line-height: 40px;
}
.accessPay ul:nth-child(1) li:nth-child(3),
.accessPay ul:nth-child(1) li:nth-child(5) {
    margin-left: 0.45rem;
}

.accessBtn {
    width: 100vw;
    height: 6.2rem;
    border-top: 1px solid #E5E5E5;
}

.accessBtn button {
    margin: 1.1rem auto 0;
    display: block;
    width: 33.5rem;
    height: 4rem;
    background-color: #FF8D3B;
    border-radius: 10px;
    border: none;
    color: #FFFFFF;
}

.accessPayTxt {
    margin-left: 0.75rem;
}

.accessInfoRule {
    width: 33.75rem;
}

li {
    list-style: none;
}

ul {
    padding: 0;
    margin: 0;
}

.bgColor {
    background-color: #FFFFFF;
}
.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
}

.left {
    float: left;
}

.right {
    float: right;
}

.icon-orange {
    color: #FF8D3B;
    font-size: 40px;
}

.check-null {
    display: block;
    width: 40px;
    height: 40px;
    border: 1px solid #E5E5E5;
    border-radius: 20px;
}

.payWays {
    width: 100%;
    background: #fff;
    padding: 0 40px;
    .item {
        height: 140px;
        font-size: 0;
        border-bottom: 0.5px solid #e5e5e5;
        display: flex;
        justify-content: space-between;
        .icon {
            width: 64px;
            height: 64px;
            margin: 38px 50px 38px 10px;
        }
        .text {
            width: 70%;
            height: 140px;
            .row:nth-child(1) {
                font-size: 30px;
                color: #212121;
                padding-top: 30px;
            }
            .row:nth-child(2) {
                font-size: 24px;
                color: #999;
                padding-top: 15px;
            }
        }
        .radio {
            width: 40px;
            height: 40px;
            margin-top: 50px;
            font-size: 40px;
            color: #ff8c56;
        }
        .check {
            border: 0.5px solid #e5e5e5;
            border-radius: 20px;
        }
    }
    .item:nth-child(1) {
        .icon {
            background: url("../img/icon_wb_cxlogo@2x.png") no-repeat;
        }
        .text {
            span:nth-child(2),
            span:nth-child(3) {
                width: 32px;
                height: 32px;
                margin-left: 5px;
            }
        }
    }
    .item:nth-child(3) {
        border-bottom: none;
    }
}

.display {
    display: none;
}
</style>
<script>
import {
  setScroll
} from '../../../assets/js/common'
import headerBar from '../../../components/header-bar.vue'
export default {
  activated() {
    this.amount = this.$route.query.amount
    this.isDialog = false
  },
  data() {
    return {
      price: 100,
      add: '宁波市鄞州区',
      isStages: false,
      way: 'a',
      amount: 100,
      checked: 1
    }
  },
  methods: {
    selectPayWay(i) {
      this.checked = i
    },
    push() {
      this.$vux.alert.show({
        title: '提示',
        content: '支付成功（测试）'
      })
    },
    upData() {
      this.$vux.alert.show({
        title: '提示',
        content: '上传成功（测试）'
      })
    },
    Stages() {
      this.isStages = false
    },
    notStages() {
      this.isStages = true
    },
    payWayA() {
      this.way = 'a'
    },
    payWayB() {
      this.way = 'b'
    },
    payWayC() {
      this.way = 'c'
    }
  },
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  components: {
    headerBar
  }
}
</script>
