<template>
  <div v-transfer-dom>
    <popup :value="show" @on-hide="close">
      <div class="by-stages-popup">
        <div v-for="(item,index) in data"
             @click="chose(index)">
          <div class="recommend"
               v-if="item.default==1">荐
          </div>
          <span>分{{item.type_name}}期X</span>
          <span style="color:#ff8c56">{{item.monthly_total_fee}}</span>元
          <span
            style="margin-left:2.4rem;color:#bbb;">每期含服务费{{item.monthly_service_fee}}</span>
          <span class="icon icon-right"
                :class="{actived:chose_index==index}"></span>
        </div>
        <div class="footer-btn">
          <div>
            <submit-btn title="确认分期"
                        @submit="pay"></submit-btn>
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .by-stages-popup {
    background: #fff;
    > div {
      line-height: 5rem;
      padding: 0 2rem;
      font-size: 1.4rem;
      color: #282828;
      border-bottom: 1px solid #ddd;
      position: relative;
      span {
        position: relative;
        z-index: 2;
      }
      .recommend {
        position: absolute;
        top: 0;
        left: 0;
        width: 48px;
        height: 48px;
        background: #6fc64c;
        line-height: 100%;
        font-size: 24px;
        color: #fff;
        &::after {
          content: '';
          width: 50px;
          height: 50px;
          position: absolute;
          top: 0;
          left: 20px;
          background: #fff;
          transform: skew(-45deg);
        }
      }
      .icon {
        color: #fff;
        float: right;
        line-height: 5rem;
        &.actived {
          color: #de0000;
        }
      }
    }
    .footer-btn {
      border-top: 1px solid transparent;
      height: 10rem;
      padding: 0 2rem;
      > div {
        border-top: 1px solid transparent;
        margin-top: 2.3rem;
      }
    }
  }
</style>
<script type="es6">
  import {TransferDom, Popup} from 'vux'
  import submitBtn from '../../../components/submit-btn.vue'
  export default{
    directives: {
      TransferDom
    },
    props: ['show', 'data', 'money', 'orderSn'],
    data () {
      return {
        chose_index: 1
      }
    },
    computed: {
      default_index () {
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].default === 1) {
            return i
          }
        }
      }
    },
    methods: {
      close () {
        this.$emit('close')
      },
      chose (index) {
        this.chose_index = index
      },
      pay () {
        this.axios.post('/user-confirm-install', {
          order_sn: this.orderSn,
          month: this.data[this.chose_index].type_name,
          amount: this.money
        }).then(res => {
          if (res) {
            this.$emit('byStagesOver')
          }
        })
      }
    },
    watch: {
      show () {
        this.chose_index = this.default_index
      }
    },
    components: {
      submitBtn,
      Popup
    }
  }
</script>
