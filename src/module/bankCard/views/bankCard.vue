<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="银行卡管理"
                  :back-to-app="true"
                  :no-border="true">
        <div class="my-opeartion"
             @click="addCard">
          +
        </div>
      </header-bar>
    </div>

    <div class="container">
      <div style="padding:0 1rem;">
        <div class="card"
             v-for="(item, index) in cardList"
             @click="ifDel(item,index)"
             :class="{actived:i==index}"
             :style="'background:-webkit-linear-gradient(left,'+item.color_start+','+item.color_stop+')'">
          <div class="card-title">
            <div class="icon"
                 :style="'background-image:url('+item.bank_logo+')'"></div>
            <div class="bank-name">
              {{item.bank_name}}
            </div>
          </div>
          <div class="card-number">
            <div v-for="num in 4" class="star">*
            </div>
            <div class="num">
              {{item.card_number}}
            </div>
          </div>
        </div>
      </div>
      <div class="no-card"
           v-if="cardList.length==0&&ifGetData">
        <img src="../../../assets/img/no-card.png"
             width="184" height="144">
        <div style="margin-top:62px;">暂无绑定银行卡
        </div>
        <div
          style="margin-top:36px;font-size:24px;">
          通过绑定银行卡，来给分期账单还款
        </div>
        <div style="margin-top:48px;color:#3978d6"
             @click="addCard">添加银行卡 >
        </div>
      </div>
    </div>
    <!--<actionsheet v-model="show" :menus="operation" show-cancel></actionsheet>-->
    <div v-transfer-dom>
      <popup v-model="show">
        <div class="del-popup">
          <div class="line1" @click="delCard">
            删除尾号{{selectedCard?selectedCard.card_number:''}}的银行卡
          </div>
          <div class="line2" @click="show=false">
            取消
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .del-popup {
    background: #fff;
    > div {
      line-height: 6rem;
      font-size: 1.4rem;
      text-align: center;
      &.line1 {
        color: #d22020;
        border-bottom: 1px solid #ddd;
      }
      &.line2 {
        color: #212121;
      }
    }
  }

  .my-opeartion {
    font-size: 50px;
    padding: 0 2rem;
  }

  .container {
    min-height: 100vh;
    background: #000;
    padding: 88px 0 2rem 0;
    .card {
      width: 100%;
      height: 200px;
      background: #fff;
      margin-top: 1.75rem;
      border-radius: 5px;
      /*background: -webkit-linear-gradient(left, green, darkgreen);*/
      border-top: 1px solid transparent;
      position: relative;
      &.actived {
        z-index: 1001;
      }
      .card-title {
        margin-top: 32px;
        padding-left: 1rem;
        div {
          display: inline-block;
          vertical-align: middle;
        }
        .icon {
          width: 79px;
          height: 79px;
          border-radius: 50%;
          /*background-image: url('../../../assets/img/ABC.png');*/
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }
        .bank-name {
          margin-left: 1.6rem;
          font-size: 28px;
          color: #fff;
          line-height: 79px;
        }
        .card-type {
          margin-left: 1.6rem;
          font-size: 24px;
          color: #fff;
          line-height: 79px;
        }
      }
      .card-number {
        font-size: 46px;
        text-align: right;
        padding-right: 3rem;
        div {
          display: inline-block;
          vertical-align: middle;
          text-shadow: 3px 3px 0px #000;
        }
        .star {
          width: 4rem;
          text-align: left;
          color: #fff;
        }
        .num {
          color: #fff;
          text-align: left;
          margin-top: -26px;
        }
      }
    }
    .no-card {
      background: #fff;
      margin-top: 11rem;
      padding-top: 80px;
      padding-bottom: 80px;
      text-align: center;
      color: #999;
      font-size: 28px;
    }
  }
</style>
<script>
  import headerBar from '../../../components/header-bar.vue'
  import {TransferDom, Popup} from 'vux'
  import {
    setScroll,
    setupWebViewJavascriptBridge,
    getToken
  } from '../../../assets/js/common'
  import eventhub from '../../../assets/js/eventhub'
  export default{
    beforeRouteLeave (to, from, next) {
      setScroll()
      next()
    },
    directives: {
      TransferDom
    },
    data () {
      return {
        show: false,
        i: null,
        cardList: [],
        selectedCard: null,
        ifGetData: false,
        auth: {}
      }
    },
    methods: {
      addCard () {
        this.$router.push('/bankCard/addCard')
      },
      ifDel (card, index) {
        this.selectedCard = card
        this.i = index
        this.show = true
      },
      delCard () {
        this.axios.post('user-carddelete', {
          card_id: this.selectedCard.card_id
        }).then(res => {
          if (res) {
            this.show = false
            this.cardList.splice(this.i, 1)
            setupWebViewJavascriptBridge((bridge) => {
              bridge.callHandler('WKJSBridge_refreshAuthInfo', {
                is_pay_password: this.auth.is_pay_password,
                is_bankcard: this.cardList.length === 0 ? '0' : this.auth.is_linkman,
                is_linkman: this.auth.is_linkman
              }, () => {
              })
            })
          }
        })
      },
      getData () {
        this.$store.commit('loading_setDelay', true)
        this.axios.get('/user-cardlist').then(res => {
          if (res) {
            this.cardList = res.data.card_list
            this.ifGetData = true
          }
        })
      }
    },
    mounted () {
      getToken().then(() => {
        this.getData()
      })
      eventhub.$on('bank-card-reload', () => {
        this.getData()
      })
      setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {
        })
        bridge.callHandler('WKJSBridge_passAuthInfo', {}, (res) => {
          if (typeof res === 'string') {
            res = JSON.parse(res)
          }
          this.auth = res
        })
      })
    },
    components: {
      headerBar,
      Popup
    }
  }
</script>
