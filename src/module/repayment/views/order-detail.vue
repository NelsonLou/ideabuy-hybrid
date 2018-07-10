<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="订单详情"
                  :back-to-web="true"></header-bar>
    </div>

    <div class="container">
      <div class="banner">
        <div class="title">
          {{order.goods_name}}
        </div>
        <div class="money">
          ￥{{order.order_amount}}
        </div>
        <div class="status">交易成功</div>
      </div>
      <div class="group">
        <div class="line">
          <div>创建时间</div>
          <div>{{order.created_date}}</div>
        </div>
        <div class="line">
          <div>订单号</div>
          <div>{{order.order_sn}}</div>
        </div>
        <div class="line">
          <div>购买方式</div>
          <div>{{order.order_from}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .container {
    padding-top: 96px;
    width: 100vw;
    min-height: 100vh;
    color: #212121;
    .banner {
      background: #fff;
      padding: 40px 2rem 30px 2rem;
      .title {
        font-size: 28px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .money {
        margin-top: 34px;
        font-size: 48px;
      }
      .status {
        font-size: 24px;
        color: #999;
        margin-top: 50px;
      }
    }
    .group {
      margin-top: 1rem;
      background: #fff;
      .line {
        padding: 0 2rem;
        font-size: 24px;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        line-height: 88px;
        &:last-child {
          border: none;
        }
      }
    }
  }
</style>
<script>
  import headerBar from '../../../components/header-bar.vue'
  import {setScroll} from '../../../assets/js/common'
  export default{
    beforeRouteLeave(to, from, next) {
      setScroll()
      next()
    },
    computed: {
      order () {
        this.$refs.myScroll && this.$refs.myScroll.refresh()
        return this.$store.state.bill.orderDetail
      }
    },
    components: {
      headerBar
    }
  }
</script>
