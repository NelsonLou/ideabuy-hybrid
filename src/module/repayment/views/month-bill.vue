<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="我的账单"
                  :back-to-web="true"></header-bar>
    </div>
    <div class="container">
      <repayment-body index="0"
                      :res="res"></repayment-body>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .container {
    padding-top: 96px;
    width: 100vw;
    min-height: 100vh;
  }
</style>
<script type="es6">
  import repaymentBody from '../components/repayment-body.vue'
  import headerBar from '../../../components/header-bar.vue'
  import {
  	setScroll,
    requestURLparas
  } from '../../../assets/js/common'
  export default{
    beforeRouteLeave(to, from, next) {
      setScroll()
      next()
    },
    computed: {
      res () {
        return this.$store.state.bill.monthBill
      }
    },
    components: {
      repaymentBody,
      headerBar
    }
  }
</script>
