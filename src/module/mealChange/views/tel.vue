<template>
    <div class="my-div" name="myDiv">
        <div class="header-bar">
            <header-bar title="号码校验" :back-to-web="true"></header-bar>
        </div>
        <div class="container">
            <div class="tel">
                <div class="tel-address">
                    <x-address v-model="addr" :list="addressList" title="号码归属地" ref="address" @on-hide="setDefaultAddress" value-text-align="left" placeholder="请选择所在地区"></x-address>
                </div>
                <div class="tel-number">
                    <input type="number" v-model="tel" placeholder="请输入手机号">
                </div>
                <div class="tel-message">
                    <input type="number" v-model="msg" placeholder="请输入短信验证码">
                    <span @click="dxmsg">获取</span>
                </div>
            </div>
            <div class="submit">
                <footer-btn title="提交校验" @submit="go"></footer-btn>
            </div>
        </div>
    </div>
</template>

<script>
import {
    setScroll
} from '../../../assets/js/common'
import eventhub from '@/assets/js/eventhub'
import headerBar from '../../../components/header-bar.vue'
import footerBtn from '../../../components/submit-btn.vue'
import { XAddress } from 'vux'
import addressList from '../../../assets/js/address'
export default {
    data: () => ({
        addr: [],
        tel: '',
        msg: '',
        addressList: addressList,
        user: {
            user_address_code: []
        }
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
        go() {
            if (!this.addr[0]) {
                this.$vux.alert.show({
                    title: '提示',
                    content: '请填写号码归属地'
                })
                return false
            }
            if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.tel))) {
                this.$vux.alert.show({
                    title: '提示',
                    content: '请填写正确的手机号码'
                })
                return false
            }
            if (this.msg === '') {
                this.$vux.alert.show({
                    title: '提示',
                    content: '请填写短信验证码'
                })
                return false
            } else {
                this.$store.state.tel = this.tel
                this.$router.go(-1)
                eventhub.$emit('backword')
            }
        },
        dxmsg() {
            this.msg = ''
            for (var i = 0; i < 6; i++) {
                this.msg += Math.floor(Math.random() * 10)
            }
        }
    },
    components: {
        headerBar,
        footerBtn,
        XAddress
    }
}
</script>

<style lang='scss'>
.container {
    padding-top: 96px;
    width: 100vw;
    min-height: 100vh;
    .tel {
        background: #FFF;
        padding-left: 2rem;
        .tel-address {
            width: 100%;
            border-bottom: 1px solid #E5E5E5;
            background: #FFF;
            padding-top: 10px;
            padding-bottom: 10px;
        }
        .tel-number {
            width: 100%;
            border-bottom: 1px solid #E5E5E5;
            background: #FFF;
            margin-top: 1px;
            input {
                width: 100%;
                height: 120px;
                border: none;
                font-size: 30px;
            }
        }
        .tel-message {
            width: 100%;
            background: #FFF;
            margin-top: 1px;
            display: flex;
            align-items: center;
            input {
                width: 78%;
                height: 120px;
                font-size: 30px;
            }
            span {
                display: inline-flex;
                width: 152px;
                font-size: 30px;
                justify-content: center;
                height: 88px;
                border-left: 1px solid #E5E5E5;
                align-items: center;
            }
        }
    }
    .submit {
        margin-top: 1rem;
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
    .weui-cell__hd {
        padding-left: 0;
    }
}
</style>
