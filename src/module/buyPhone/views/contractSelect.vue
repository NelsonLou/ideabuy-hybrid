<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="选择合约" :back-to-web="true"></header-bar>
    </div>
    <div class="container">
      <!-- contractList -->
      <div class="contractList">
        <div class="typelist" :style="index === dafaultActive? 'background-color:#fff;border-left:4px solid #FF8D3B ':''" v-for="(item,index) in contract" @click="ChangeContract(index,item.id)">
          <span>{{item.name}}元</span>
        </div>
      </div>

      <!-- content -->
      <div class="content">
        <div class="conline packageline">
          <p class="title">1.确认套餐资费</p>
            <dl v-for="(item,index) in selectContract.con1"><dt>{{item.name}}</dt><dd>{{item.desc}}</dd></dl>
            <div class="otherpack"><span>套餐超出及其它业务咨询<i class="icon-arrow-bottom-small"></i></span></div>
        </div>
        <div class="conline dealtime">
          <p class="title">2.确认适合您的合约期限</p>
          <div :class="{parent:true,'checkedborder':ActiveMonth===index}" v-for="(item,index) in deal" :style="'width: calc('+ 89/(deal.length>2? 3:deal.length) +'% - 5.5px)'" @click="monthPackageSelect(index)">
            <span >{{item.time}}</span>
            <div class="img" v-show="ActiveMonth === index"><img src="./../assets/img/icon_checked@2x.png" alt=""></div>
          </div>
        </div>
        <div class="conline summary">
          <div class="summarydesc">
            <p>含预存话费1910元,分{{parttime}}期返还,合约最后一个月返93元,剩余部分每月返79元</p>
          </div>
          <div class="parent packageline">
              <dl v-for="(item,index) in monthContract"><dt style="text-indent:20px">{{item.name}}</dt><dd style="text-indent:20px">{{item.desc}}元</dd></dl>
          </div>
        </div>
      </div>

      <div class="dobtn">
        <footer-btn title="确认" @submit="SelectContract"></footer-btn>
      </div>

    </div>
  </div>
</template>
<style lang="scss" scoped>
@import './../assets/css/mixin';
  .my-div{
    background: #fff;
  }
  .checkedborder{
    border: none !important;
    border:1px solid #FF8C56 !important;
  }
  .container{
    padding-top: 96px;
    background-color: #fff;
    .contractList{
      display:inline-block;
      width: 146px;
      .typelist{
        @include line-height(107px)
        width: 100%;
        background-color: #f5f5f5;
        color: #A8A8A8;
        text-align: center;
      }
    }
    .content{
      display:inline-block;
      width: calc(100% - 160px);
      vertical-align: top;
      padding: 0px 23px 0 23px;
      .conline{
        .title{
          margin: 26px 0;
        }
      }
      .packageline{
        & dl{
          border:1px solid #e5e5e5;
        }
        & dl dt{
          float: left;
          display: inline-block;
          width: 50%;
          @include line-height(66px);
          border-right: 1px solid #e5e5e5;
          text-indent: 10px;
          color: #383838;
        }
        & dl dd{
          display: inline-block;
          width: 50%;
          margin-left: 0;
          @include line-height(66px);
          text-indent: 10px;
          color: #383838;
        }
        .otherpack{
          position:relative;
          border:1px solid #e5e5e5;
          border-top: 0;
          text-indent: 10px;
          @include line-height(61px);
          & i{
            @include arraw-right(61px,20px)
            font-size: 14px;
            color: #ababab;
          }
        }
      }
      .packageline dl:nth-of-type(1){
        // border-top: 0 !important;
        border-bottom: 0 !important;
      }
      .summary {
        margin:5px 0;
        border: 1px solid #e5e5e5;
        border-radius: 5px;
        .summarydesc{
          padding: 20px;
        }
      }
      .dealtime{
        .parent{
            position: relative;
            display: inline-block;
            text-align: center;
            margin: 10.5px 10px;
            border: 1px solid #e5e5e5;
            border-radius: 5px;
            height: 61px;
            overflow:hidden;
            @include line-height(61px);
            & p{

            }
            .img{
              position: absolute;
              right:0;
              bottom:-1px;
              width: 49px;
              height: 34px;
              z-index: 11;
              text-indent: 0;
              line-height: 34px;
              img{
                width: 100%;
              }
            }
        }
      }
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
    data () {
      return {
        contract: [], // 号码列表
        dafaultActive: 0, // 默认合约
        selectContract: [],
        ActiveId: 1,
        monthContract: [], // 分期详细
        ActiveMonth: 0, // 分期默认选择时间
        parttime: '',
        deal: {}
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
    computed: {
    },
    activated() {
      this.getContract()
    },
    methods: {
      // get contractContent
      getContract() {
        let that = this
        this.axios.get('getContract')
        .then(res => {
          let data = res.data.list
          that.contract = data
          that.selectContract = that.contract[that.ActiveId].cont
          that.deal = that.selectContract.con2.deal
          that.monthContract = that.contract[that.ActiveId].cont.con2.deal[0].other
        }).catch(res => {
          console.log(res)
        })
      },
      // 选择合约
      ChangeContract(index, id) {
        let that = this
        that.dafaultActive = index
        that.ActiveId = id
        that.selectContract = that.contract[index].cont
        that.monthContract = that.contract[index].cont.con2.deal[0].other
        that.ActiveMonth = 0
      },
      // 选择分期时间
      monthPackageSelect(index) {
        let that = this
        let xx = that.selectContract.con2.deal[index]
        that.monthContract = xx.other
        that.ActiveMonth = index
        that.parttime = that.selectContract.con2.deal[that.ActiveMonth].time
      },
      // 合约选择完成
      SelectContract() {
        let that = this
        let tprice = that.contract[that.dafaultActive].name // 套餐费用
        let hytime = that.parttime // 合约时间
        let hyprice = 1000
        let selectParams = this.$store.state.selectParams
        let tdesc = that.selectContract.con1[0].desc + '通话   ' + that.selectContract.con1[1].desc + '流量' // 套餐详情
        let sumprices = hyprice + parseInt(selectParams.price)
        let tdesc2 = '合约总价' + sumprices + '元   含话费' + selectParams.huafei + '元' // 套餐详情2
        this.$store.state.selectParams.tprice = tprice
        this.$store.state.selectParams.sumprice = hyprice
        this.$store.state.selectParams.hytime = hytime
        this.$store.state.selectParams.desc = tdesc
        this.$store.state.selectParams.desc2 = tdesc2
        this.$router.go(-1)
        eventHub.$emit('backword')
      }
    }
  }
</script>
