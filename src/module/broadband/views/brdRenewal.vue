<template>
<div class="my-div" name="myDiv">
  <div v-if="isDialog" class="Dialog">
    <div class="dialogMain bgColor">
      <span class="dialogTitle">提示信息(测试！！！！)</span>
      <span class="dialogTips">尊敬的宽带用户，可能的原因如下：</span>
      <ul>
        <li>1.您输入的宽带信息，有误；</li>
        <li>2.您现在的宽带套餐为智慧沃家套餐；</li>
        <li>3.您的宽带为企业宽带；</li>
        <li>4.宽带商城暂无获取到您的宽带信息；</li>
        <li>5.您的宽带机主是公司名称。</li>
      </ul>
      <div class="dialogbBtn">
        <span @click='handleDialog'>我知道了</span>
      </div>
    </div>
  </div>
  <div class="header-bar">
    <header-bar title="宽带续约" :back-to-web="true"></header-bar>
  </div>
  <div class="container">
    <div class="renewalTitle">
      <span>请输入您要续费的宽带信息进行身份验证</span>
    </div>
    <div class="renewalMain bgColor">
      <ul>
        <li @click='way="a";handle()' v-bind:class="{ 'active' : way==='a', 'default': way!=='a'}">固话电话</li>
        <li @click='way="b";handle()' v-bind:class="{ 'active' : way==='b', 'default': way!=='b'}">宽带账号</li>
        <li @click='way="c";handle()' v-bind:class="{ 'active' : way==='c', 'default': way!=='c'}">用户电话</li>
      </ul>
      <div class="renewalInput clearfix">
        <li class="right ">
          <label class="left" for="">010-</label>
          <input v-model='tel' :placeholder="wayTel" type="text" name="" value="">
        </li>
        <li class="right clearfix">
          <label class="left" for="">机主姓名</label>
          <input v-model='name' placeholder="请输入机主姓名" type="text" name="" value="">
        </li>
        <li class="right clearfix">
          <label class="left" for="">验证码</label>
          <input v-model='checknumber' placeholder="请输入您的验证码" type="text" name="" value="">
          <span class="right getCheckNum" v-bind:class="{ 'display' : tel!==''&& name!==''}">获 取</span>
          <span @click='check()' class="right getCheckNum getCheckNumA" v-bind:class="{ 'display' : tel===''|| name===''}">获 取</span>
        </li>
      </div>
      <div class="renewalBtn">
        <button @click='go()' type="button" name="button">身份验证</button>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>
.Dialog {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  font-size: 28px;
}

.dialogMain {
  padding-top: 2.3rem;
  padding-bottom: 2rem;
  width: 28rem;
  margin: 0 auto;
  border-radius: 10px;
  margin-top: 8.85rem;
  border: 1px solid white;
}

.dialogTitle {
  display: block;
  text-align: center;
  font-size: 32px;
}

.dialogTips {
  display: block;
  margin-left: 2rem;
  margin-top: 2.1rem;
  font-size: 28px;
}

.dialogMain ul {
  margin-top: 1.5rem;
  font-size: 24px;
  margin-left: 2rem;
  color: #999999;
}

.dialogMain ul li {
  margin-top: 1rem;
}

.dialogbBtn {
  margin-top: 2.15rem;
  border-top: 1px solid #E5E5E5;
  text-align: center;
  color: #FF8C56;
}

.dialogbBtn span {
  display: block;
  margin-top: 1.65rem;
}

.container {
  padding-top: 96px;
  width: 100vw;
  min-height: 100vh;
  font-size: 28px;
  background-color: #FFFFFF;
}

.renewalTitle {
  width: 100vw;
  height: 4rem;
  background-color: #EEEEEE;
}

.renewalTitle span {
  display: block;
  text-align: center;
  line-height: 4rem;
  color: #999999;
}

.renewalMain {
  width: 100vw;
}

.renewalMain ul {
  margin-top: 1.3rem;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
}

.renewalMain ul li {
  flex: 1;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
  font-family: SourceHanSansCN-Regular;
}

.renewalInput {
  width: 100vw;
  padding-left: 2rem;
  padding-right: 2rem;
}

.renewalInput li {
  width: 100%;
  height: 85px;
  line-height: 85px;
  border-bottom: 1px solid #E5E5E5;
}

.renewalInput label {
  display: block;
  width: 115px;
  font-family: PingFang-SC-Medium;
}

.renewalInput li input {
  font-size: 28px;
  text-indent: 3rem;
}

.getCheckNum {
  display: block;
  text-align: center;
  line-height: 85px;
  margin-right: 2rem;
  color: #999999;
}

.getCheckNumA {
  display: block;
  text-align: center;
  line-height: 3.3rem;
  margin: 0.5rem 2rem auto auto;
  color: #212121;
}

.renewalBtn {
  width: 100vw;
  display: flex;
  margin-top: 2.1rem;
}

.renewalBtn button {
  width: 33.5rem;
  height: 4.4rem;
  background-color: #FF8D3B;
  border: none;
  border-radius: 0.5rem;
  margin: 0 auto;
  color: white;
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

.active {
  border-bottom: 8px solid #FF8C56;
  color: #FF8C56;
}

.default {
  color: #999999;
  border-bottom: 8px solid transform;
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
    this.meal = this.$route.query.meal
    this.checknumber = ''
    this.tel = ''
    this.name = ''
  },
  data() {
    return {
      meal: '',
      isDialog: false,
      way: 'a',
      wayTel: '请输入固话号',
      checknumber: '',
      tel: '',
      name: '',
      get: false
    }
  },
  mounted() {
    this.way = 'a'
  },
  methods: {
    go() {
      if (this.tel === '' || this.name === '' || this.checknumber === '') {
        if (!this.isDialog) {
          this.isDialog = true
        } else {
          this.isDialog = false
        }
      } else {
        this.$router.push({
          path: '/broadband/newBroadband',
          query: {
            meal: this.meal
          }
        })
      }
    },
    check() {
      this.checknumber = Math.floor(Math.random() * 9000) + 1000
    },
    handle() {
      if (this.way === 'a') {
        this.wayTel = '请输入固话号'
      }
      if (this.way === 'b') {
        this.wayTel = '请输入宽带账号'
      }
      if (this.way === 'c') {
        this.wayTel = '请输入用户电话'
      }
    },
    handleDialog() {
      if (!this.isDialog) {
        this.isDialog = true
      } else {
        this.isDialog = false
      }
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
