<template>
<div class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title='联通宽带' :back-to-app="true"></header-bar>
  </div>
  <div class="container">
    <ul class='broadbandNav clearfix bgColor'>
      <li @click='switchN' v-bind:class="{ 'navActive' : isNew, 'navDefault': !isNew}" class="left"><span class="icon-broadband-repair"></span>宽带新装</li>
      <li @click='switchR' v-bind:class="{ 'navActive' : !isNew, 'navDefault': isNew}" class="right"><span class="icon-boradband-time"></span>宽带续约</li>
    </ul>
    <div v-if='newBroadband' class="newBroadband">
      <div class="proGressBar">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>完</li>
        </ul>
        <ul class="proGressBarTxt">
          <li>身份验证</li>
          <li>选择套餐</li>
          <li>确认订单</li>
          <li>支付/完成</li>
        </ul>
      </div>
      <div class="broadbandMeal bgColor">
        <ul class="clearfix">
          <li class="clearfix">
            <div class="broadbandMealImg imgA left">
            </div>
            <div class="broadbandMealMain left">
              <span>{{mealDateA}}</span>
              <span>{{mealPayA}}</span>
              <button @click='goNewRroadbandA'>白条新装</button>
            </div>
          </li>
          <li class="clearfix">
            <div class="broadbandMealImg imgB left">
            </div>
            <div class="broadbandMealMain left">
              <span>{{mealDateB}}</span>
              <span>{{mealPayB}}</span>
              <button @click='goNewRroadbandB'>白条新装</button>
            </div>
          </li>
          <li class="clearfix">
            <div class="broadbandMealImg imgC left">
            </div>
            <div class="broadbandMealMain left">
              <span>{{mealDateC}}</span>
              <span>{{mealPayC}}</span>
              <button @click='goNewRroadbandC'>白条新装</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="brdRenewal">
      <div class="proGressBar">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>完</li>
        </ul>
        <ul>
          <li>身份验证</li>
          <li>选择套餐</li>
          <li>确认订单</li>
          <li>支付/完成</li>
        </ul>
      </div>
      <div class="broadbandMeal bgColor">
        <ul class="clearfix">
          <li class="clearfix">
            <div class="broadbandMealImg imgA left">
            </div>
            <div class="broadbandMealMain left">
              <span>{{mealDateA}}</span>
              <span>{{mealPayA}}</span>
              <button @click='goBrdRenewalA'>白条续约</button>
            </div>
          </li>
          <li class="clearfix">
            <div class="broadbandMealImg imgB left">
            </div>
            <div class="broadbandMealMain left">
              <span>{{mealDateB}}</span>
              <span>{{mealPayB}}</span>
              <button @click='goBrdRenewalB'>白条续约</button>
            </div>
          </li>
          <li class="clearfix">
            <div class="broadbandMealImg imgC left">
            </div>
            <div class="broadbandMealMain left">
              <span>{{mealDateC}}</span>
              <span>{{mealPayC}}</span>
              <button @click='goBrdRenewalC'>白条续约</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>
.container {
  padding-top: 96px;
  width: 100vw;
  min-height: 100vh;
  font-size: 28px;
}

.broadbandNav {
  width: 100vw;
  margin-top: 0;
}

.broadbandNav li {
  width: 12.85rem;
  height: 5rem;
  line-height: 5rem;
  margin-right: 2.5rem;
  text-align: center;
  font-family: SourceHanSansCN-Regular;
}

.navDefault {
  color: #999999;
  border: none;
}

.navActive {
  color: #FF8C56;
  border-bottom: 6px solid #FF8C56;
}

.broadbandNav li:first-child {
  margin-left: 2.5rem;
}

.broadbandNav .icon-global {
  margin-right: 1.5rem;
}

.proGressBar {
  margin: auto 2rem auto 2rem;
}

.proGressBar ul:first-child {
  background-color: #FF8C56;
  margin: 0 auto;
  height: 9px;
  width: 25.85rem;
  margin-top: 2.51rem;
  display: flex;
}

.proGressBar ul:first-child li {
  margin-top: -0.7rem;
  width: 1.85rem;
  height: 1.85rem;
  background-color: #FF8C56;
  color: #FFFFFF;
  font-size: 24px;
  border-radius: 1rem;
  margin-left: 4.15rem;
  text-align: center;
  line-height: 1.85rem;
  flex: 1;
}

.proGressBar ul:first-child li:first-child {
  margin-left: 0;
}

.proGressBar ul:last-child {
  display: block;
  width: 26rem;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 1.9rem;
  display: flex;
}

.proGressBar ul:last-child li {
  font-size: 24px;
  color: #999999;
  flex: 1;
}

.broadbandMeal {
  width: 100vw;
}

.broadbandMeal ul {
  width: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
}

.broadbandMeal ul li {
  display: flex;
  display: block;
  border-bottom: 1px solid #E5E5E5;
}

.broadbandMealImg {
  width: 180px;
  height: 180px;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.imgA {
  background: url(../img/wb_img1@2x.png) no-repeat 100%;
}

.imgB {
  background: url('../img/wb_img2@2x.png') no-repeat 100%;
}

.imgC {
  background: url(../img/wb_img3@2x.png) no-repeat 100%;
}

.broadbandMealMain {
  margin-left: 1.75rem;
}

.broadbandMealMain span {
  display: block;
  margin-top: 1.8rem;
  color: #444444;
  font-family: STFangsong;
}

.broadbandMealMain span:nth-child(2) {
  margin-top: 0.75rem;
  color: #898989;
  font-size: 24px
}

.broadbandMealMain button {
  margin-top: 1.5rem;
  width: 240px;
  height: 69px;
  background-color: #FF8C56;
  color: #FFFFFF;
  border: none;
  border-radius: 0.5rem;
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
</style>
<script>
import {
  setScroll,
  setupWebViewJavascriptBridge
} from '../../../assets/js/common'
import headerBar from '../../../components/header-bar.vue'
export default {
  mounted() {
    setupWebViewJavascriptBridge((bridge) => {
      bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {})
    })
  },
  data() {
    return {
      newBroadband: true,
      mealPayA: '支持沃白条、支付宝、微信支付',
      mealDateA: '单宽带20M 一年买10送4',
      mealPayB: '支持沃白条、支付宝、微信支付',
      mealDateB: '宽带50M+固话 一年买10送4',
      mealPayC: '支持沃白条、支付宝、微信支付',
      mealDateC: '宽带50M+固话 两年买16送6',
      isNew: true,
      meal: ''
    }
  },
  methods: {
    goNewRroadbandA() {
      this.meal = 'a'
      this.goRouter()
    },
    goNewRroadbandB() {
      this.meal = 'b'
      this.goRouter()
    },
    goNewRroadbandC() {
      this.meal = 'c'
      this.goRouter()
    },
    goBrdRenewalA() {
      this.meal = 'a'
      this.goBrdRenewal()
    },
    goBrdRenewalB() {
      this.meal = 'b'
      this.goBrdRenewal()
    },
    goBrdRenewalC() {
      this.meal = 'c'
      this.goBrdRenewal()
    },
    goRouter() {
      this.$router.push({
        path: '/broadband/newBroadband',
        query: {
          meal: this.meal
        }
      })
    },
    goBrdRenewal() {
      this.$router.push({
        path: '/broadband/brdRenewal',
        query: {
          meal: this.meal
        }
      })
    },
    switchN() {
      this.newBroadband = true
      this.isNew = true
    },
    switchR() {
      this.newBroadband = false
      this.isNew = false
    }
  },
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  computed: {},
  components: {
    headerBar
  }
}
</script>
