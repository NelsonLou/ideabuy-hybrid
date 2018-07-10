<template>
<div class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="抢购手机" :back-to-web="true"></header-bar>
  </div>
  <div class="container">
    <!-- 轮播图 -->
    <div class="banner">
      <div class="swiper">
        <div class="swiper-item">
          <img :src="GoodsDetail.img" alt="">
        </div>
      </div>
      <div class="page">
        <span class="activePage"></span>
      </div>
    </div>

    <!-- 产品介绍 -->
    <div class="goodsinfo">
      <div class="infobox">
        <p class="title">{{GoodsDetail.name}}&nbsp;&nbsp;<span class="special">{{GoodsDetail.subtitle}}</span></p>
        <div class="price">
          ￥<span>{{GoodsDetail.price}}</span>
        </div>
      </div>
    </div>

    <!-- 产品选型 -->
    <div class="typeinfo">
      <div class="typebox">
        <div class="infoline" @click="showTypeBox">
          <div style="line-height: 80px"><span class="ver" v-if="lasttype === ''">请选择 手机配置</span><span class="ver" v-if="lasttype !== ''">已选配置</span><span v-if="lasttype !== ''" style="margin-left: 10%;color:#FF8D3B;" class="lasttype">{{typebanben}}{{typecolor}}{{typeneicun}}</span>
            <i class="more icon-arrow-right"></i>
          </div>
        </div>
        <div class="infoline" @click="showParamsBox">
          <div>手机参数<i class="more icon-arrow-right"></i></div>
        </div>
        <div class="infoline">
          <div @click="selectAddress">商品归属 <span style="margin-left:27px">宁波</span><i style="margin-left:10px;font-size:16px;color: #ababab;" class="icon-arrow-bottom-small"></i>
            <div class="Instock"><span class="isstock">有货</span><span>(省内配送)</span></div>
          </div>

        </div>
      </div>
    </div>

    <!-- 手机配置 -->
    <div class="typedetail" v-show="typedetailActive" @click="typedetailHidden($event)">
      <div class="selectResult">
        <div class="proselect">产品规格 <span style="margin-left: 40px">{{typebanben}}{{typecolor}}{{typeneicun}}</span><span v-if="lasttype === ''" style="margin-left: 10px">暂无选中规格</span></div>
        <div class="typeline">
          <div v-for="(item,index) in typelist.banben">
            <p for="" class="typename" style="padding-top: 23px">{{item.type}}</p>
            <div class="typetips">
              <span v-for="(tl,ti) in item.cont" :style="'overflow:hidden;width: calc('+ 94/(item.cont.length>2? 3:item.cont.length) +'% - 5.5px)'" :class="{specialbox:ti===banbenti}" @click="selecttypebanben(ti)">{{tl.name}}<div v-show="ti===banbenti" class="checked"><img src="./../assets/img/icon_checked@2x.png" alt=""></div></span>
            </div>
          </div>
        </div>
        <div class="typeline">
          <div v-for="(item,index) in typelist.color">
            <p for="" class="typename">{{item.type}}</p>
            <div class="typetips">
              <span v-for="(tl,ti) in item.cont" :style="'overflow:hidden;width: calc('+ 94/(item.cont.length>2? 3:item.cont.length) +'% - 5.5px)'" :class="{specialbox:ti===colorti}" @click="selecttypecolor(ti)">{{tl.name}}<div v-show="ti===colorti" class="checked"><img src="./../assets/img/icon_checked@2x.png" alt=""></div></span>
            </div>
          </div>
        </div>
        <div class="typeline">
          <div v-for="(item,index) in typelist.neicun">
            <p for="" class="typename">{{item.type}}</p>
            <div class="typetips">
              <span v-for="(tl,ti) in item.cont" :style="'overflow:hidden;width: calc('+ 94/(item.cont.length>2? 3:item.cont.length) +'% - 5.5px)'" :class="{specialbox:ti===neicunti}" @click="selecttypeneicun(ti)">{{tl.name}}<div v-show="ti===neicunti" class="checked"><img src="./../assets/img/icon_checked@2x.png" alt=""></div></span>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomBtn" @click="typeselectEnd"><span>完成</span></div>
    </div>

    <!-- 手机参数 -->
    <div class="mobileParams" v-show="mobileParamsActive" @click="hiddenParams($event)">
      <div class="ParamsList">
        <div style="text-align:center">产品参数</div>
        <div class="params">
          <div class="paramsline" v-for="(item,index) in mobileParams">
            <label for="">{{item.name}}</label><span>{{item.con}}</span>
          </div>
        </div>
      </div>
      <div class="bottomBtn" @click="showParamsEnd"><span>完成</span></div>
    </div>
    <!-- 商品详情 -->
    <div class="goods">
      <tab bar-active-color="#fff" active-color="#3e3e3e">
        <tab-item :style="activeTab1 === 1?'background-color:#fff':'background-color:#f5f5f5'" selected @on-item-click="getGoodsdetail">图文详情
        </tab-item>
        <tab-item :style="activeTab2 === 1?'background-color:#fff':'background-color:#f5f5f5'" @on-item-click="getComments">商品评价
        </tab-item>
      </tab>

      <div class="detail" v-show="activeTab1 === 1">
        <!--           <div class="top">
            <span class="throughline"></span>
            <span class="text"><span class="arc arc-left"></span><span style="padding: 0 40px">商品信息</span><span class="arc arc-right"></span></span>
          </div> -->
        <div class="img">
          <img style="width: 100%" src="./../assets/img/mobileDeatil.jpg" alt="">
        </div>
      </div>
      <div class="comments" v-show="activeTab2 === 1">
        <div class="top">
          <span class="throughline"></span>
          <span class="text">商品评价</span>
        </div>
        <div class="tags">
          <span class="all" @click="doCommentActive(1)" :style="commentActive === 1?'background:#FF8C56;color:#fff':'background-color:#FFE9DF;color:#212121'">全部</span>
          <span class="good" @click="doCommentActive(2)" :style="commentActive === 2?'background:#FF8C56;color:#fff':'background-color:#FFE9DF;color:#212121'">好评(356)</span>
          <span class="good" @click="doCommentActive(3)" :style="commentActive === 3?'background:#FF8C56;color:#fff':'background-color:#FFE9DF;color:#212121'">中评(124)</span>
          <span class="good" @click="doCommentActive(4)" :style="commentActive === 4?'background:#FF8C56;color:#fff':'background-color:#FFE9DF;color:#212121'">追评(320)</span>
          <span class="bad">差评(120)</span>
        </div>
        <div class="ev-statistics">
          <div class="ev-fl">
            <p>好评率</p>
            <p class="percentage">{{ good_ev }}</p>
          </div>
          <div class="ev-fr">
            <ul>
              <li>
                <span class="icon-face-smile" style="color:#F65A45"></span>
                <div class="ev-bg">
                  <div class="good-ev" :style="'width:'+good_ev"></div>
                </div>
              </li>
              <li>
                <span class="icon-face-normal" style="color:#FF8C56"></span>
                <div class="ev-bg">
                  <div class="commonly-ev" :style="'width:'+commonly_ev"></div>
                </div>
              </li>
              <li>
                <span class="icon-face-bad" style="color:#999"></span>
                <div class="ev-bg">
                  <div class="bad-ev" :style="'width:'+bad_ev"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="ev-content">
          <ul>
            <li v-for="(item,index) in commentList" :key="index">
              <div class="ev-ctop">
                <div class="face">
                  <span class="icon-avatar"></span>
                </div>
                <div class="text">
                  <span class="tel">{{ item.user_name }}</span>
                  <span class="fraction">{{ item.user_pint }}分</span>
                  <div class="star">
                    <span v-for="(item,index) in item.evaluate_star" :key="index" class="icon-star"></span>
                  </div>
                </div>
                <div class="ev-change">
                  <p>所选套餐：{{ item.buy_packge }}</p>
                  <span class="ev-time">{{ item.buy_time }}</span>
                </div>
              </div>
              <div class="ev-cbottom">
                <p>{{ item.user_meg }}</p>
                <div class="reply" v-if="item.user_message">
                  <div class="top"></div>
                  <div class="content">
                    <div class="reply-face">
                      <span class="icon-chinese-knot"></span>
                    </div>
                    <div class="reply-name">{{ item.user_message[0].user_name }}：</div>
                    <p class="reply-content">
                      {{ item.user_message[0].message }}
                    </p>
                    <p class="reply-time">
                      {{ item.user_message[0].date }}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 购买 -->
    <div class="buybox my-fixed">
      <div class="">
        <span class="buybtn new" @click="goToNewBuy">新用户购买</span>
        <span class="buybtn old" @click="goToOldBuy">老用户购买</span>
      </div>
    </div>

  </div>
