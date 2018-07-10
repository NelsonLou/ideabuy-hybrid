<template>
<div class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="发票" :back-to-web="true"></header-bar>
  </div>
  <div class="container">
    <div class="tips">
      <p>仅提供100元发票，次日凭有效证件到杭州营业厅领取。</p>
    </div>
    <div class="form">
      <div>
        <input type="text" v-model="title" placeholder="请输入您的发票抬头">
      </div>
      <div class="papers-type">
        <group>
          <popup-picker title="证件类型" :data="papersTypeList" v-model="papersType" placeholder="请选择"></popup-picker>
        </group>
      </div>
      <div>
        <input type="text" v-model="idCard" placeholder="请输入您的证件号码">
      </div>
    </div>
    <div class="submit">
      <submit-btn class="submit-btn" title="确认并保存" @submit="save" :disabled="!(title !== '' && papersType.length !== 0 && idCard !== '')"></submit-btn>
    </div>
    <div class="footer-btn">
      <span>充值卡充值</span>
      <span></span>
      <span>我的订单</span>
    </div>
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
  Group,
  PopupPicker
} from 'vux'
export default {
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  data() {
    return {
      title: '',
      papersType: [],
      idCard: '',
      papersTypeList: [
        ['身份证', '军官证', '护照', '港台通行证', '户口簿']
      ]
    }
  },
  methods: {
    save() {
      var that = this
      this.$vux.alert.show({
        content: '保存成功（测试）'
      })
      setTimeout(() => {
        this.$vux.alert.hide()
        this.$router.go(-1)
        eventhub.$emit('backword')
      }, 1500)
    }
  },
  components: {
    headerBar,
    submitBtn,
    Group,
    PopupPicker
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.tips {
    weight: 100%;
    height: 80px;
    background: #FFEADB;
    & p {
        margin: 0;
        padding-left: 30px;
        color: #212121;
        font-size: 24px;
        line-height: 80px;
    }
}
.container {
    padding-top: 96px;
    width: 100vw;
    min-height: 100vh;
}
.form {
    background: #fff;
    padding: 0 2rem;
    > div {
        position: relative;
        height: 122px;
        line-height: 120px;
        font-size: 28px;
        border-bottom: 1px solid #dcdcdc;
        input {
            border: none;
            outline: none;
            padding-left: 0;
            width: 100%;
            height: 120px;
            &::-webkit-input-placeholder {
                color: #ddd;
                font-size: 28px;
            }
        }
        label {
            font-size: 28px;
        }
    }
}
.submit {
    margin: 3rem 2rem;
    .submit-btn {
        padding: 0 2rem;
        border-top: 1px solid transparent;
        width: 100%;
    }
}
.footer-btn {
    margin-top: 200px;
    text-align: center;
    font-size: 27px;
    color: #3978d6;
    & span {
        display: inline-block;
        vertical-align: top;
        height: 32px;
        line-height: 32px;
        font-size: 28px;
    }
    span:nth-child(2) {
        width: 2px;
        margin: 0 15px;
        height: 32px;
        display: inline-block;
        border-left: 2px solid #ccc;
    }
}
</style>
<style media="screen" lang="scss" rel="stylesheet/scss">
.papers-type {
    .vux-cell-box .weui-cell {
        line-height: 118px;
    }
    .vux-no-group-title {
        margin: 0;
        height: 120px;
        line-height: 118px;
    }
    .vux-popup-picker-select {
        overflow: hidden;
    }
    .vux-popup-picker-value {
        float: left;
    }
    .vux-cell-box .vux-popup-picker-placeholder {
        float: left;
    }
    .weui-cell {
        padding: 0;
        line-height: 120px;
    }
    .weui-cells:after {
        border-bottom: none;
    }
    .weui-cell__hd {
        padding-left: 0;
    }
    .weui-cell .vux-cell-primary {
        padding-left: 2rem;
    }
    .weui-cell_access .weui-cell__ft:after {
        width: 15px;
        height: 15px;
        margin-right: 10px;
        -webkit-transform: matrix(0.71, 0.71, 0.71, -0.71, 0, 0);
        transform: matrix(0.71, 0.71, 0.71, -0.71, 0, 0);
    }
}
</style>
