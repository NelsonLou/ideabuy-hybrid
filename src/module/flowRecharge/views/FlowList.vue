<template>
<div id="flow-list" class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="充流量包" :back-to-app="true" :no-border="true"></header-bar>
  </div>
  <div class="container">
    <div class="tab-tag my-fixed">
      <tab :line-width="6" active-color="#ff8c56" :animate="false">
        <tab-item :selected="selected === item.value" v-for="(item, index) in tags" :key="index" @on-item-click="getData(item.value)">{{item.label}}</tab-item>
      </tab>
    </div>
    <div class="tab-pane">
      <div class="cat" v-for="(item, index) in list" :key="index">
        <div class="title">
          <h2><span>{{item.title}}</span></h2>
          <p v-if="item.subTitle">{{item.subTitle}}</p>
        </div>
        <div class="list">
          <div class="item" :class="item.color" v-for="(subItem, index) in item.goods" :key="index">
            <router-link :to="{name: 'flowInfo', params: {id: subItem.id}}" tag="div" class="box">
              <h3>{{subItem.name}}</h3>
              <p>售价{{subItem.price}}元</p>
              <span v-if="subItem.sale">{{subItem.sale}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {
  Tab,
  TabItem
} from 'vux'
import {
  requestURLparas,
  setScroll,
  setupWebViewJavascriptBridge
} from '@/assets/js/common'
import headerBar from '@/components/header-bar'
export default {
  name: 'flow-list',
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  data: () => ({
    selected: parseInt(requestURLparas('to') || 1),
    tags: [],
    list: []
  }),
  components: {
    Tab,
    TabItem,
    headerBar
  },
  mounted() {
    this.getTags()
    this.getData(this.selected)
    setupWebViewJavascriptBridge((bridge) => {
      bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {})
    })
  },
  methods: {
    getTags() {
      this.axios.get('/flow-tags')
        .then(res => {
          this.tags = res.data.tags
        })
        .catch(error => {
          console.log(error)
        })
    },
    getData(value) {
      this.axios.post('/flow-list', {
          id: value
        })
        .then(res => {
          this.selected = value
          this.list = res.data.list
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
#flow-list {
    .container {
        min-height: 100vh;
        padding-top: 96px;
        color: #212121;
        background-color: #fff;
        font-size: 26px;
    }

    .tab-tag {
        position: fixed;
        overflow-y: auto;
        width: 180px;
        height: 100%;
        min-height: calc(100vh - 88px);
        background-color: #eee;
    }

    .tab-pane {
        margin-right: 20px;
        margin-left: 200px;

        .title {
            overflow: hidden;
            text-align: center;

            h2 {
                position: relative;
                margin: 1.2rem 0.5rem;
                font-size: 28px;
                font-weight: 400;
                &:before {
                    position: absolute;
                    top: 50%;
                    right: 0;
                    left: 0;
                    height: 1px;
                    content: '';
                    background-color: #e5e5e5;
                }
            }

            span {
                position: relative;
                z-index: 9;
                padding: 0 1rem;
                background-color: #fff;
            }

            p {
                color: #999;
            }
        }

        .list {
            overflow: hidden;
            padding-bottom: 1rem;

            .item {
                float: left;
                width: 50%;
                text-align: center;
                color: #fff;
            }

            .box {
                position: relative;
                overflow: hidden;
                margin: 0.5rem;
                border-radius: 0.5rem;
                box-shadow: 0 0 8px 0 #ccc;
            }

            span {
                position: absolute;
                top: 0;
                left: 0;
                padding: 0.5rem;
                border-radius: 0.5rem 0 0.5rem 0;
                background-color: #ff8c56;
            }

            .yellow .box {
                background-image: linear-gradient(to right, #f4d695, #f6cb6d);
            }

            .red .box {
                background-image: linear-gradient(to right, #f7aca7, #f5908a);
            }

            .green .box {
                background-image: linear-gradient(to right, #a7dfc1, #a2e0ab);
            }

            .blue .box {
                background-image: linear-gradient(to right, #c0dfea, #b6cbeb);
            }
        }
    }

    .vux-tab {
        display: block;
        height: auto;
        background-color: #eee;

        .vux-tab-item {
            background: none;
            line-height: 120px;

            &.vux-tab-selected {
                border-bottom-style: none;
                border-left: 3px solid #ff8c56;
                background-color: #fff;
            }
        }
    }
}
</style>
