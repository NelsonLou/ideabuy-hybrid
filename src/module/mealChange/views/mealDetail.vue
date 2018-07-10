<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="优惠套餐" :back-to-web="true"></header-bar>
    </div>
    <div class="container">
      <div class="banner" :style="'background-image:url(' + banner + ')'">
      </div>
      <div class="activity">
        <div class="ac-top">
          <p>最多获赠:</p>
          <p class="ac-title">{{ dataListTop.package_info }}</p>
        </div>
        <div class="ac-bottom">
          <p>{{ package_name }}</p>
          <p class="money">
            <span>￥</span>{{ price }}
          </p>
        </div>
      </div>
      <div class="meal-change">
        <ul>
          <li @click="toMealChoose">
            <span class="meal-fl">选择套餐：</span>
            <span class="mealfrDefualt">{{ meal != ''? meal +'元套餐': '' }}</span>
          </li>
          <li @click="toTel">
            <span class="meal-fl">手机号码：</span>
            <span class="mealfrDefualt">{{ tel }}</span>
          </li>
          <li @click="open = !open" class="activity">
            <span class="meal-fl">优惠活动：</span>
            <span :class="{ mealfrDefualt:open == false, mealfrActive:open == true}">{{ dataListTop.package_preferential? dataListTop.package_preferential[activity_index] : '' }}</span>
          </li>
          <div class="open" v-if="open">
            <span :class="{active:index == activity_index}" v-for="(item,index) in dataListTop.package_preferential" :key="index" @click="change_activity(index)">{{ item }}</span>
            <p>{{ dataListTop.package_ruler }}</p>
          </div>
        </ul>
      </div>
      <div class="navbar">
        <ul>
          <li v-for="(item,index) in nav" :key="index" @click="toggle(index)" :class="{active:index==active}">{{ item.title }}</li>
        </ul>
      </div>
      <div class="evaluate" v-show="active == 1">
        <div class="ev-top">
          <span></span>
          <span class="ev-title">评论</span>
        </div>
        <div class="tags">
          <span :class="[{'active':tagsActive === 'all'}, 'all']" @click="tagsActive='all'">全部</span>
          <span :class="[{'active':tagsActive === 'good_1'}, 'good']" @click="tagsActive='good_1'">好评(356)</span>
          <span :class="[{'active':tagsActive === 'good_2'}, 'good']" @click="tagsActive='good_2'">中评(124)</span>
          <span :class="[{'active':tagsActive === 'good_3'}, 'good']" @click="tagsActive='good_3'">追评(320)</span>
          <span :class="[{'active':tagsActive === 'bad'}, 'bad']" @click="tagsActive='bad'">差评(120)</span>
        </div>
        <div class="ev-statistics">
          <div class="ev-fl">
            <p>好评率</p>
            <p class="percentage">{{ good_ev }}</p>
          </div>
          <div class="ev-fr">
            <ul>
              <li>
                <span class="icon-face-smile"></span>
                <div class="ev-bg">
                  <div class="good-ev" :style="'width:'+good_ev"></div>
                </div>
              </li>
              <li>
                <span class="icon-face-normal"></span>
                <div class="ev-bg">
                  <div class="commonly-ev" :style="'width:'+commonly_ev"></div>
                </div>
              </li>
              <li>
                <span class="icon-face-bad"></span>
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
      <div class="pic" v-show="active == 0">
        <img src="../../../assets/img/test.jpg" alt="">
      </div>
      <div class="submit">
        <footer-btn title="立即支付" @submit="submit"></footer-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {
  setScroll
} from '../../../assets/js/common'
import {
  mapState
} from 'vuex'
import banner from '../../../assets/img/banner.png'
import headerBar from '../../../components/header-bar.vue'
import footerBtn from '../../../components/submit-btn.vue'
export default {
  data: () => ({
    banner,
    dataListTop: [],
    commentList: [],
    good_ev: 0,
    commonly_ev: 60,
    bad_ev: 15,
    active: 1,
    open: false,
    activity_index: 0,
    alertMsg: '',
    tagsActive: 'all',
    nav: [
      {
        title: '图文详情'
      },
      {
        title: '商品评价'
      }
    ]
  }),
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  mounted() {
    this.handleAdManage()
    this.handleDown()
  },
  computed: {
    ...mapState({
      meal: state => state.meal,
      tel: state => state.tel,
      price: state => state.price,
      package_name: state => state.package_name
    }),
    id() {
      return this.$route.query.id
    }
  },
  methods: {
    handleAdManage() {
      let para = {
        id: this.$route.query.id
      }
      this.axios.post('requestDetail', para).then(res => {
        this.dataListTop = res.data.package_top
      }).catch(error => {
        console.log(error)
      })
    },
    handleDown() {
      let para = {
        id: this.$route.query.id
      }
      this.axios.post('requestDown', para).then(res => {
        this.good_ev = res.data.package_down.evaluate_value[0]
        this.commonly_ev = res.data.package_down.evaluate_value[1]
        this.bad_ev = res.data.package_down.evaluate_value[2]
        this.commentList = res.data.package_down.user_evaluate
      }).catch(error => {
        console.log(error)
      })
    },
    toggle(i) {
      this.active = i
    },
    toMealChoose() {
      this.$router.push('/mealChoose?mid=' + this.$route.query.id)
    },
    toTel() {
      this.$router.push('/tel')
    },
    change_activity(i) {
      this.activity_index = i
    },
    submit() {
      if (this.$store.state.meal === '' && this.$store.state.tel !== '') {
        this.alertMsg = '请选择套餐'
      }
      if (this.$store.state.tel === '' && this.$store.state.meal !== '') {
        this.alertMsg = '请填写手机号码'
      }
      if (this.$store.state.tel === '' && this.$store.state.meal === '') {
        this.alertMsg = '请选择套餐，填写手机号码'
      }
      if (this.$store.state.meal !== '' && this.$store.state.tel !== '') {
        this.$router.push('/payment')
      } else {
        var _this = this
        this.$vux.alert.show({
          title: '提示',
          content: _this.alertMsg
        })
      }
    }
  },
  components: {
    headerBar,
    footerBtn
  },
  watch: {
    id(val) {
      this.handleAdManage()
    }
  }
}
</script>

<style lang="css">
@import 'mealDetail.css';
</style>