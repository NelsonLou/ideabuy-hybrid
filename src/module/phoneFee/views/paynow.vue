<template>
<div class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="确认支付" :back-to-web="true"></header-bar>
  </div>
  <div class="container">
    <div class="info">
      <div class="item">
        <label>商品名称：</label>
        <tt>{{commodity.name}}</tt>
      </div>
      <div class="item">
        <label>商品描述：</label>
        <tt>充值 {{commodity.desc}}</tt>
      </div>
      <div class="item">
        <label>总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</label>
        <tt>{{commodity.price}}</tt>
      </div>
    </div>
    <p>选择支付方式</p>
    <div class="pay-ways">
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
        <div :class="{radio: true, 'icon-circle-cheaked': checked === 2, check: checked !== 2}"></div>
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
  <div class="footer">
    <submit-btn class="submit-btn" title="确认付款" @submit="submitPay"></submit-btn>
  </div>
</div>
</template>
<script type="es6">
import eventhub from '../../../assets/js/eventhub'
import {
  setScroll
} from '../../../assets/js/common'
import headerBar from '../../../components/header-bar.vue'
import submitBtn from '../../../components/submit-btn.vue'
import {
  AlertPlugin
} from 'vux'
export default {
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  data() {
    return {
      checked: 1
    }
  },
  methods: {
    selectPayWay(i) {
      this.checked = i
    },
    submitPay() {
      this.$vux.alert.show({
        content: '支付成功（测试）'
      })
      setTimeout(() => {
        this.$vux.alert.hide()
        this.$router.go(-1)
        eventhub.$emit('backword')
      }, 1500)
    }
  },
  computed: {
    commodity() {
      return this.$store.state.phoneFee.commodity
    }
  },
  components: {
    headerBar,
    submitBtn,
    AlertPlugin
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.info {
    width: 100%;
    background: #fff;
    font-size: 28px;
    color: #212121;
    margin-top: 96px;
    padding: 0 45px;
    .item {
        height: 100px;
        line-height: 100px;
        border-bottom: 1px solid #e5e5e5;
        label {
            width: 150px;
            color: #ccc;
            display: inline-block;
        }
    }
    .item:nth-child(3) {
        tt:nth-child(2) {
            color: #ff8c56;
        }
    }
}
p {
    margin: 0;
    height: 110px;
    color: #adadad;
    font-size: 28px;
    line-height: 110px;
    padding-left: 45px;
}
.pay-ways {
    width: 100%;
    background: #fff;
    padding: 0 40px;
    .item {
        height: 140px;
        font-size: 0;
        border-bottom: 1px solid #e5e5e5;
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
            border: 1px solid #e5e5e5;
            border-radius: 20px;
        }
    }
    .item:nth-child(1) {
        .icon {
            background: url("../assets/img/icon_cxlogo@2x.png") no-repeat;
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
}
.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 120px;
    background: #fff;
    padding: 15px 2rem;
    .submit-btn {
        padding: 0 2rem;
        border-top: 1px solid transparent;
        width: 100%;
    }
}
</style>
