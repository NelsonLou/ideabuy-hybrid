<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="全部订单"
                  :back-to-app="true"></header-bar>

    </div>
    <div class="container">
      <div
        style="position:relative;top:0;left:0;width: 100%;height:100%;">
        <scroller
          ref="my_scroller"
          :on-infinite="infinite"
          :on-refresh="refresh"
          :no-more-data="true"
        >
          <div
            style="height:1rem;background:#eee;"></div>
          <div class="order"
               :class="{first:index==0}"
               v-for="(item,index) in orderList">
            <div class="title">
              <div>
                订单编号：{{item.order_sn}}
              </div>
              <div>{{item.status_name}}</div>
            </div>
            <div class="body">
              <div class="photo"
                   :style="item.goods_info.length!=0?'background-image:url('+item.goods_info[0].goods_thumb+')':''"></div>
              <div class="text-group">
                <div>
                  名称：{{item.goods_info.length!=0?item.goods_info[0].goods_name:''}}
                </div>
                <div>
                  {{item.goods_info.length!=0?item.goods_info[0].str_attr:''}}
                </div>
                <div>
                  数量：X{{item.goods_info.length!=0?item.goods_info[0].goods_number:''}}
                </div>
              </div>
            </div>
            <div class="footer">
              已付：￥{{item.order_amount}}
            </div>
          </div>
          <div v-if="orderList.length==0&&noMore">
            <img
              src="../../../assets/img/no-order.png">
            <div class="no-order-text">
              您还没有相关订单
            </div>
          </div>
          <!--<load-more :tip="noMore?'没有更多数据了':''"-->
          <!--:show-loading="!noMore"-->
          <!--background-color="#eee"-->
          <!--v-if="orderList.length!=0"-->
          <!--&gt;</load-more>-->
        </scroller>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .container {
    padding-top: 96px;
    width: 100vw;
    height: 100vh;
    text-align: center;
    position: relative;
    .order {
      background: #fff;
      margin-top: 1rem;
      &.first {
        margin-top: 0;
      }
      .title {
        display: flex;
        justify-content: space-between;
        font-size: 28px;
        color: #212121;
        padding: 1.2rem 2rem;
        border-bottom: 1px solid #ddd;
      }
      .body {
        padding: 1rem;
        border-bottom: 1px solid #ddd;
        text-align: left;
        .photo {
          float: left;
          width: 180px;
          height: 180px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          background-color: #ddd;
        }
        .text-group {
          height: 180px;
          padding-left: 198px;
          > div {
            font-size: 28px;
            color: #212121;
            line-height: 60px;
          }
        }
      }
      .footer {
        text-align: right;
        padding: 1.2rem 2rem 1.2rem 2rem;
        font-size: 28px;
        color: #ff8c56;
      }
    }
    img {
      margin-top: 14.1rem;
    }
    .no-order-text {
      margin-top: 2.4rem;
      font-size: 32px;
      color: #cacaca;
    }
  }
</style>
<script type="es6">
  import headerBar from '../../../components/header-bar.vue'
  import {LoadMore} from 'vux'
  import {
    setScroll,
    setupWebViewJavascriptBridge,
    getToken
  } from '../../../assets/js/common'
  export default{
    beforeRouteLeave (to, from, next) {
      setScroll()
      next()
    },
    data () {
      return {
        orderList: [],
        busy: false,
        noMore: false,
        page: 1,
        limit: 3
      }
    },
    mounted () {
      setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {
        })
      })
//      this.getData()
    },
    methods: {
      getData () {
        getToken().then(() => {
          this.axios.get(`/order-list?myloading=false`, {
            params: {
              limit: this.limit,
              page: this.page
            }
          }).then(res => {
            if (res) {
              this.orderList = this.orderList.concat(res.data.order_list)
              this.page++
            }
          })
        })
      },
      infinite (done) {
        getToken().then(()=>{
          this.axios.get(`/order-list?myloading=false`, {
            params: {
              limit: this.limit,
              page: this.page
            }
          }).then(res => {
            if (res) {
              this.orderList = this.orderList.concat(res.data.order_list)
              this.page++
              if (res.data.order_list.length < this.limit) {
                this.$refs.my_scroller.finishInfinite(true)
              } else {
                done()
              }
            }
          })
        })
      },
      refresh (done) {
        this.page = 1
        this.axios.get(`/order-list?myloading=false`, {
          params: {
            limit: this.limit,
            page: this.page
          }
        }).then(res => {
          if (res) {
            this.orderList = res.data.order_list
            this.page++
            done()
          }
        })
      }
    },
    components: {
      headerBar,
      LoadMore
    }
  }
</script>
