<template>
<div id="flow-info" class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="充流量包" :back-to-web="true" :no-border="true"></header-bar>
  </div>
  <div class="container">
    <div class="head">
      <div class="box" :class="info.color">
        <h3>{{info.name}}</h3>
        <p>售价{{info.price}}元</p>
        <span v-if="info.sale">{{info.sale}}</span>
      </div>
      <h2>{{info.desc}}</h2>
    </div>
    <ul class="brief">
      <li>包省内流量：<span>{{info.name}}</span></li>
      <li>加油包价格：<span>{{info.price}}元/月</span></li>
      <li>使用时间段：<span>仅限23:00-次日07:00</span></li>
      <li>生效时间：<span>次月生效</span></li>
    </ul>
    <div class="desc">
      <h3>{{info.price}}元{{info.title}}</h3>
      <ol>
        <li>中国联通为4G手机用户（智慧沃家用户除外）在闲时（23：00-次日 07：00）推出“4G闲时流量包”，享受流量优惠，10元/月可使用1GB省内流量，15元/月可使用3GB省内流量。</li>
        <li>闲时流量包按月扣费，若不退订，默认续订。</li>
      </ol>
      <p>* 使用时间段：仅限23：00-次日07：00</p>
    </div>
    <div class="form">
      <input type="checkbox" id="agree" class="agree" v-model="agree">
      <label for="agree">我已阅读</label>
      <div v-if="!agree" class="btn disabled">立即购买</div>
      <router-link v-else class="btn" :to="{name: 'flowBuy', params: {name: info.desc}}" tag="div">立即购买</router-link>
    </div>
    <div class="prompt">
      <p>温馨提示：</p>
      <ol>
        <li>流量包可叠加现有的4G套餐。</li>
        <li>流量包可在自由电子渠道，自有实体渠道，以及社会渠道办理。</li>
        <li>当月办理次月1日生效。</li>
      </ol>
    </div>
  </div>
</div>
</template>
<script>
import {
  setScroll
} from '@/assets/js/common'
import headerBar from '@/components/header-bar'
export default {
  name: 'flow-info',
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  data: () => ({
    info: {},
    agree: false
  }),
  components: {
    headerBar
  },
  activated() {
    const id = this.$route.params.id
    if (id) {
      this.getInfo(id)
      this.agree = false
    }
  },
  methods: {
    getInfo(index) {
      this.axios.post('/flow-info', {
          id: index
        })
        .then(res => {
          console.log(res)
          this.info = res.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
#flow-info {
    .container {
        min-height: 100vh;
        padding-top: 96px;
        color: #212121;
        background-color: #fff;
        font-size: 28px;
        line-height: 60px;
    }

    .head {
        overflow: hidden;
        height: 360px;
        text-align: center;
        color: #fff;
        background-color: #fd7f06;
    }

    .box {
        position: relative;
        width: 16rem;
        margin: 3rem auto 0;
        padding: 1.5rem 0.5rem;
        border-radius: 1rem;
        box-shadow: 0 0 12px 0 #ccc;

        h3,
        p {
            margin: 0;
        }

        span {
            position: absolute;
            top: 0;
            left: 0;
            padding: 0.5rem;
            border-radius: 0.5rem 0 0.5rem 0;
            background-color: #ff8c56;
            line-height: 36px;
        }

        &.yellow {
            background-image: linear-gradient(to right, #f4d695, #f6cb6d);
        }

        &.red {
            background-image: linear-gradient(to right, #f7aca7, #f5908a);
        }

        &.green {
            background-image: linear-gradient(to right, #a7dfc1, #a2e0ab);
        }

        &.blue {
            background-image: linear-gradient(to right, #c0dfea, #b6cbeb);
        }
    }

    h2 {
        font-size: 28px;
    }

    .brief {
        margin: 1rem;
        padding: 1rem;
        list-style-type: none;

        span {
            color: #fd7f06;
        }
    }

    .desc {
        padding: 1rem 2rem;
        border-top: 1px solid #e5e5e5;

        h3 {
            margin: 1rem 0;
            font-weight: 400;
        }

        li {
            margin-bottom: 1rem;
        }

        p {
            margin: 1rem 0;
            color: #fd7f06;
        }
    }

    .form {
        padding: 0 2rem;

        .btn {
            width: 100%;
            margin: 1rem 0;
            text-align: center;
            color: #fff;
            border-radius: 10px;
            background-color: #fd7f06;
            line-height: 88px;

            &.disabled {
                background-color: #ccc;
            }
        }
    }

    .prompt {
        padding: 1rem 2rem;
    }

    .agree {
        width: 30px;
        height: 30px;
        margin-right: 1rem;
    }
}
</style>
