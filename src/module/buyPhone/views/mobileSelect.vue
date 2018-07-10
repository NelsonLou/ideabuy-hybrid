<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="选择号码" :back-to-web="true"></header-bar>
    </div>
    <div class="container">
      <div class="category">
        <span :class="{catebutton:true,'tagActive':sortTags===1}" @click="showMobileTypes">类型<i :class="{'triangle-down':true,'activedown':sortTags===1}"></i></span>
        <span :class="{catebutton:true,'tagActive':sortTags===2}" @click="sortPrePrice">预存话费<i :class="{'triangle-down':true,'activedown':sortTags===2}"></i></span>
        <span class="catebutton" @click="sortPrice" :style="sortTags===3 || sortTags ===4?'color:#FF8C56':''">价格<span style=""><i :class="{'triangle-up':true,'activeup':sortTags===3}"></i><i :class="{'triangle-down':true,'activedown':sortTags===4}"></i></span></span>
      </div>
      <!-- search tool (for area) -->
      <div class="searchtool">
        <label for=""><span>宁波</span></label>
        <input type="text" v-model="certical" placeholder="尾号搜索">
        <i class="searchbtn" @click="doSearch"></i>
      </div>

      <div class="mobileNumberList">
        <div class="empty" v-show="numberlist.length === 0">
          未搜索到任何结果
        </div>
        <div v-show="numberlist.length !==0" :style="index===checkedIndex?'border:none;border: 1px solid #ff8c56;overflow:hidden;':''" class="numberline" v-for="(item, index) in numberlist" @click="checkNumber(index)">
          <div class="box">
            <p class="number">{{item.number}}</p>
            <p class="tips">预存话费 ￥ <span>{{item.fee}}</span>元</p>
          </div>
          <div v-show="index === checkedIndex" class="checked"><img src="./../assets/img/icon_checked@2x.png" alt=""></div>
        </div>
      </div>

      <div class="dobtn">
        <footer-btn title="完成" @submit="SelectNumber"></footer-btn>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import './../assets/css/mixin';
  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
      color:    #989696;;
      text-indent: 10px;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
     color:    #989696;;
     text-indent: 10px;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
     color:    #989696;;
     text-indent: 10px;
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
     color:    #989696;;
     text-indent: 10px;
  }
  .container{
    padding-top: 96px;
    .category{
      background-color:#fff;
      position: fixed;;
      z-index: 111;
      border-bottom: 1px solid #e5e5e5;
      .catebutton{
        @include table-cell(88px);
        font-size:1.4rem;
        border-right:1px solid #e5e5e5;
        font-size: 28px;
        & i{
          margin-left:19px;
          color: #ababab;
          font-size: 14px;
        }
        &>span{
          display:inline-block;
          vertical-align:middle;
          margin-top: -12px;
          i{
            display:block;
            margin:6px 0 1px 19px;
            color: #ababab;
            font-size: 14px;
          }
        }
      }
      .catebutton:last-child{
        border:none
      }
      .tagActive{
        color: #FF8C56;
        & i {
          color: #FF8C56;
        }
      }
    }
    .searchtool{
      // @include line-height(113px);
      height: 113px;
      width: 100%;
      padding: 0 55px;
      margin-top: 89px;
      background-color: #fff;
      border-top: 1px solid #d3d3d3;
      border-bottom: 1px solid #d3d3d3;
      position: relative;
      display: inline-flex;
      align-items: center;
      // justify-content: center;
      &>label{
        margin-right: 30px;
      }
      &> input{
        @include inputInit();
        height: 60px;
        width: 75%;
        text-indent: 10px;
        background-color: #efefef;
        border-radius: 10px;
        color: #989696;
      }
      .searchbtn{
        position: absolute;
        right: 17%;
        top: 50%;
        margin-top: -20px;
        width: 40px;
        @include line-height(40px);
        background-Image:url('http://idbuy.nbxinyitec.com/search.svg');
        background-position: center right;
        background-repeat: no-repeat;
        background-size: contain;
        display: inline-block;
        vertical-align: middle;
        font-weight: bold;
        color: #989696;
      }
    }
    .mobileNumberList{
      width: 100%;
      background-color: #fff;
      .numberline{
        position: relative;
        display: inline-block;
        width: 50%;
        height: 122px;
        border-bottom:1px solid #dcdcdc;
        border-right:1px solid #dcdcdc;
        background-color: #fff;
        text-align: left;
        text-indent: 57px;
        vertical-align: middle;
        .number{
          font-size: 32px;
          color: #383838;
          font-weight: bold;
          margin-top: 23px;
        }
        .tips{
          margin-top: 15px;
          color: #A9A9A9;
          font-size: 23px;
          &>span{
            font-size: 23px;
          }
        }
        .checked{
          position: absolute;
          right:0;
          bottom:0;
          width: 49px;
          height: 34px;
          z-index: 11;
          text-indent: 0;
          img{
            width: 100%;
          }
        }
      }
      .numberline:nth-child(odd){
        // border-right:1px solid #dcdcdc;
      }
      .empty{
        @include line-height(200px);
        text-align: center;
        font-size: 28px;
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

    .activeup{
      border-bottom: 10px solid #FF8C56 !important;
    }    
    .activedown{
      border-top: 10px solid #FF8C56 !important;
    }
    .triangle-up {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #999;
        display: inline-block;
    }
    .triangle-down {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #999;
        display: inline-block;
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
  // // import data from './../data/numberSelect'
  // let data = {

  // }
  export default {
    data () {
      return {
        numberlist: [], // 号码列表
        Tempnumberlist: [], // 号码列表
        PrePriceIndex: 0, // 资费点击
        PriceIndex: 0, // 价格点击
        certical: '', // 搜索条件
        checkedIndex: '',
        number: {
          number: '',
          fee: ''
        },
        sortTags: 0 // sortTag
        // searchResult: true // 搜索结果状态
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
      let that = this
      let mobileStatus = this.$store.state.selectParams.mobileStatus
      this.getNumberList()
      that.sortTags = 0
      if (mobileStatus) {
        that.checkedIndex = ''
      }
    },
    mounted() {
    },
    methods: {
      // get numberlist
      getNumberList() {
        let that = this
        this.axios.get('getNumberList')
        .then(res => {
          let data = res.data.number
          that.numberlist = data
          that.Tempnumberlist = data
        }).catch(res => {
          console.log(res)
        })
      },
      // number type list
      showMobileTypes() {
        this.sortTags = 0
        this.$vux.alert.show({
          title: '提示',
          content: '暂未开放'
        })
      },
      // 按照资费排序
      sortPrePrice() {
        let that = this
        let list = that.numberlist
        that.PriceIndex = 0
        that.sortTags = 2
        that.PrePriceIndex ++
        if (that.PrePriceIndex % 2 === 0) {
          list.sort((x, y) => {
            return x['fee'] - y['fee']
          })
        } else {
          list.sort((x, y) => {
            return y['fee'] - x['fee']
          })
        }
      },
      // 按照资费排序
      sortPrice() {
        let that = this
        let list = that.numberlist
        that.PrePriceIndex = 0
        that.PriceIndex ++
        if (that.PriceIndex % 2 === 0) {
          that.sortTags = 3
          list.sort((x, y) => {
            return x['price'] - y['price']
          })
        } else {
          list.sort((x, y) => {
            that.sortTags = 4
            return y['price'] - x['price']
          })
        }
      },
      // 搜索
      doSearch() {
        let that = this
        let tips = that.certical
        tips = new RegExp(tips)
        let list = that.numberlist.filter((n) => {
          if (!n.number.match(tips)) {
            return false
          }
          return n
        })
        that.numberlist = list
        if (that.certical === '') {
          that.numberlist = that.Tempnumberlist
        }
      },
      // 选择号码
      checkNumber(index) {
        let that = this
        that.checkedIndex = index
        this.$store.state.selectParams.number.number = that.numberlist[index].number
        this.$store.state.selectParams.number.fee = that.numberlist[index].fee
      },
      // 选择完成
      SelectNumber() {
        let that = this
        if (that.checkedIndex === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择号码(测试)'
          })
        } else {
          this.$store.state.selectParams.mobileStatus = false
          this.$router.go(-1)
          eventHub.$emit('backword')
        }
      }
    }
  }
</script>
