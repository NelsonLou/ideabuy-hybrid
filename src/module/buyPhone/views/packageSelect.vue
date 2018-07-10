<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar :title="title" :back-to-web="true"></header-bar>
    </div>
    <div class="container">
      <div class="selectedParams">已选手机&nbsp;&nbsp;<span v-for="(item,index) in selectedType" :key="index">{{item}}&nbsp;</span></div>
      <div class="packageBox">
        <div class="packageline" @click="SelectContract">
          <p class="title"><span v-show="tdesc3 === ''">选择合约</span><span v-show="tdesc3 !== ''">{{tdesc3}}</span></p>
          <p class="desc contract"><span v-show="tdesc === ''">根据您的月消费计划,选择一个合适的合约计划</span><span v-show="tdesc !== ''">{{tdesc}}</span></br><span>{{tdesc2}}</span></p>
          <i class='icon-arrow-right'></i>
        </div>        
        <div class="packageline" :data="numberVerify" @click="SelectMobile" v-show="numberVerify === 1">
          <div v-show="number === ''">
            <p class="title">选择号码</p>
            <p class="desc">选择一个入网号码,如果您选择的是靓号,需要预存靓号预存款</p>
          </div>
          <div v-show="number !== ''">
            <p class="title">{{mobileContract}}</p>
            <p class="desc">归属地: {{mobilePlcce}}</p>            
          </div>
          <i class='icon-arrow-right'></i>
        </div>         
        <div class="packageline" @click="VerifyMobile" v-show="numberVerify === 2">
          <div v-show="number === ''">
            <p class="title">老号码校验</p>
            <p class="desc">选择一个入网号码,如果您选择的是靓号,需要预存靓号预存款</p>
          </div>
          <div v-show="number !== ''">
            <p class="title">{{mobileContract}}</p>
            <p class="desc">归属地: {{mobilePlcce}}</p>            
          </div>
          <i class='icon-arrow-right'></i>
        </div>        
        <div class="packageline">
          <p class="actprice">应付金额<span>￥{{price}}</span></p>
          <p class="sumprice">合约总金额<span>￥{{price}}</span></p>
        </div>
      </div>

      <div class="buybutton">
        <footer-btn title="购买" @submit="payOrder"></footer-btn>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import './../assets/css/mixin';
  .my-div{
    background: #eee;
  }
  .container{
    padding:106px 18px 0 18px;
    background-color: #eee;
    .selectedParams{
      @include line-height(119px);
      text-align: center;
      background-color: #F8F8F8;
      color: #3c3c3c;
      font-weight: bold;
      font-size: 28px;
    }
    .packageBox{
      background-color: #fff;
      padding: 0 10px 28px 0;
      .packageline{
        position: relative;
        padding: 20px 0px 22px 36px;
        min-height: 120px;
        border-bottom: 1px solid #e5e5e5;
        .title{
          margin-bottom: 22px;
          color: #383838;
        }
        .desc{
          font-size: 24px;
          color: #A7A7A7;
          width: 75%;
          & span{
            font-size: 24px;
          }
        }
        .actprice{
          margin-bottom: 38px;
          color: #A7A7A7;
          &> span{
            float: right;
            display: inline-block;
            margin-right: 43px;
            color: #474747
          }
        }
        .sumprice{
          &> span{
            float: right;
            display: inline-block;
            margin-right: 43px;
            color: #F77868;
          }
        }
        &>i{
          @include arraw-right(120px,43px)
        }
      }
      .packageline:last-child{
        border:none;
      }
    }
    .buybutton{
      padding: 53px 30px 0 30px;
      .buy{
        @include line-height(80px);
        display:inline-block;
        width: 100%;
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
  export default {
    data () {
      return {
        selectedType: '', // 已经套餐
        price: '', // 产品价格
        hytime: '', // 合约期限
        number: '', // 选择的号码/校验号码
        place: '', // 号码归属地(临时)
        mobilePlcce: '', // 号码归属地
        tdesc: '', // 合约描述
        tdesc2: '', // 合约描述
        tdesc3: '', // 已选合约套餐
        mobileContract: '', // 手机套餐
        numberVerify: 0,
        title: ''
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
    activated() {
      let that = this
      let string = this.$store.state.selectParams.typelist
      let selectParams = this.$store.state.selectParams
      let arr = []
      this.$store.state.clearStatus = false
      string = string.split(',')
      for (var i = 0; i < string.length; i++) {
        arr.push(string[i].replace(/'/g, ''))
      }
      that.selectedType = arr
      that.price = parseInt(selectParams.sumprice) + parseInt(selectParams.price)
      that.tdesc = selectParams.desc
      that.tdesc2 = selectParams.desc2
      if (selectParams.tprice === '') {
        that.tdesc3 = ''
      } else {
        that.tdesc3 = '4G ' + selectParams.tprice + '元套餐 ' + selectParams.hytime + '合约'
      }
      let number = selectParams.number.number
      that.number = number
      that.mobileContract = '已选号码:' + number
      that.mobilePlcce = selectParams.number.place
      that.numberVerify = this.$store.state.numberVerify
      if (this.$store.state.numberVerify === 1) {
        that.title = '新号入网'
      }
      if (this.$store.state.numberVerify === 2) {
        that.title = '老用户办理'
      }
    },
    methods: {
      // 选择合约
      SelectContract() {
        this.$router.push({path: '/buyPhone/contractSelect', query: {}})
      },
      SelectMobile() {
        this.$router.push({path: '/buyPhone/mobileSelect', query: {}})
      },
      // 订单支付页面
      payOrder() {
        let that = this
        this.$store.state.selectParams.payFee = that.price
        if (that.tdesc === null || that.number === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择相关套餐与合约(测试)'
          })
        } else {
          this.$router.push({path: '/buyPhone/payOrder', query: {}})
        }
      },
      // 老号校验
      VerifyMobile() {
        this.$router.push({path: '/buyPhone/VerifyMobile', query: {}})
      }
    }
  }
</script>
