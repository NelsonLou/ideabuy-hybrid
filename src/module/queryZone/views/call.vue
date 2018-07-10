<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="通话详单"
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
      <div class="switch" @click="changeSwitch">
        <span class="icon icon-bill"></span><span>{{index==0?'切换成月详单分析':'切换详单明细'}}</span>
      </div>
    </div>
    <div class="contaienr">
      <div
        style="background:#fff;padding:0 2rem;"
        v-show="index==1">
        <div
          style="line-height:80px;color:#FF8C56;border-bottom:1px solid #ddd;">
          您8月的话单分析如下
        </div>
        <div class="title">
          1.概述
        </div>
        <div class="summary">
          <img src="../img/img_call_time@2x.png"
               width="90" height="86">
          <div class="summary-text">
            <div>
              <div>
                总通话<span
                style="margin-left:0.5rem;color:#FF8C56">150次</span>
              </div>
              <div style="color:#999;">日均约：
                6.91次
              </div>
            </div>
            <div style="margin-top:20px;">
              <div style="width:300px;">
                <div style="display: inline-block;margin-right:0.5rem;">
                  累计约
                </div>
                <div style="color:#FF8C56;display: inline-block">3小时52分23秒</div>
              </div>
              <div style="color:#999;width:227px;">
                <div style="display: inline-block">日均约：</div>
                <div style="display: inline-block">9分20秒</div>

              </div>
            </div>
          </div>
        </div>
        <div class="title">2.每日通话</div>
        <div id="call-chart-day"
             class="call-chart"
             style="width:94vw;height:400px;"></div>
        <div>您当月通话次数超过了75%的用户，生活有些繁忙哦！</div>
        <table class="table">
          <tr>
            <th>日期</th>
            <th>通话次数</th>
            <th>通话时长(约)</th>
          </tr>
          <tr>
            <td>1日</td>
            <td>8次</td>
            <td>8分5秒</td>
          </tr>
          <tr>
            <td>1日</td>
            <td>8次</td>
            <td>8分5秒</td>
          </tr>
          <tr>
            <td>1日</td>
            <td>8次</td>
            <td>8分5秒</td>
          </tr>
        </table>
        <div class="more">查看详情</div>
        <div class="title">3.主叫被叫次数</div>
        <div class="record">
          <div class="item">
            <span
              class="icon icon-circle-phone-out"
              style="color:#6fc64c"></span>主动约占30%
            <div class="icon-box">
              <span class="icon icon-phone-out"
                    style="color:#6fc64c"></span><span
              class="icon icon-phone-out"
              style="color:#6fc64c"></span><span
              class="icon icon-phone-out"
              style="color:#ddd;"></span><span
              class="icon icon-phone-out"
              style="color:#ddd;"></span><span
              class="icon icon-phone-out"
              style="color:#ddd;"></span>
            </div>
          </div>
          <div class="item">
            <span
              class="icon icon-circle-phone-in"
              style="color:#de0000"></span>被动约占70%
            <div class="icon-box">
              <span class="icon icon-phone-in"
                    style="color:#de0000"></span><span
              class="icon icon-phone-in"
              style="color:#de0000"></span><span
              class="icon icon-phone-in"
              style="color:#de0000"></span><span
              class="icon icon-phone-in"
              style="color:#de0000"></span><span
              class="icon icon-phone-in"
              style="color:#ddd;"></span>
            </div>
          </div>
        </div>
        <div class="title">4.通话时间</div>
        <div>你经常通话的时间分布</div>
        <div id="call-chart-time"
             class="call-chart"
             style="width:94vw;height:400px;"
        >
          柱状图
        </div>
        <div>电话有点少，要常和朋友们联系啊～</div>
        <div class="title">5.常用联系人</div>
        <div>您常联系的小伙伴Top10</div>
        <div id="call-chart-people"
             class="call-chart"
             style="width:94vw;height:800px;"
        >
        </div>

        <div class="notes">
          <p>
            注：本分析仅供参考，详细信息请查看通话详单。本分析统计的是实际通话时长，不是计费时长，计费时长请以本地营业厅为准。</p>
        </div>
      </div>
      <div style="background:#fff;padding:0 2rem" v-show="index==0">
        <div class="conver-detail">
          <div class="header">
            您8月的通话详单如下
          </div>
          <div class="detail-list">
            <div class="date">
              <span>21</span>
            </div>
            <div class="fr">
              <div class="number">
                <span class="tel">189 7364 2341</span>
                <div class="c-fr">
                  <span class="icon icon-phone-out"></span>
                  <span>主叫</span>
                  <span class="time">13秒</span>
                </div>
              </div>
              <div class="user">
                <span class="name">王健林</span>
                <div class="c-fr">
                  <span class="user-date">2015-05-24 22:00:34</span>
                </div>
              </div>
              <div class="price">
                <span>费用</span>
                <div class="c-fr">
                  <span>￥50.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <dialgog :show="show"
             @submit="close"></dialgog>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .notes {
    overflow: hidden;
    color: #999;
    padding: 1rem;
  }

  .default-color {
    color: #ff8c56;
  }

  .red-color {
    color: #f65a44;
  }

  .more {
    color: #ff8c56;
    text-align: right;
    margin-top: 18px;
    margin-bottom: 8px;
  }

  .record {
    padding-left: 40px;
    .icon {
      position: relative;
      font-size: 40px;
      left: -12px;
      top: 6px;
    }
    .icon-box {
      display: inline-block;
      text-indent: 32px;
      .icon {
        font-size: 40px;
        margin-right: 18px;
      }
    }
    .item {
      padding-top: 10px;
      text-indent: -28px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 20px;
    }
    .item:last-child {
      padding-top: 20px;
    }
  }

  .call-chart {
    padding-bottom: 32px;
  }

  .table {
    margin-top: 46px;
    border-collapse: collapse;
    width: 100%;
    text-align: center;
    border: 1px solid #e5e5e5;
    th {
      height: 80px;
      background-color: #eee;
    }
    td {
      height: 64px;
      border-bottom: 1px solid #e5e5e5;
    }
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

  .switch {
    font-size: 28px;
    background: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    height: 100px;
    .icon {
      margin-left:13rem;
      font-size: 40px;
      margin-right: 15px;
      color: #ff8c56;
      background-repeat: no-repeat;
    }
  }

  .contaienr {
    color: #212121;
    padding-top: 316px;
    width: 100vw;
    min-height: 100vh;
    font-size: 28px;
    .title {
      padding: 30px 0;
      font-weight: 700;
    }
    .summary {
      padding-bottom: 28px;
      border-bottom: 1px solid #ddd;
      img {
        float: left;
      }
      .summary-text {
        height: 86px;
        padding-left: 112px;
        font-size: 28px;
        > div {
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .conver-detail {
      .header {
        font-size: 28px;
        color: #FF8C56;
        padding-top: 28px;
        padding-bottom: 28px;
        border-bottom: 1px solid #E5E5E5;
        background: #FFF;
      }
      .detail-list {
        background: #FFF;
        display: flex;
        align-items: center;
        width: 100%;
        .date {
          width: 15%;
          float: left;
          margin-top: -85px;
          span {
            display: inline-block;
            font-size: 28px;
            background: #FF8C56;
            color: #FFF;
            padding: 10px;
            border-radius: 6px;
          }
        }
        .fr {
          padding-top: 34px;
          padding-bottom: 16px;
          width: 100%;
          .number {
            margin-top:10px;
            font-size: 28px;
            color: #999;
            .c-fr {
              display: inline-block;
              float: right;
              .icon {
                color: green;
                margin-right: 16px;
              }
              .time {
                color: #212121;
                margin-left: 50px;
              }
            }
            .tel {
              font-weight: bold;
              color: #212121;
            }
          }
          .user {
            margin-top: 30px;
            .name {
              font-size: 24px;
              color: #212121;
            }
            .c-fr {
              display: inline-block;
              float: right;
              color: #999;
              .user-date {
                font-size: 24px;
              }
            }
          }
          .price {
            margin-top: 24px;
            span {
              color: #212121;
              font-size: 24px;
            }
            .c-fr {
              display: inline-block;
              float: right;
              span {
                font-size: 30px;
                color: #FF8C56;
              }
            }
          }
        }
      }
    }
  }
</style>
<script>
  import {
    setScroll,
    setupWebViewJavascriptBridge
  } from '../../../assets/js/common'
  import headerBar from '../../../components/header-bar.vue'
  import echarts from 'echarts'
  import dialgog from '../components/dialog.vue'
  export default {
    beforeRouteLeave(to, from, next) {
      setScroll()
      next()
    },
    data () {
      return {
        show: true,
        index: 0
      }
    },
    mounted() {
      this.initCallBar()
      this.initTimeBar()
      this.initPeopleBar()
      setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {
        })
      })
    },
    methods: {
      changeSwitch () {
        this.index = this.index === 0 ? 1 : 0
      },
      initCallBar() {
        let myChart = echarts.init(document.getElementById('call-chart-day'))
        let option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '4%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['4日', '10日', '13日', '21日', '9日'],
            axisLabel: {
              fontSize: 28,
              color: '#999'
            }
          }],
          yAxis: [{
            show: false
          }],
          series: [{
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [100, 80, 60, 40, 20]
          }]
        }
        myChart.setOption(option)
      },
      initTimeBar () {
        let myChart = echarts.init(document.getElementById('call-chart-time'))
        let option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '4%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['0-3', '3-6', '6-9', '9-12', '12-15', '15-18', '18-21', '21-24'],
            axisLabel: {
              fontSize: 24,
              color: '#999'
            }
          }],
          yAxis: [{
            show: false
          }],
          series: [{
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 0, 0, 50, 60, 70, 100, 70]
          }]
        }
        myChart.setOption(option)
      },
      initPeopleBar () {
        let myChart = echarts.init(document.getElementById('call-chart-people'))
        let option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              show: false
            }
          ],
          yAxis: [
            {
              type: 'category',
              data: ['马爷', '华藤马', '罗撕葱', '刘速度', '王海', '柱子', '胖子', '狗子', '翠花', '托尼'],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                fontSize: 24,
                color: '#999'
              }
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
            }
          ]
        }
        myChart.setOption(option)
      },
      close (boolean) {
        this.show = boolean
      },
      showMonthPicker() {
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM',
          maxYear: 2017,
          onConfirm(val) {
            console.log(val)
          }
        })
      },
      showDatePicker() {
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          maxYear: 2017
        })
      }
    },
    components: {
      headerBar,
      dialgog
    }
  }
</script>
