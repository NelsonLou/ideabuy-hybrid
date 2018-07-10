<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="收货地址" :back-to-web="true"></header-bar>
    </div>
    <div class="container">
      <div class="form">
        <div class="user">
          <div class="addressTitle"><span>收件人</span></div>
          <input type="text" v-model="name">
        </div>
        <div class="tel">
          <div class="addressTitle"><span>手机号码</span></div>
          <input type="number" v-model="tel">
        </div>
        <div class="address" scope="scope">
          <x-address class="xx" v-model="addr" :list="addressList" title="收件人地址" ref="address" @on-hide="setDefaultAddress" value-text-align="left" placeholder="请选择地址"></x-address>
        </div>
        <div class="detailed-address">
          <span type="text" >{{detailed_address}}</span>
        </div>
      </div>
      <div class="delivery-time">
        <div class="fl">
          配送时间
        </div>
        <div class="fr">
          <span :class="{'btn-active':active == 'Infinite'}" @click="change_time('Infinite')">不限时间<div v-show="active == 'Infinite'" class="checked"><img src="./../assets/img/icon_checked@2x.png" alt=""></div></span>
          <span :class="{'btn-active':active == 'work'}" @click="change_time('work')">仅工作日<div v-show="active == 'work'" class="checked"><img src="./../assets/img/icon_checked@2x.png" alt=""></div></span>
          <span :class="{'btn-active':active == 'weekend'}" @click="change_time('weekend')">周末/节假日<div v-show="active == 'weekend'" class="checked"><img src="./../assets/img/icon_checked@2x.png" alt=""></div></span>
        </div>
      </div>
      <div class="submit">
        <footer-btn title="确认" @submit="go"></footer-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {
  setScroll
} from '../../../assets/js/common'
import headerBar from '../../../components/header-bar.vue'
import footerBtn from '../../../components/submit-btn.vue'
import { XAddress } from 'vux'
import addressList from '../../../assets/js/address'
import eventHub from '@/assets/js/eventhub'
export default {
  data: () => ({
    active: 'Infinite',
    name: 'ceshi',
    tel: '123',
    addr: [],
    addressList,
    detailed_address: '南部商务区国骅大厦12b04'
  }),
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  methods: {
    setDefaultAddress(boolean) {
      if (boolean) {
        if (this.user.user_address_code.length === 0) {
          this.user.user_address_code = ['11', '1101', '110101']
          return
        }
        for (let i = 0; i < this.user.user_address_code.length; i++) {
          if (this.user.user_address_code[i] === null) {
            switch (i) {
              case 0:
                this.user.user_address_code[i] = '11'
                break
              case 1:
                this.user.user_address_code[i] = '1101'
                break
              case 3:
                this.user.user_address_code[i] = '110101'
                break
            }
          }
        }
      }
    },
    change_time(i) {
      this.active = i
    },
    go() {
      this.$router.go(-1)
      eventHub.$emit('backword')
    }
  },
  components: {
    headerBar,
    footerBtn,
    XAddress
  }
}
</script>

<style type="text/css" lang='scss'>
  .address {
      position: relative;
      width: 100%;
      // margin-left: -2rem;
      & label{
        width: 160px !important;
        color: #a7a7a7;
      }
      .weui-cell .vux-cell-primary{
        padding-left: 200px !important;
      }
      .weui-cell__hd{
        padding-left: 40px !important;
      }
      .vux-popup-picker-select{
        padding-bottom: 100px;
        &>span{
          position: absolute;
          top: 50%;
          right: 65px;
          height: 100%;
          margin-top: -50px;
          line-height: 100px;
          align-item: center;
          vertical-align: middle;
        }
        // padding-left: 20px;
        // width: auto;
        // padding-left: 180px;
      }
    }
    :after {
      top: 40px !important;
    }
</style>
<style lang='scss' scoped>
.btn-active {
  border-color: #FF8C56 !important;
}
.my-div{
  background: #eee;
}
.container {
  font-size: 28px;
  padding-top: 96px;
  background-color: #eee;
  .form {
    background: #FFF;
    // padding-left: 2rem;
    .address {
      position: relative;
      // margin-left: -2rem;
    }
    .address::after {
      content: '';
      display: inline-block;
      width: 18px;
      height: 18px;
      border-top: 2px solid #ccc;
      border-right: 2px solid #ccc;
      transform: rotate(45deg);
      margin-left: 20px;
      position: absolute;
      top: 44px;
      right: 2rem;
    }
    .user {
      width: 100%;
      line-height: 120px;
      height: 120px;
      border-bottom: 1px solid #e5e5e5;
      & span{
        display: inline-block;
        width: 160px;
        float: left;

      }

    }
    .tel {
      width: 100%;
      line-height: 120px;
      height: 120px;
      border-bottom: 1px solid #e5e5e5;
      & span{
        display: inline-block;
        width: 160px;
        float: left;

      }

    }
    .detailed-address {
      width: 100%;
      border-top: 1px solid #E5E5E5;
      background: #FFF;
      margin-top: 1px;
      padding-bottom: 10px;
      padding-left: 40px;
      display: inline-flex;
      align-items: center;
      // padding-left: 2rem;
      span {
        display: inline-flex;
        width: 100%;
        height: 120px;
        border: none;
        font-size: 28px;
        align-items: center;
      }
    }
    .addressTitle{
      float: left;
      margin-left: 40px;
      display: inline-block;
      // padding-left: 2rem;
      &>span{
        color: #a7a7a7;
      }
    }
    .addressdetail{
      display: inline-block;
      // padding-left: 200px;
    }
  }
  .delivery-time {
    background: #FFF;
    margin-top: 20px;
    overflow: hidden;
    .fl {
      width: 25%;
      text-indent: 2rem;
      float: left;
      font-size: 28px;
      color: #212121;
      margin-top: 60px;
    }
    .fr {
      width: 75%;
      float: right;
      padding-top: 16px;
      padding-bottom: 22px;
      font-size: 24px;
      padding-right: 2rem;
      padding-top: 2.5rem;
      span {
        display: inline-flex;
        position: relative;
        width: 40%;
        height: 72px;
        text-align: center;
        border: 1px solid #e5e5e5;
        color: #212121;
        margin-bottom: 24px;
        border-radius: 10px;
        margin-left: 36px;
        overflow: hidden;
        align-items: center;
        justify-content: center;
      }      
      // span {
      //   display: inline-block;
      //   width: 220px;
      //   padding: 18px 30px;
      //   font-size: 28px;
      //   color: #212121;
      //   border: 2px solid #E5E5E5;
      //   border-radius: 6px;
      //   margin-top: 24px;
      //   margin-left: 36px;
      //   text-align: center;
      // }
    }
  }
  .submit {
    margin-top: 56px;
    width: 100%;
    background: transparent;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    box-sizing: border-box;
    div {
      max-height: 90px;
      border: 1px solid transparent;
    }
  }
  .checked{
    position: absolute;
    right:0;
    bottom:-1px;
    width: 49px;
    height: 34px;
    z-index: 11;
    text-indent: 0;
    img{
      width: 100%;
    }
  }
}
</style>