</div>
</template>
<style type="text/css" lang="scss">
.goods {
    .vux-tab-item {
        border-bottom: none !important;
        border-bottom-color: transparent !important;
    }
    .vux-tab .vux-tab-item {
        background: none;
    }
}
</style>
<style scoped rel="stylesheet/scss" lang="scss" >
@import './../assets/css/goodsdetail.scss';
</style>
<script>
import {
  setScroll
} from '../../../assets/js/common'
import {
  Tab,
  TabItem
} from 'vux'
import headerBar from '../../../components/header-bar.vue'
let data = {
  packagedown: {
    user_value: [10, 5, 10, 3],
    evaluate_value: ['80%', '50%', '30%'],
    user_evaluate: [{
      user_img: 'http://balabala',
      user_name: 15276951236,
      user_pint: 750,
      evaluate_star: 5,
      buy_packge: '4G全国76元套餐',
      buy_time: '2017/08/22',
      user_meg: '用了几百年了,越来越扣？',
      user_message: [{
        user_img: '',
        user_name: '中国联通官方客服',
        message: '您好，经查询您已成功办理老用户存费送业务合约，新合约会根据元合约情况自动生效。',
        date: '2017/08/23'
      }]
    }, {
      user_img: 'http://balabala',
      user_name: 15276951236,
      user_pint: 750,
      evaluate_star: 5,
      buy_packge: '4G全国76元套餐',
      buy_time: '2017/08/22',
      user_meg: '用了几百年了,越来越扣？',
      user_message: [{
        user_img: '',
        user_name: '中国联通官方客服',
        message: '您好，经查询您已成功办理老用户存费送业务合约，新合约会根据元合约情况自动生效。',
        date: '2017/08/23'
      }]
    }, {
      user_img: 'http://balabala',
      user_name: 15276951236,
      user_pint: 750,
      evaluate_star: 5,
      buy_packge: '4G全国76元套餐',
      buy_time: '2017/08/22',
      user_meg: '用了几百年了,越来越扣？',
      user_message: [{
        user_img: '',
        user_name: '中国联通官方客服',
        message: '您好，经查询您已成功办理老用户存费送业务合约，新合约会根据元合约情况自动生效。',
        date: '2017/08/23'
      }]
    }, {
      user_img: 'http://balabala',
      user_name: 15276951236,
      user_pint: 750,
      evaluate_star: 5,
      buy_packge: '4G全国76元套餐',
      buy_time: '2017/08/22',
      user_meg: '用了几百年了,越来越扣？',
      user_message: [{
        user_img: '',
        user_name: '中国联通官方客服',
        message: '您好，经查询您已成功办理老用户存费送业务合约，新合约会根据元合约情况自动生效。',
        date: '2017/08/23'
      }]
    }]
  }
}
export default {
  data() {
    return {
      activeTab1: 1,
      activeTab2: 0,
      GoodsDetail: [], // 商品详细信息
      typedetailActive: 0,
      mobileParamsActive: 0,
      typelist: [], // 手机配置
      mobileParams: [], // 手机参数
      banbenti: '',
      typebanben: '',
      colorti: '',
      typecolor: '',
      neicunti: '',
      typeneicun: '',
      lasttype: '',
      commentList: [],
      good_ev: 0,
      commonly_ev: 60,
      bad_ev: 15,
      commentActive: 1
    }
  },
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  components: {
    headerBar,
    Tab,
    TabItem
  },
  activated() {
    let that = this
    let clearStatus = this.$store.state.clearStatus
    setTimeout(() => {
      this.getGoods()
    }, 500)
    if (clearStatus) {
      that.banbenti = ''
      that.typebanben = ''
      that.colorti = ''
      that.typecolor = ''
      that.neicunti = ''
      that.typeneicun = ''
      that.lasttype = ''
    }
    this.$store.state.selectParams.desc = ''
    this.$store.state.selectParams.desc2 = ''
    this.$store.state.selectParams.tprice = ''
    this.$store.state.selectParams.hytime = ''
    this.$store.state.selectParams.number.number = ''
    this.commentActive = 1
  },
  methods: {
    // 评论切换动画
    doCommentActive(index) {
      this.commentActive = index
    },
    // 选择商品归属地
    selectAddress() {
      this.$vux.alert.show({
        title: '提示',
        content: '暂未开放(测试)'
      })
    },
    // 获取商品详情
    getGoods() {
      let para = {
        id: this.$route.query.id
      }
      this.axios.post('goodDetail', para).then(res => {
        let that = this
        let data = res.data[0]
        that.GoodsDetail = data
      }).catch(res => {
        console.log(res)
      })
    },
    // 获取图文详情
    getGoodsdetail(index) {
      let that = this
      that.activeTab1 = 1
      that.activeTab2 = 0
    },
    // 获取评价
    getComments(index) {
      let that = this
      that.activeTab2 = 1
      that.activeTab1 = 0
      this.good_ev = data.packagedown.evaluate_value[0]
      this.commonly_ev = data.packagedown.evaluate_value[1]
      this.bad_ev = data.packagedown.evaluate_value[2]
      this.commentList = data.packagedown.user_evaluate
    },
    // show 手机配置
    showTypeBox() {
      let that = this
      let type = that.GoodsDetail.params
      that.typedetailActive = 1
      that.typelist = type
    },
    // 选中配置
    selecttypebanben(ti) {
      let that = this
      that.banbenti = ti
      that.lasttype = 1
      that.typebanben = `'` + that.GoodsDetail.params.banben[0].cont[ti]['name'] + `',`
    },
    // 选中配置
    selecttypecolor(ti) {
      let that = this
      that.colorti = ti
      that.lasttype = 1
      that.typecolor = `'` + that.GoodsDetail.params.color[0].cont[ti]['name'] + `',`
    },
    // 选中配置
    selecttypeneicun(ti) {
      let that = this
      that.neicunti = ti
      that.lasttype = 1
      that.typeneicun = `'` + that.GoodsDetail.params.neicun[0].cont[ti]['name'] + `'`
    },
    // 手机配置隐藏
    typedetailHidden(event) {
      let that = this
      let target = event.target.className
      if (target === 'typedetail') {
        that.typedetailActive = 0
      }
    },
    // 选中配置结束
    typeselectEnd() {
      let that = this
      that.typedetailActive = 0
      this.$store.state.selectParams.typelist = that.typebanben + that.typecolor + that.typeneicun
      this.$store.state.selectParams.price = that.GoodsDetail.price
    },
    // show 手机参数
    showParamsBox() {
      let that = this
      that.mobileParams = that.GoodsDetail.detail
      that.mobileParamsActive = 1
    },
    // show 手机参数
    hiddenParams(event) {
      let that = this
      let target = event.target.className
      if (target === 'mobileParams') {
        that.mobileParamsActive = 0
      }
    },
    // 手机参数浏览完成
    showParamsEnd() {
      let that = this
      that.mobileParamsActive = 0
    },
    // 新用户购买
    goToNewBuy() {
      let that = this
      if (that.typecolor === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请先选择手机配置(测试)'
        })
      } else {
        this.$store.state.selectParams.mobileStatus = true
        this.$store.state.numberVerify = 1
        this.$router.push({
          path: '/buyPhone/packageSelect',
          query: {}
        })
      }
    },
    // 老用户购买
    goToOldBuy() {
      let that = this
      if (that.typecolor === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请先选择手机配置(测试)'
        })
      } else {
        this.$store.state.selectParams.mobileStatus = true
        this.$store.state.numberVerify = 2
        this.$router.push({
          path: '/buyPhone/packageSelect',
          query: {}
        })
      }
    }
  }
}
</script>
