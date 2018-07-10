<template>
<div class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="宽带新装" :back-to-web="true"></header-bar>
  </div>
  <div class="container">
    <div class="brdAdv">
    </div>
    <div class="brdLocation bgcolor">
      <form class="brdLocationForm" method="post">
        <span class="icon-orange icon-position"></span>
        <label>安装区域:</label>
        <span class="location">宁波市鄞州区</span>
      </form>
    </div>
    <div class="brdChooseMeal bgcolor">
      <ul class="clearfix">
        <span class="brdChooseMealTitle">套餐</span>
        <li class="left">
          <button @click='brdMeal = "a";handle()' class="btnTiny" v-bind:class="{ 'btnActive' : brdMeal==='a', 'btnDefault': brdMeal!=='a'}">
            单宽带
            <span class="icon-triangle-checked" v-bind:class="{ 'tipsActive' : brdMeal==='a', 'tipsDefault': brdMeal!=='a'}"></span>
          </button>
          <span>仅装宽带</span>
        </li>
        <li class="left">
          <button @click='brdMeal = "b";handle()' class="btnTiny" v-bind:class="{ 'btnActive' : brdMeal==='b', 'btnDefault': brdMeal!=='b'}">
            180元/月
            <span class="icon-triangle-checked" v-bind:class="{ 'tipsActive' : brdMeal==='b', 'tipsDefault': brdMeal!=='b'}"></span>
          </button>
          <span>宽带+固话</span>
        </li>
      </ul>
      <ul class="clearfix">
        <span class="brdChooseMealTitle">套餐速率</span>
        <li class="left">
          <button @click='brdSpeed = "a";handle()' class="btnTiny" v-bind:class="{ 'btnActive' : brdSpeed==='a', 'btnDefault': brdSpeed!=='a'}">
            20M
            <span class="icon-triangle-checked" v-bind:class="{ 'tipsActive' : brdSpeed==='a', 'tipsDefault': brdSpeed!=='a'}"></span>
          </button>
          <span>仅装宽带</span>
        </li>
        <li class="left">
          <button @click='brdSpeed = "b";handle()' class="btnTiny" v-bind:class="{ 'btnActive' : brdSpeed==='b', 'btnDefault': brdSpeed!=='b'}">
            50M
            <span class="icon-triangle-checked" v-bind:class="{ 'tipsActive' : brdSpeed==='b', 'tipsDefault': brdSpeed!=='b'}"></span>
          </button>
          <span>宽带+固话</span>
        </li>
        <li class="left">
          <button @click='brdSpeed = "c";handle()' class="btnTiny" v-bind:class="{ 'btnActive' : brdSpeed==='c', 'btnDefault': brdSpeed!=='c'}">
            100M
            <span class="icon-triangle-checked" v-bind:class="{ 'tipsActive' : brdSpeed==='c', 'tipsDefault': brdSpeed!=='c'}"></span>
          </button>
        </li>
      </ul>
      <ul class="clearfix">
        <span class="brdChooseMealTitle">宽带时限</span>
        <li class="bigBtn left">
          <button @click='brdTime = "a";handle()' class="btnBig" v-bind:class="{ 'btnActive' : brdTime==='a', 'btnDefault': brdTime!=='a'}">
            <span>包1年再送2个月</span>
            <span>(买10送2)</span>
            <span class="icon-orange icon-triangle-checked" v-bind:class="{ 'tipsActive' : brdTime==='a', 'tipsDefault': brdTime!=='a'}"></span>
          </button>
        </li>
        <li class="bigBtn left">
          <button @click='brdTime = "b";handle()' class="btnBig" v-bind:class="{ 'btnActive' : brdTime==='b', 'btnDefault': brdTime!=='b'}">
            <span>包2年再送4个月</span>
            <span>(买16送6)</span>
            <span class="icon-orange icon-triangle-checked" v-bind:class="{ 'tipsActive' : brdTime==='b', 'tipsDefault': brdTime!=='b'}"></span>
          </button>
        </li>
      </ul>
    </div>
    <div class="brdAmount bgcolor clearfix">
      <span>实付金额： <b class="orange">￥{{amount.toFixed(2)}}</b></span>
      <span>装机完成后，根据白条分期情况进行还款！</span>
    </div>
    <span class='brdBtmTxt'>—— 标准资费 ——</span>
    <div class="handleBtn bgcolor">
      <span @click='go'>立即办理</span>
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

.brdAdv {
  width: 100vw;
  height: 13.6rem;
  background: url(../img/banner_wb@2x.png) no-repeat;
  background-size: 100% 13.6rem;
}

.brdLocation {
  width: 100vw;
  padding: 0.1px;
  margin-bottom: 0.95rem;
}

.brdLocationForm {
  margin-left: 2rem;
  font-size: 27px;
}

