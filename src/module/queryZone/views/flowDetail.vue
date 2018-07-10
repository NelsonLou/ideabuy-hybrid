<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="流量详单"
                  :back-to-app="true"></header-bar>
      <div class="tab-container">
        <div @click="showMonthPicker"><span
          class="icon icon-calendar"></span><span>按月查询</span>
        </div>
        <div @click="showDatePicker"><span
          class="icon icon-calendar"></span><span>按日查询</span>
        </div>
      </div>
      <div
        style="height:1rem;background:#eee;"></div>
    </div>
    <div class="contaienr">
      <div class="total">
        <div class="total-title">
          您{{month}}月上网流量详单
        </div>
        <div class="title">1、<span
          class="default-color">{{res.flow_month}} </span>概况
        </div>
        <div class="total-line">
          <div
            style="display: flex;align-items: center">
            <span class="icon icon-diamond" style="color:#ff8c56"></span><span>8月 上网流量总值约</span>
          </div>
          <div><span class="red-color"
                     style="font-size:36px;">{{res.survey.all_value}} </span>GB
          </div>
        </div>
        <div class="total-line">
          <div
            style="display: flex;align-items: center">
            <span class="icon icon-diamond" style="color:#ff8c56"></span><span>8月 上网流量总金额约</span>
          </div>
          <div><span class="red-color"
                     style="font-size:36px;">{{res.survey.all_money}} </span>元
          </div>
        </div>
      </div>
      <div style="margin-top:1rem;">
        <div
          style="background:#fff;padding-bottom:80px;">
          <div class="detail">
            <div class="title"
                 style="border-bottom:1px solid #ddd;">
              2、<span
              class="default-color">{{res.dateGroup.flow_date}}</span>
              详单明细
            </div>
            <div class="cell"
                 style="border-bottom:1px solid #ddd;"
                 v-for="item in res.dateGroup.list">
              <div class="cell-title">
                <span
                  class="icon icon-gift"></span><span>{{item.flow_title}}</span>
              </div>
              <div class="cell-text">
                <div>费用</div>
                <div><span class="red-color"
                           style="font-size:32px;">{{item.cost}} </span>元
                </div>
              </div>
              <div class="cell-text">
                <div>总流量</div>
                <div>{{item.all_flow}} KB</div>
              </div>
              <div class="cell-text">
                <div>总流量</div>
                <div>{{item.time}}</div>
              </div>
            </div>
          </div>
          <div class="paging">
            <div style="position:relative">
              <div class="my-select"
                   :class="{chose:chose}"
                   @click="chose=!chose">
                {{page}}/1
              </div>
              <div class="select-group"
                   v-show="chose">
                <div v-for="item in 1"
                     @click="chosePage(item)">
                  {{item}}
                </div>
              </div>
            </div>
            <div @click="showAlert">下一页</div>
          </div>
          <div
            style="padding:0 4rem;color:#999;font-size:24px;margin-top:110px;">
            本页面数据仅供参考使用，详细内容以当地营业厅查询内容为准
          </div>
          <div class="tip">
            <div class="tip-title">温馨提示：</div>
            <div class="tip-text">
              1.您在使用上网结束后，请及时退出上网功能，避免产生其他流量。
            </div>
            <div class="tip-text">
              2.4G用户切换到2G/3G网络后，语音资费均按用户所选4G资费标准计收。
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .default-color {
    color: #ff8c56;
  }

  .red-color {
    color: #f65a44;
  }

  .tab-container {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28px;
    > div {
      width: 50%;
      background: #fff;
      text-align: center;
      height: 80px;
      line-height: 80px;
      .icon {
        margin-right: 1rem;
        color: #ff8c56;
      }
    }
  }

  .contaienr {
    padding-top: 196px;
    width: 100vw;
    min-height: 100vh;
    font-size: 28px;
    .total {
      background: #fff;
      > div {
        padding: 0 2rem;
      }
      .total-title {
        padding-top: 2rem;
        padding-bottom: 1.4rem;
        text-align: center;
        font-size: 32px;
      }
      .total-line {
        display: flex;
        justify-content: space-between;
        padding: 0 3.3rem 0 3.8rem;
        line-height: 100px;
        border-top: 1px solid #ddd;
        height: 100px;
        .icon {
          font-size: 40px;
          margin-right: 1rem;
          line-height: 100px;
        }
      }
    }
    .detail {
      background: #fff;
      > div {
        padding: 0 2rem;
      }
      .cell {
        padding: 40px 4rem 14px 4rem;
        .cell-title {
          font-size: 32px;
          display: flex;
          align-items: center;
          margin-bottom: 36px;
          .icon {
            font-size: 40px;
            margin-right: 14px;
          }
        }
        .cell-text {
          display: flex;
          justify-content: space-between;
          padding: 0 0 24px 54px;
          color: #999
        }
      }
    }
    .paging {
      margin-top: 56px;
      display: flex;
      justify-content: center;
      align-items: center;
      .my-select {
        width: 120px;
        height: 40px;
        line-height: 40px;
        border: 2px solid #ddd;
        border-radius: 10px;
        text-align: center;
        margin-right: 2.7rem;
        position: relative;
        background: #fff;
        z-index: 2;
        &.chose {
          border-radius: 10px 10px 0 0;
        }
      }
      .select-group {
        text-align: center;
        position: absolute;
        top: 33px;
        left: 0;
        width: 120px;
        max-height: 300px;
        border: 2px solid #ddd;
        border-top: 0;
        overflow-y: auto;
        padding: 10px 0;
        background: #fff;
        -webkit-overflow-scrolling: touch;
        > div {
          line-height: 50px;
        }
      }
    }
    .tip {
      margin-top: 80px;
      padding: 0 4rem;
      color: #999;
      .tip-title {
        font-size: 28px;
        margin-bottom: 10px;
      }
      .tip-text {
        font-size: 24px;
        line-height: 30px;
      }
    }
    .title {
      line-height: 100px;
    }
  }
</style>
<script>
  import {
    setScroll,
    setupWebViewJavascriptBridge
  } from '../../../assets/js/common'
  import headerBar from '../../../components/header-bar.vue'
  export default {
    beforeRouteLeave(to, from, next) {
      setScroll()
      next()
    },
    data () {
      return {
        chose: false,
        page: 1,
        month: 8,
        res: {
          survey: {},
          dateGroup: {}
        }
      }
    },
    methods: {
      showAlert () {
        this.$vux.alert.show({
          title: '提示',
          content: '已经是最后一页了'
        })
      },
      chosePage (page) {
        this.chose = false
        this.page = page
      },
      showMonthPicker () {
        let me = this
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM',
          maxYear: 2017,
          onConfirm (val) {
            me.axios.post('/flowDetail', {
              id: '1',
              month: parseFloat(val.slice(val.length - 2))
            }).then(res => {
              me.res = res.data
              console.log(res)
            })
          }
        })
      },
      showDatePicker () {
        let me = this
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          maxYear: 2017,
          onConfirm (val) {
            me.axios.post('/flowDetail', {
              id: '2',
              month: val.split('-')[1],
              date: parseFloat(val.slice(val.length - 2))
            }).then(res => {
              me.res = res.data
              console.log(res)
            })
          }
        })
      }
    },
    mounted () {
      setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {
        })
      })
      this.axios.post('/flowDetail', {
        id: '1',
        month: 8
      }).then(res => {
        this.res = res.data
      })
    },
    components: {
      headerBar
    }
  }
</script>
