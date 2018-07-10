<template>
<div class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="测试1" :back-to-web="true"></header-bar>
  </div>
  <div class="contaienr">
    <h1 v-for="item in mydata.num">{{mydata.text}}</h1>
  </div>
  <div class="footer my-fixed">

  </div>
</div>
</template>
<style scoped>
.contaienr {
  padding-top: 96px;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  background: green;
  height: 100px;
  width: 100%;
}
</style>
<script>
import {
  setScroll
  // requestURLparas
} from '../../../assets/js/common'
import headerBar from '../../../components/header-bar.vue'
export default {
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  data() {
    return {
      mydata: {
        text: '测试1',
        num: 20
      }
    }
  },
  // activated() {
  //   let id = requestURLparas('id')
  //   if (id === '1') {
  //     this.$set(this.$data, 'mydata', {
  //       text: '测试1',
  //       num: 10
  //     })
  //   } else if (id === '2') {
  //     this.$set(this.$data, 'mydata', {
  //       text: '测试2',
  //       num: 15
  //     })
  //   } else {
  //     this.$set(this.$data, 'mydata', {
  //       text: '测试3',
  //       num: 20
  //     })
  //   }
  // },
  components: {
    headerBar
  }
}
</script>