.location {
  line-height: 4rem;
  background-color: #FFFFFF;
  margin-left: 1.6rem;
}

.brdChooseMeal {
  width: 100vw;
  padding-top: 0.1px;
  margin-bottom: 1rem;
}

.brdChooseMealTitle {
  display: block;
  margin-top: 1.95rem;
  margin-bottom: 0.55rem;
}

.brdChooseMeal ul {
  margin-left: 2rem;
}

.brdChooseMeal ul li {
  height: 6rem;
  display: block;
}

.brdChooseMeal ul:nth-child(1) li,
.brdChooseMeal ul:nth-child(2) li {
  width: 9.6rem;
  margin-right: 1.35rem;
}

.brdChooseMeal ul:nth-child(1) li button,
.brdChooseMeal ul:nth-child(2) li button {
  margin-bottom: 0.6rem;
}

.brdChooseMeal ul:nth-child(1) li span,
.brdChooseMeal ul:nth-child(2) li span {
  font-size: 24px;
  color: #FF8C56;
}

.brdAmount {
  margin: auto auto 1.3rem auto;
  height: 6.05rem;
  padding-top: 0.1px;
}

.brdAmount span:first-child {
  display: block;
  margin: 0.75rem auto auto 2rem;
  font-size: 28px;
}

.brdAmount span:last-child {
  display: block;
  margin: 0.65rem auto auto 2rem;
  color: #999999;
  font-size: 20px;
}

.brdBtmTxt {
  display: block;
  font-size: 28px;
  color: #999999;
  text-align: center;
  margin: 1.3rem auto 1.25rem auto;
}

.handleBtn {
  height: 6.25rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1.1rem;
}

.handleBtn span {
  display: block;
  line-height: 4.05rem;
  text-align: center;
  width: 100%;
  height: 4.05rem;
  background-color: #FF8D3B;
  color: #FFFFFF;
  border-radius: 0.5rem;
  border: none;
  font-size: 28px;
}

.btnBig span:nth-child(1) {
  display: block;
  line-height: 3rem;
}

.btnBig span:nth-child(2) {
  display: block;
  font-size: 20px;
  color: #999999;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
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

.bgcolor {
  background-color: #FFFFFF;
}

.btnTiny {
  position: relative;
  background-color: #FFFFFF;
  height: 3.8rem;
  width: 10rem;
}

.btnBig {
  position: relative;
  display: block;
  background-color: #FFFFFF;
  height: 6rem;
  width: 15.75rem;
  margin-right: 1.8rem;
}

.orange {
  color: #FF8C56;
  font-size: 32px;
  font-weight: 100;
}

.icon-orange {
  color: #FF8C56;
}

.brdChooseMeal .icon-triangle-checked {
  position: absolute;
  right: 0;
  bottom: 0;
}

.btnActive {
  border: 2px solid #FF8C56;
  border-radius: 8px;
}

.btnDefault {
  border: 2px solid #E5E5E5;
  border-radius: 8px;
}

.tipsActive {
  display: block;
}

.tipsDefault {
  display: none;
}

.bigBtn {
  display: block;
  margin-bottom: 1rem;
}
</style>
<script>
import {
  setScroll
} from '../../../assets/js/common'
import headerBar from '../../../components/header-bar.vue'
export default {
  activated() {
    if (this.$route.query.meal === 'a') {
      this.brdSpeed = 'a'
      this.brdTime = 'a'
      this.brdMeal = 'a'
      this.handle()
    }
    if (this.$route.query.meal === 'b') {
      this.brdSpeed = 'b'
      this.brdTime = 'a'
      this.brdMeal = 'b'
      this.handle()
    }
    if (this.$route.query.meal === 'c') {
      this.brdSpeed = 'b'
      this.brdTime = 'b'
      this.brdMeal = 'b'
      this.handle()
    }
  },
  data() {
    return {
      add: '宁波市鄞州区',
      amount: 0,
      brdSpeed: '',
      brdMeal: '',
      brdTime: ''
    }
  },
  methods: {
    changeBtn() {
      console.log('change')
    },
    go() {
      this.$router.push({
        path: '/broadband/newBroadband/brdAccessInfo',
        query: {
          amount: this.amount
        }
      })
    },
    handle() {
      var x = 0
      var y = 0
      var z = 0
      if (this.brdMeal === 'a') {
        x = 100
      }
      if (this.brdMeal === 'b') {
        x = 180
      }
      if (this.brdSpeed === 'a') {
        y = 20
      }
      if (this.brdSpeed === 'b') {
        y = 50
      }
      if (this.brdSpeed === 'c') {
        y = 100
      }
      if (this.brdTime === 'a') {
        z = 12
      }
      if (this.brdTime === 'b') {
        z = 24
      }
      this.amount = (x + y) * z
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
