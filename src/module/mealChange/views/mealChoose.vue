<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="选择套餐" :back-to-web="true"></header-bar>
    </div>
    <div class="container">
      <div class="meal-type">
        <ul>
          <li v-for="(item,index) in mealList" :key="index" @click="change(index)" :class="{active:index==active}">
            {{ item.packge_choose+'元' }}
            <span class="icon-triangle-checked"></span>
          </li>
        </ul>
        <hr>
        <div class="meal-current" v-for="(item,index) in mealList" :key="index" v-if="index==active">
          <p class="title">选择套餐：{{ mealList[active].packge_choose+'元' }}</p>
          <p>{{ mealList[active].packge_contain }}</p>
        </div>
      </div>
      <div class="other-business">
        <p class="title">套餐超出及其他业务收费：</p>
        <p v-for="(item,index) in mealList[active]['packge_other']" :key="index">{{ item }}</p>
      </div>
      <div class="submit">
        <div>
          <footer-btn title="确认" @submit="go"></footer-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  setScroll
} from '../../../assets/js/common'
import eventhub from '@/assets/js/eventhub'
import headerBar from '../../../components/header-bar.vue'
import footerBtn from '../../../components/submit-btn.vue'
export default {
  data: () => ({
    active: 0,
    mealList: [
      {
        package_other: ''
      }
    ]
  }),
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  mounted() {
    this.handleAdManage()
  },
  computed: {
    id() {
      return this.$route.query.mid
    }
  },
  methods: {
    handleAdManage() {
      let para = {
        id: this.$route.query.mid
      }
      this.axios.post('requestNico', para).then(res => {
        this.mealList = res.data.package_detail
      }).catch(error => {
        console.log(error)
      })
    },
    change(i) {
      this.active = i
    },
    go() {
      this.$store.state.meal = this.mealList[this.active].packge_choose
      this.$router.go(-1)
      eventhub.$emit('backword')
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

<style lang='scss' scoped>
.active {
  position: relative;
  border-color: #FF8C56 !important;
  span {
    display: inline-block !important;
    position: absolute;
    right: 0;
    bottom: -1px;
  }
}

.container {
  padding-top: 96px;
  width: 100vw;
  min-height: 100vh;
}

.container .meal-type {
  background: #FFFFFF;
}

.container .meal-type ul {
  margin: 0;
  padding: 0;
  margin-left: 16px;
  padding-top: 12px;
  padding-right: 0rem;
}

.container .meal-type ul li {
  color: #212121;
  font-size: 28px;
  list-style: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28%;
  height: 94px;
  line-height: 94px;
  border: 2px solid #CCC;
  border-radius: 6px;
  margin-top: 40px;
  margin-left: 24px;
  span {
    display: none;
  }
}

.container .meal-type .meal-current {
  color: #212121;
  font-size: 28px;
  padding-left: 2rem;
  padding-bottom: 40px;
}

.container .meal-type .meal-current .title {
  font-weight: bold;
}

hr {
  color: #E5E5E5;
  margin-top: 40px;
  margin-bottom: 40px;
  width: 89%
}

.container .other-business {
  background: #FFFFFF;
  padding-top: 26px;
  padding-bottom: 28px;
  margin-top: 18px;
}

.container .other-business .title {
  font-size: 24px;
  padding-left: 2rem;
  color: #999999;
}

.container .other-business p {
  padding-left: 4rem;
  font-size: 28px;
  color: #212121;
}

.container .submit {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #FFF;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  box-sizing: border-box;
}

.container .submit div {
  max-height: 90px;
  border: 1px solid transparent;
}

.icon-triangle-checked {
  color: #FF8C56;
  font-size: 35px;
}
</style>
