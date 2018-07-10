<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="确认支付" :back-to-web="true"></header-bar>
    </div>
    <div class="container">
      <!-- 商品信息 -->
      <div class="goodsinfo">
        <div class="left">
          <div class="img" :style="'backgroundImage:url('+orderDetail.img+')'"></div>
        </div>
        <div class="right">
          <p class="title">{{orderDetail.title}}</p>
          <p class="tips">号码：{{orderDetail.mobile}}</p>
          <p class="tips">套餐：{{orderDetail.package}}</p>
          <p class="tips">合约：{{orderDetail.contract}}</p>
          <p class="tips">协议：{{orderDetail.time}}</p>
          <p class="tips">赠品：{{orderDetail.gift}}</p>
        </div>
      </div>

      <!-- 分期时间 -->
      <div class="selectTime">
        <div>
          <label for=""><span>分期选择</span></label>
          <div class="timebox">
            <div class="parttime" @click='noPartTime' :style="noPartTimeChecked?'border:none;border: 1px solid #ff8c56':''">
              <span>不分期</span>
              <div v-show="noPartTimeChecked" class="checked"><img src="./../assets/img/icon_checked@2x.png" alt=""></div>
            </div>            
            <div class="parttime"  v-for="(item, index) in parttime" :key="index" @click='selectPartTime(index)' :style="index===checkedIndex?'border:none;border: 1px solid #ff8c56;':''">
              <span>{{item}}</span>
              <div v-show="index === checkedIndex" class="checked"><img src="./../assets/img/icon_checked@2x.png" alt=""></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 其他信息选择 -->
      <div class="otherInfo">
        <div class="infoline" @click="NetInfo">
          <label for="" >入网资料</label><span></span>
          <div class="selectRes">维凯&nbsp;&nbsp;330227199102235379</div>
          <i class="more icon-arrow-right"></i>
        </div>        
        <div class="infoline" @click="Address">
          <label for="" >收货信息</label><span></span>
          <div class="selectRes">宁波维凯网络有限公司(测试)</div>
          <i class="more icon-arrow-right"></i>
        </div>       
        <div class="infoline" @click="Invoice">
          <label for="" >发票信息</label><span></span>
          <div class="selectRes">宁波维凯网络有限公司(测试)</div>
          <i class="more icon-arrow-right"></i>
        </div>
        <div class="packageline" v-show="checkedIndex !== ''">
          <p class="actprice">运费<span>+￥0.00</span></p>
          <p class="actprice">分期金额<span>+￥{{partFee}}x{{lasetPartTime}}(含利息)</span></p>
          <p class="sumprice">分期总金额<span>￥{{price}}</span></p>
        </div>        
        <div class="packageline" v-show="noPartTimeChecked">
          <p class="actprice">运费<span>+￥0.00</span></p>
          <p class="sumprice">应付现金<span>￥{{price}}</span></p>
        </div>
      </div>

      <!-- 支付方式 -->
      <div class="payMethod" v-show="noPartTimeChecked">
        <div class="selectPayMethods">请选择支付方式</div>
        <div class="methodsbox">
          <div class="methodsline" @click="payMethodSelect(1)">
            <div class="img"><img class="second" src="./../assets/img/icon_wb_cxlogo@2x.png" alt=""></div>
            <div class="methodsInfo">
              <p class="ptitle">畅想购白条支付&nbsp;&nbsp;<span class="icon-fire" style="color:#FF9A00"></span>&nbsp;&nbsp;<span class="icon-favourable" style="color:#F35719"></span></p>
              <p class="pdesc">10秒获取额度,最高12期免息</p>
            </div>
            <div class="paySelect"><div :style="payMethod === 1?'border:none;background:url('+ checkImg +')':''"></div></div>
          </div>
          <div class="methodsline" @click="payMethodSelect(2)">
            <div class="img"><i class="icon-wechat" style="font-size:64px;color:#41b035"></i></div>
            <div class="methodsInfo">
              <p class="ptitle">微信支付</p>
              <p class="pdesc">仅支持微信4.2及以上版本</p>
            </div>
            <div class="paySelect"><div :style="payMethod === 2?'border:none;background:url('+ checkImg +')':''"></div></div>
          </div>
          <div class="methodsline" @click="payMethodSelect(3)">
            <div class="img"><!-- <img class="second" src="./../assets/img/icon_alipay@2x.png" alt=""> --><i class="icon-alipay" style="font-size:64px;color:#19a0e5"></i></div>
            <div class="methodsInfo">
              <p class="ptitle">支付宝钱包支付</p>
              <p class="pdesc">推荐使用支付宝用户使用</p>
            </div>
            <div class="paySelect"><div :style="payMethod === 3?'border:none;background:url('+ checkImg +')':''"></div></div>
          </div>
        </div>
        <div class="dobtns" >
          <footer-btn title="确认付款" @submit="directPay"></footer-btn>
        </div>      
      </div>

      <div class="dobtn dopart" v-show="!noPartTimeChecked">
        <footer-btn title="确认分期" @submit="partPay"></footer-btn>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  @import './../assets/css/orderDetail';
  .my-div{
    background-color: #eee;
  }
  .container {
  }
