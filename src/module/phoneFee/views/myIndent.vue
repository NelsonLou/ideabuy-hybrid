<template>
<div class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="我的订单" :back-to-web="true"></header-bar>
  </div>
  <tab bar-active-color="#ff8c56" active-color="#ff8c56" class="tab-container">
    <tab-item v-for="item in 6" :key="item" :selected="month === 9 - item" @on-item-click="monthChange">
      <p>{{9 - item}}月</p>
      <p>{{year}}</p>
    </tab-item>
  </tab>
  <div class="container">
    <swipeout v-if="indent.length !== 0">
      <swipeout-item transition-mode="follow" v-for="(item,index) in indentArr" :key="item.datetime" class="indent">
        <div slot="right-menu">
          <swipeout-button @click.native="handleDelete(index)" type="warn" :width="150" class="delete">删除</swipeout-button>
        </div>
        <div slot="content" class="info">
          <div class="text">
            <p>{{item.detail}}</p>
            <p>{{item.datetime}}</p>
          </div>
          <div :class="{status:true, cancel:item.status === 0, success:item.status === 1, fail:item.status === 2}">{{item.desc}}</div>
        </div>
      </swipeout-item>
    </swipeout>
    <div class="msg" v-else>
      <span class="icon icon-circle-exclamatory"></span>
      <span>暂无历史充值记录！</span>
    </div>
  </div>
</div>
</template>
<script type="es6">
import eventhub from '../../../assets/js/eventhub'
import {
  setScroll
} from '../../../assets/js/common'
import headerBar from '../../../components/header-bar.vue'
import {
  Tab,
  TabItem,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton
} from 'vux'
export default {
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  data() {
    return {
      month: 8,
      year: 2017,
      indent: [],
      indentArr: [{
          detail: '充值50.00元 - 18668005713',
          datetime: '2017-08-28 12:50:48',
          status: 0,
          desc: '已取消'
        },
        {
          detail: '充值50.00元 - 18668005713',
          datetime: '2017-08-22 18:30:12',
          status: 0,
          desc: '已取消'
        },
        {
          detail: '充值50.00元 - 18668005713',
          datetime: '2017-08-15 10:00:18',
          status: 1,
          desc: '充值成功'
        },
        {
          detail: '充值50.00元 - 18668005713',
          datetime: '2017-08-08 20:40:25',
          status: 2,
          desc: '充值失败'
        }
      ]
    }
  },
  activated() {
    this.indent = this.indentArr
  },
  methods: {
    monthChange(month) {
      this.month = 8 - month
      if (this.month === 8) {
        this.indent = this.indentArr
      } else {
        this.indent = []
      }
    },
    handleDelete(i) {
      this.indent.splice(i, 1)
    }
  },
  components: {
    headerBar,
    Tab,
    TabItem,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.tab-container {
    z-index: 1;
    position: fixed;
    top: 96px;
    left: 0;
    width: 100%;
    height: 110px;
    padding: 20px 0 0;
    text-align: center;
    & p {
        margin: 0;
        line-height: 35px;
        font-size: 28px;
        color: #212121;
    }
    p:nth-child(2) {
        font-size: 20px;
    }
}
.container {
    width: 100%;
    overflow: hidden;
    margin-top: 200px;
}
.indent {
    width: 100%;
    height: 168px;
    margin-top: 20px;
    background: #fff;
    overflow: hidden;
    .info {
        width: 100%;
        height: 100%;
        font-size: 28px;
        float: left;
        line-height: 100px;
        display: flex;
        flex-wrap: wrap;
        .text {
            width: 75%;
            padding: 40px 0 45px;
            p {
                margin: 0;
            }
            p:nth-child(1) {
                color: #212121;
                margin-bottom: 33px;
                line-height: 28px;
                padding-left: 33px;
            }
            p:nth-child(2) {
                font-size: 22px;
                line-height: 22px;
                color: #999;
                padding-left: 40px;
            }
        }
        .status {
            width: 25%;
            padding: 38px 38px 0 0;
            line-height: 28px;
            text-align: right;
        }
        .cancel {
            color: #999;
        }
        .success {
            color: #51D22E;
        }
        .fail {
            color: #F65A44;
        }
    }
    .delete {
        height: 100%;
        background-color: #f65a44;
        text-align: center;
        line-height: 170px;
        font-size: 28px;
        color: #fff;
    }
}
.msg {
    text-align: center;
    font-size: 0;
    overflow: hidden;
    width: 310px;
    margin: 50px auto 0;
    span:nth-child(1) {
        font-size: 40px;
        line-height: 60px;
        float: left;
        color: #ccc;
    }
    span:nth-child(2) {
        font-size: 28px;
        line-height: 60px;
        float: left;
        margin-left: 15px;
        color: #999;
    }
}
</style>
