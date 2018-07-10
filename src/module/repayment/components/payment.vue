<template>
<div v-transfer-dom>
  <popup :value="show" @on-hide="close">
    <transition :name="transitionName">
      <div class="pay-popup" v-show="payStatus==0">
        <div class="title">
          <div class="close" @click="close">
            <span class="icon icon-x"></span>
          </div>
          <div class="text">确认还款</div>
        </div>
        <div class="money">
          <div class="line1">向联通畅想购支付</div>
          <div class="line2">￥{{money}}</div>
        </div>
        <div class="group" @click="toChosePayWay">
          <div>支付方式</div>
          <div>
            <img :src="choseCard?choseCard.bank_logo:''"> {{choseCard?choseCard.bank_name:''}}（{{choseCard?choseCard.card_number.slice(choseCard.card_number.length-4):''}}）
          </div>
          <div class="arrow">
            <span class="icon-arrow-right"></span>
          </div>
        </div>
        <div class="group">
          <div>持卡人</div>
          <div>
            {{choseCard?choseCard.card_name:''}}
          </div>
        </div>
        <div class="footer">
          <div>
            <submit-btn title="立即付款" @submit="pay"></submit-btn>
          </div>
        </div>
      </div>
    </transition>
    <transition :name="transitionName">
      <div class="chose-popup" v-show="payStatus!=0">
        <div class="title">
          <div class="back" @click="backToPay">
            <span class="icon icon-arrow-left"></span>
          </div>
          <div class="text">选择还款方式</div>
        </div>
        <div class="body">
          <div class="way" v-for="(item,index) in cardList" @click="chosePayWay(item)">
            <img :src="item.bank_logo" class="bank-logo">
            <div>
              {{item.bank_name}}（{{item.card_number.slice(item.card_number.length-4)}}）
            </div>
            <div><span class="icon icon-right" :class="{actived:item.is_card_first==1}"></span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </popup>
</div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .my-slide-left-leave-active {
      transition: all 0.35s ease;
      position: fixed;
  }

  .my-slide-left-enter-active {
      transition: all 0.35s ease;
  }

  .my-slide-left-leave-to {
      margin-left: -100%;
  }

  .my-slide-left-enter {
      margin-left: 100%;
  }

  .my-slide-right-leave-active {
      transition: all 0.35s ease;
      position: fixed;
      bottom: 0;
  }

  .my-slide-right-enter-active {
      transition: all 0.35s ease;
  }

  .my-slide-right-leave-to {
      margin-left: 100%;
  }

  .my-slide-right-enter {
      margin-left: -100%;
  }

  .pay-popup {
      background: #fff;
      width: 100%;
      > div {
          border-bottom: 1px solid #ddd;
          &:last-child {
              border-bottom: 0;
          }
      }
      .title {
          text-align: center;
          font-size: 1.4rem;
          color: #232323;
          line-height: 4.3rem;
          position: relative;
          .close {
              position: absolute;
              top: 0;
              left: 0;
              width: 3.5rem;
              line-height: 4.3rem;
              font-size: 1.4rem;
          }
      }
      .money {
          text-align: center;
          padding: 3rem 0 4rem;
          .line1 {
              font-size: 1.4rem;
              color: #232323;
          }
          .line2 {
              margin-top: 2.2rem;
              font-size: 3.6rem;
              color: #232323;
          }
      }
      .group {
          font-size: 1.4rem;
          color: #282828;
          position: relative;
          line-height: 5rem;
          display: flex;
          justify-content: space-between;
          padding: 0 4.3rem 0 2rem;
          img {
              height: 3rem;
              vertical-align: middle;
          }
          .arrow {
              /*height:5rem;*/
              line-height: 5rem;
              font-size: 1.2rem;
              position: absolute;
              top: 0;
              right: 2rem;
          }
      }
      .footer {
          border-top: 1px solid transparent;
          height: 12rem;
          padding: 0 2rem;
          > div {
              border-top: 1px solid transparent;
              margin-top: 3.3rem;
          }
      }
  }

  .chose-popup {
      width: 100%;
      background: #fff;
      height: 41.4rem;
      .title {
          text-align: center;
          font-size: 1.4rem;
          color: #232323;
          line-height: 4.3rem;
          position: relative;
          border-bottom: 1px solid #ddd;
          .back {
              position: absolute;
              top: 0;
              left: 0;
              width: 3.5rem;
              line-height: 4.3rem;
              font-size: 1.4rem;
          }
      }
      .body {
          height: 37.05rem;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          .way {
              padding: 0 2rem 0 100px;
              font-size: 1.2rem;
              line-height: 5rem;
              border-bottom: 1px solid #ddd;
              display: flex;
              justify-content: space-between;
              position: relative;
              .bank-logo {
                  top: 50%;
                  left: 20px;
                  margin-top: -40px;
                  position: absolute;
                  width: 80px;
                  height: 80px;
              }
              .icon {
                  color: #fff;
                  &.actived {
                      color: #de0000;
                  }
              }
          }
      }
  }
</style>
<script type="es6">
import {
  TransferDom,
  Popup
} from 'vux'
import submitBtn from '../../../components/submit-btn.vue'
import eventhub from '../../../assets/js/eventhub'
import {
  setupWebViewJavascriptBridge
} from '../../../assets/js/common'
export default {
  directives: {
    TransferDom
  },
  props: ['money', 'cardList', 'pay_type'],
  data() {
    return {
      payStatus: 0,
      transitionName: 'my-slide-left',
      i: null
    }
  },
  computed: {
    show() {
      return this.$store.state.bill.paymentShow
    },
    choseCard() {
      for (let i = 0; i < this.cardList.length; i++) {
        if (this.cardList[i].is_card_first === 1) {
          return this.cardList[i]
        }
      }
    }
  },
  methods: {
    toChosePayWay() {
      this.transitionName = 'my-slide-left'
      this.payStatus = 1
    },
    chosePayWay(item) {
      for (let i = 0; i < this.cardList.length; i++) {
        this.cardList[i].is_card_first = 0
      }
      item.is_card_first = 1
      this.backToPay()
    },
    backToPay() {
      this.transitionName = 'my-slide-right'
      this.payStatus = 0
    },
    close() {
      this.$store.commit('bill_togglePayment', false)
    },
    jlpay() {
      this.axios.post('/yee-pay', {
        amount: this.money,
        card_id: this.choseCard.card_id
      }).then(res => {
        this.close()
        if (res.code === 1) {
//            eventhub.$emit('refresh_allBills')
//            this.$parent.getData()
          setupWebViewJavascriptBridge((bridge) => {
            bridge.callHandler('WKJSBridge_openPage', {
              url: res.data.url
            }, () => {
            })
          })
        } else if (res.code === 10170) {
          this.$vux.alert.show({
            title: '提示',
            content: res.msg
          })
        } else if (res.code === 10171) {
          let me = this
          this.$vux.alert.show({
            title: '提示',
            content: res.msg,
            onHide() {
              me.$parent.getData()
            }
          })
        }
      })
    },
    kfpay() {
      this.axios.post('/kft-pay', {
        amount: this.money,
        card_id: this.choseCard.card_id
      }).then(res => {
        if (res) {
          this.$store.commit('bill_setPayPageInfo', {
            amount: this.money,
            choseCard: this.choseCard,
            orderNo: res.data.orderNo,
            card_mobile: res.data.card_mobile
          })
          this.$router.push('/repayment/payPage')
        }
      })
    },
    pay() {
      if (this.pay_type === '1') {
        this.jlpay()
      }else {
        this.kfpay()
      }
    }
  },
  components: {
    Popup,
    submitBtn
  }
}
</script>