</style>
<script>
  import {
    setScroll
  } from '../../../assets/js/common'
  import headerBar from '../../../components/header-bar.vue'
  // import data from './../data/orderDetail'
  import footerBtn from '../../../components/submit-btn.vue'
  import middlephone2 from '@/module/buyPhone/assets/img/middlephone2@2x.png'
  import checkImg from '@/module/buyPhone/assets/img/icon_meal_tick_cheaked@2x.png'
  import {mapState} from 'vuex'
  let data = {
    orderDetail: {
      title: '苹果 iPhone7 黑色 32GB',
      img: middlephone2,
      mobile: '13116625813',
      package: '4G全国106套餐',
      contract: '预存话费送手机',
      time: '24',
      gift: '123'
   }
  }
  export default {
    data () {
      return {
        orderDetail: data.orderDetail,
        noPartTimeChecked: true, // 不分期
        checkedIndex: '', // 分期时间选择
        parttime: ['12', '24', '36', '40'], // 分期期限
        payMethodStatus: 0, // 支付方式显示状态
        payMethod: 1, // 支付方式
        payFee: 0,
        partFee: 0,
        lasetPartTime: '',
        checkImg: checkImg
      }
    },
    beforeRouteLeave(to, from, next) {
      setScroll()
      next()
    },
    computed: {
      ...mapState({
        price: state => state.selectParams.payFee
      })
    },
    components: {
      headerBar,
      footerBtn
    },
    activated() {
      this.payFee = this.price
      this.payMethod = 1
      this.checkedIndex = ''
      this.noPartTimeChecked = true
      // let that = this
      // let sumprice =
    },
    methods: {
      // 分期选择
      selectPartTime(index) {
        let that = this
        that.checkedIndex = index
        that.noPartTimeChecked = false
        let month = that.parttime[index]
        let price = (that.payFee) / parseInt(month)
        that.partFee = price.toFixed(2)
        that.lasetPartTime = month
      },
      // 不分期
      noPartTime() {
        let that = this
        that.noPartTimeChecked = true
        that.checkedIndex = ''
        this.$store.state.selectParams.payFee = that.payFee
      },
      // 支付方式选择
      payMethodSelect(a) {
        let that = this
        that.payMethod = a
      },
      // 直接付款
      directPay() {
        let that = this
        this.$vux.alert.show({
          title: '提示',
          content: '支付成功（测试）',
          onHide () {
            that.$store.state.selectParams.mobileStatus = true
            // that.$router.push({path: '/buyPhone.html'})
          }
        })
      },
      // 分期付款
      partPay() {
        let that = this
        this.$vux.alert.show({
          title: '提示',
          content: '支付成功（测试）',
          onHide () {
            that.$store.state.selectParams.mobileStatus = true
            // that.$router.push({path: '/buyPhone.html'})
          }
        })
      },
      // 入网资料
      NetInfo() {
        this.$router.push({path: '/buyPhone/NetInfo', query: {}})
      },
      // 收货地址
      Address() {
        this.$router.push({path: '/buyPhone/Address', query: {}})
      },
      // 发票信息
      Invoice() {
        this.$router.push({path: '/buyPhone/Invoice', query: {}})
      }
    }
  }
</script>
