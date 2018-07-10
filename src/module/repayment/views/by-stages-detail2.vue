<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="分期明细" :back-to-web="true"></header-bar>
    </div>
    <div class="container">
      <div class="stages-group">
        <div class="stage" v-for="stage in byStageDetail.list" :class="{cleared:stage.status_name=='已还清'}">
          <div class="line1">
            <div>{{stage.current_month}}/{{stage.month}}期</div>
            <div>{{parseFloat(stage.overdue_fee)>0?stage.plan_pay_fee+'(含服务费、违约金'+stage.interest_fee+')':stage.plan_pay_fee+'(包含服务费'+stage.interest_fee+')'}}</div>
          </div>
          <div class="line2">
            <div>还款日 {{stage.plan_pay_date}}</div>
            <div :style="stage.pay_status==2?'color:#de0000':''">{{stage.status_name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .container{
    padding-top:96px;
    width:100vw;
    min-height:100vh;
    .stages-group{
      .stage{
        padding:28px 2rem 28px 2rem;
        background:#fff;
        &.cleared{
          background:#f5f5f5;
          .line1{
            color:#999;
          }
        }
        >div{
          display: flex;
          justify-content: space-between;
          font-size:28px;
        }
        .line1{
          color:#212121;
        }
        .line2{
          margin-top:30px;
          color:#999
        }
      }
    }
  }
</style>
<script>
  import headerBar from '../../../components/header-bar.vue'
  import {setScroll} from '../../../assets/js/common'
  export default{
    beforeRouteLeave(to, from, next) {
      setScroll()
      next()
    },
    computed: {
      byStageDetail () {
        return this.$store.state.bill.byStagesDetail
      }
    },
    components: {
      headerBar
    }
  }
</script>
