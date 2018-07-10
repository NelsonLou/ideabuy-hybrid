<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="号码归属地" :back-to-app="true"></header-bar>
    </div>
    <div class="container">
         <div class="numberBox">
               <input v-model="keyword" class="boxInput" type="text" placeholder="请输入要查询的联通手机号码">
               <button class="boxBtn" @click="getNumber">查询</button>
               <div v-if="ok" class="queryResult">
                  <div class="query-hear">
                    <img src="../../../assets/img/magnifier.png">
                    <span>查询结果</span>
                  </div>
                  <div class="queryContentBox">
                    <div>
                      <span class="color-gray">所查号码</span>
                      <span class="color-black">{{content}}</span>
                    </div>
                    <div class="lineH">
                      <span class="color-gray">归属省</span>
                      <span class="color-black">浙江</span>
                    </div>
                    <div class="lineH">
                      <span class="color-gray">归属地市</span>
                      <span class="color-black">宁波</span>
                    </div>
                    <div class="lineH">
                      <span class="color-gray">归属区县</span>
                      <span class="color-black"></span>
                    </div>
                    <div class="lineH">
                      <span class="color-gray">运营商</span>
                      <span class="color-black"></span>
                    </div>
                  </div>
               </div>
               <div class="lastBox">
                    <div>
                      <span class="last-h">随时随地查询：</span>
                    </div>
                    <div class="last-line">
                      <span class="last-h">中国联通短信营业厅：</span>
                      <span class="last-p">发短信至10010</span>
                    </div>
                     <div class="last-line">
                      <span class="last-h">中国联通手机营业厅：</span>
                      <span class="last-p">wap.10010.com</span>
                    </div>
                     <div class="last-line">
                      <span class="last-h">中国联通网上营业厅：</span>
                      <span class="last-p">www.10010.com</span>
                    </div>
                  </div>
         </div>
    </div>
  </div>
</template>
<style scoped>
 input::-webkit-input-placeholder {
   color: #999999;
   font-size: 28px;
 }
  .container {
    padding-top: 96px;
    width:100vw;
    min-height:100vh;
    background: #FFFFFF;
  }
  .numberBox {
    margin: 0 40px 0 40px;
  }
  .boxInput {
    width: 100%;
    height: 4.4rem;
    background-color: #EEEEEE;
    text-align: center;
    border-radius: 10px;
    font-size: 28px;
    color: #212121;
    margin-top: 3.5rem;
  }
    
  .boxBtn {
    width: 100%;
    height: 4.4rem;
    background-color: #FF8C56;
    border-radius: 10px;
    font-size: 28px;
    color: white;
    margin-top: 1.8rem;
    border: none;
  }
  .query-hear {
    margin-top: 4.5rem;
    height: 3rem;
    border-bottom: 1px solid #CCCCCC;
  }
  .query-hear span {
    font-size: 30px;
    margin-left: 10px;
    color: #212121;
  }
  .queryContentBox {
    margin-top: 26px;
  }
  .color-gray {
    font: 28px PingFangSC-Regular;
    color: #999999;
  }
  .color-black {
    font: 28px PingFangSC-Regular;
    color: #212121;
    float: right;
  }
  .lineH {
    margin-top: 32px;
  }
  .lastBox {
    margin-top: 5rem;
  }
  .last-line {
    margin-top: 27px;
  }
  .last-h {
    font: 28px PingFangSC-Regular;
    color: #212121;
  }
  .last-p {
    font: 28px PingFangSC-Regular;
    color: #FF8C56;
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
    data: () => ({
       ok: false,
       arr: ['123', '456', '789'],
       keyword: '',
       is: false,
       content: ''
    }),
     mounted() {
       setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {
        })
      })
    },
    methods: {
      getNumber() {
        for (let i in this.arr) {
          if (this.keyword === '') {
            this.is = false
                this.$vux.alert.show({
                  title: '对不起',
                  content: '手机号不能为空'
                })
          } else if (this.keyword === this.arr[i]) {
               this.is = true
               this.content = this.keyword
               console.log(this.content)
               console.log(this.is)
               break
          } else {
            this.is = false
            this.$vux.alert.show({
                  title: '对不起',
                  content: '未找到手机号'
            })
          }
        }
        if (this.is === true) {
            this.ok = true
        } else {
          this.ok = false
        }
      }
    },
    components: {
      headerBar
    }
  }
</script>
