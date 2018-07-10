<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="历史账单"
                  :back-to-app="true"></header-bar>
    </div>
    <div class="container">
      <div class="month-group">
        <div class="month"
             v-for="(month,index) in monthArr"
             @click="chose(index)"
             :class="{actived:i==index}">
          {{month}}月
        </div>
      </div>
      <div class="main">
        <div class="line1">
          <div style="color:#999">消费总计 （元）</div>
          <div class="money">
            {{res.history_top.total_consumption}}
          </div>
        </div>
        <div class="line2">
          <div>
            <div class="line">
              <div class="block"
                   style="background:#6894D6"></div>
              <span
                style="margin-right:24px;color:#999">月固定费</span>
              <span
                style="color:#212121">{{res.history_top.fixed_consumption}}</span>
            </div>
            <div class="line">
              <div class="block"
                   style="background:#ff7744"></div>
              <span
                style="margin-right:24px;color:#999">增值业务费</span>
              <span
                style="color:#212121">{{res.history_top.added_consumption}}</span>
            </div>
            <div class="line">
              <div class="block"
                   style="background:#F9C730"></div>
              <span
                style="margin-right:24px;color:#999">上网费</span>
              <span
                style="color:#212121">{{res.history_top.inline_consumption}}</span>
            </div>
          </div>
          <div style="width:200px;height:200px;"
               id="pie"></div>
        </div>
      </div>
      <div class="detail">
        <div class="title">账单详情</div>
        <div class="body">
          <div class="border-bottom">
            <div>月固定费</div>
            <div>合计：<span style="color:#ff8c56">{{res.history_down.fixed_consumption}}元</span>
            </div>
          </div>
          <div>
            <div>基本套餐费</div>
            <div>
              {{res.history_down.aggregated_invitation}}
            </div>
          </div>
          <div>
            <div>叠加套餐包</div>
            <div>
              {{res.history_down.deposit_discount}}
            </div>
          </div>
          <div class="border-bottom">
            <div>增值业务费</div>
            <div>合计：<span style="color:#ff8c56">{{res.history_down.added_consumption}}元</span>
            </div>
          </div>
          <div>
            <div>增值业务-绿色邮箱</div>
            <div>
              {{res.history_down.added_email}}
            </div>
          </div>
          <div class="border-bottom">
            <div>上网费</div>
            <div>合计：<span style="color:#ff8c56">{{res.history_down.inline_consumption}}元</span>
            </div>
          </div>
          <div>
            <div>手机上网流量费</div>
            <div>
              {{res.history_down.mobile_consumption}}
            </div>
          </div>
          <div class="border-bottom">
            <div>消费合计</div>
            <div>合计：<span style="color:#ff8c56">{{res.history_down.total_consumption}}元</span>
            </div>
          </div>
          <div>
            <div>可用预存款及可用赠款折扣</div>
            <div>
              {{res.history_down.overlay_package}}
            </div>
          </div>
          <div>
            <div>实际应缴合计</div>
            <div>
              {{res.history_down.package_consumption}}
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        以上信息是用户1848593294本月截止2017年09月09日的实时账单
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .border-bottom {
    border-bottom: 1px solid #ddd;
  }

  .container {
    padding-top: 96px;
    width: 100vw;
    min-height: 100vh;
    font-size: 28px;
    .month-group {
      height: 90px;
      background: #fff;
      padding: 20px 1rem 20px 2rem;
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      .month {
        display: inline-block;
        color: #333;
        width: 90px;
        line-height: 50px;
        border-radius: 10px;
        text-align: center;
        margin-right: 2rem;
        &.actived {
          color: #fff;
          background: #ff8c56;
        }
      }
    }
    .main {
      background: #fff;
      margin-top: 1rem;
      padding-top: 34px;
      .line1 {
        border-bottom: 1px solid #ddd;
        padding-left: 2rem;
        .money {
          font-size: 60px;
          margin-top: 26px;
          padding-bottom: 38px;
        }
      }
      .line2 {
        padding: 50px 4rem 50px 2rem;
        display: flex;
        justify-content: space-between;
        .line {
          position: relative;
          padding-left: 36px;
          font-size: 24px;
          line-height: 60px;
          .block {
            width: 14px;
            height: 14px;
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -7px;
          }
        }
      }
    }
    .detail {
      .title {
        background: #eee;
        color: #999;
        padding-left: 2rem;
        line-height: 80px;
      }
      .body {
        background: #fff;
        > div {
          display: flex;
          padding: 28px 2rem;
          justify-content: space-between;
        }
      }
    }
    .footer {
      padding: 60px 60px;
      text-align: center;
      color: #999;
    }
  }
</style>
<script>
  import echarts from 'echarts'
  import headerBar from '../../../components/header-bar.vue'
  import {
    setScroll,
    setupWebViewJavascriptBridge
  } from '../../../assets/js/common'
  export default{
    data () {
      return {
        monthArr: [],
        i: 0,
        res: {
          history_top: {},
          history_down: {}
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      setScroll()
      next()
    },
    methods: {
      chose (index) {
        this.i = index
        this.getData(this.monthArr[this.i])
      },
      initPie () {
        let myChart = echarts.init(document.getElementById('pie'))
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} </br>{b} : {c} ({d}%)'
          },
          color: ['#6894D6', '#ff7744', ' #F9C730'],
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['100%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {
                  value: this.res.history_top.fixed_consumption,
                  name: '月固定费'
                },
                {
                  value: this.res.history_top.added_consumption,
                  name: '增值业务费'
                },
                {
                  value: this.res.history_top.inline_consumption,
                  name: '上网费'
                }
              ]
            }
          ]
        }
        myChart.setOption(option)
      },
      getData (month) {
        this.axios.post('/historyBill', {month: month}).then(res => {
          console.log(res)
          this.res = res.data
          this.initPie()
        })
      }
    },
    mounted () {
      setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {
        })
      })
      let date = new Date()
      let month = date.getMonth()
      for (let i = month; i > 0; i--) {
        this.monthArr.push(i)
      }
      this.getData(this.monthArr[0])
    },
    components: {headerBar}
  }
</script>
