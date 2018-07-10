<template>
<div id="flow-buy" class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="充流量包" :back-to-web="true" :no-border="true"></header-bar>
  </div>
  <div class="container">
    <div class="user-info">
      <h3>信息确认</h3>
      <p>客户姓名：<span>{{userInfo.user}}</span></p>
      <p>手机号码：<span>{{userInfo.phone}}</span></p>
    </div>
    <div class="pack-info">
      <p class="cnt">尊敬的用户，您订购的<span>{{$route.params.name}}</span>，将于次月1日生效，请确认提交。</p>
      <p class="prompt">办理时间：{{userInfo.date}}</p>
      <p class="btns">
        <button class="btn" @click="goBack">返回</button>
        <button class="btn btn-primary" @click="okSubmit">确认</button>
      </p>
    </div>
  </div>
</div>
</template>
<script>
import {
  setScroll
} from '@/assets/js/common'
import headerBar from '@/components/header-bar'
import eventhub from '@/assets/js/eventhub'
export default {
  name: 'flow-buy',
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  data: () => ({
    userInfo: {
      user: '张朋信',
      phone: '18668005713',
      date: '2017年09月01日'
    }
  }),
  components: {
    headerBar
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      eventhub.$emit('backword')
    },
    okSubmit() {
      this.$vux.alert.show({
        title: '恭喜（测试）',
        content: '流量充值成功！'
        // onShow() {
        //   console.log('Plugin: I\'m showing')
        // },
        // onHide() {
        //   console.log('Plugin: I\'m hiding')
        // }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#flow-buy {
    .container {
        min-height: 100vh;
        padding: 96px 50px 0;
        color: #212121;
        background-color: #fff;
        font-size: 28px;
        line-height: 60px;

        h3 {
            margin: 3rem 0 0.5rem;
            text-align: center;
            font-weight: 400;
        }

        p {
            margin: 1.5rem 0;

            span {
                color: #fd7f06;
            }
        }

        .user-info {
            overflow: hidden;

            span {
                float: right;
            }
        }

        .pack-info {
            overflow: hidden;
        }

        .cnt {
            margin: 0.5rem 0;
            padding-top: 2rem;
            border-top: 1px solid #e5e5e5;
        }

        .prompt {
            margin-top: 0.5rem;
            text-align: right;
            color: #999;
        }

        .btns {
            text-align: center;

            .btn {
                width: 260px;
                margin: 10px;
                color: #fd7f06;
                border: 1px solid #fd7f06;
                border-radius: 10px;
                background-color: #fff;
                line-height: 88px;
            }

            .btn-primary {
                color: #fff;
                background-color: #fd7f06;
            }
        }
    }
}
</style>
