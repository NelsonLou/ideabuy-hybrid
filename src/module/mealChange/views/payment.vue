<template>
    <div class="my-div" name="myDiv">
        <div class="header-bar">
            <header-bar title="确认支付" :back-to-web="true"></header-bar>
        </div>
        <div class="container">
            <div class="list">
                <div class="shop-name">
                    <span class="title">商品名称:</span>
                    <span>中国联通套餐更换</span>
                </div>
                <div class="shop-describe">
                    <span class="title">商品描述:</span>
                    <span>{{ price }}元套餐</span>
                </div>
                <div class="total">
                    <span class="title">总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 价:</span>
                    <span>{{ meal+price }}元</span>
                </div>
            </div>
            <div class="pay-title">
                <p>请选择支付方式</p>
            </div>
            <div class="pay">
                <div class="btpay" @click="payType('btpay')">
                    <img src="../../../assets/img/cxlogo.png" alt="">
                    <!-- <span class="icon-global"></span> -->
                    <div>
                        <p class="title">畅想购白条支付</p>
                        <span class="icon-fire"></span>
                        <span class="icon-favourable"></span>
                        <p class="title-bottom">10秒获取额度，最长12期免息</p>
                    </div>
                    <span :class="[{ 'btn-active':changePay === 'btpay'}, 'btn']"></span>
                </div>
                <div class="wxpay" @click="payType('wxpay')">
                    <span class="icon icon-wechat"></span>
                    <div>
                        <p class="title">微信支付</p>
                        <p>仅支持微信4.2及以上版本</p>
                    </div>
                    <span :class="[{ 'btn-active':changePay === 'wxpay'}, 'btn']"></span>
                </div>
                <div class="alipay" @click="payType('alipay')">
                    <span class="icon icon-alipay"></span>
                    <div>
                        <p class="title">支付宝钱包支付</p>
                        <p>推荐支付宝用户使用</p>
                    </div>
                    <span :class="[{ 'btn-active':changePay === 'alipay'}, 'btn']"></span>
                </div>
            </div>
            <div class="submit">
                <footer-btn title="确认支付" @submit="pay"></footer-btn>
            </div>
        </div>
    </div>
</template>

<script>
import eventhub from '../../../assets/js/eventhub'
import {
    setScroll
} from '../../../assets/js/common'
import {
    mapState
} from 'vuex'
import headerBar from '../../../components/header-bar.vue'
import footerBtn from '../../../components/submit-btn.vue'
export default {
    data: () => ({
        changePay: 'btpay'
    }),
    beforeRouteLeave(to, from, next) {
        setScroll()
        next()
    },
    computed: {
        ...mapState({
            meal: state => state.meal,
            price: state => state.price
        })
    },
    methods: {
        payType(i) {
            this.changePay = i
        },
        pay() {
            var _this = this
            this.$vux.confirm.show({
                content: `<div>确认支付？</div>`,
                cancelText: '取消',
                confirmText: '确定',
                onConfirm() {
                    _this.$vux.alert.show({
                        title: '支付结果',
                        content: '支付成功 (测试)'
                    })
                    _this.$router.go(-1)
                    eventhub.$emit('backword')
                }
            })
        }
    },
    components: {
        headerBar,
        footerBtn
    }
}
</script>

<style lang='scss' scoped>
.container {
    padding-top: 96px;
    width: 100vw;
    min-height: 100vh;
    .list {
        background: #FFF;
    }
    div {
        padding-left: 1rem;
        .shop-name {
            width: 100%;
            height: 100px;
            border-bottom: 1px solid #E5E5E5;
            font-size: 28px;
            display: inline-flex;
            align-items: center;
            .title {
                color: #999999;
                margin-right: 30px;
                font-weight: normal;
            }
            span {
                color: #212121;
            }
        }
        .shop-describe {
            width: 100%;
            height: 100px;
            border-bottom: 1px solid #E5E5E5;
            font-size: 28px;
            display: inline-flex;
            align-items: center;
            .title {
                color: #999999;
                margin-right: 30px;
                font-weight: normal;
            }
            span {
                color: #212121;
            }
        }
        .total {
            width: 100%;
            height: 100px;


            font-size: 28px;
            display: inline-flex;
            align-items: center;
            .title {
                color: #999999;
                margin-right: 30px;
                font-weight: normal;
            }
            span {
                color: #FF8C56;
            }
        }
    }
    .pay-title {
        background: #EEE;
        color: #999;
        font-size: 28px;
        text-indent: 1rem;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .pay {
        background: #FFF;
        .alipay {
            position: relative;
            border-bottom: 1px solid #E5E5E5;
            display: flex;
            align-items: center;
            .icon {
                font-size: 58px;
                color: #19A0E5;
            }
            div {
                display: inline-block;
                margin-left: 30px;
                line-height: 0.6rem;
                .title {
                    font-size: 30px;
                    color: #212121;
                }
                p {
                    color: #999;
                    font-size: 28px;
                }
            }
            .btn {
                display: inline-block;
                width: 38px;
                height: 38px;
                border: 1px solid #E5E5E5;
                border-radius: 100px;
                position: absolute;
                right: 2rem;
                top: 50%;
                margin-top: -20px;
            }
        }
        .wxpay {
            position: relative;
            border-bottom: 1px solid #E5E5E5;
            display: flex;
            align-items: center;
            .icon {
                font-size: 58px;
                color: #41B035;
            }
            div {
                display: inline-block;
                margin-left: 30px;
                line-height: 0.6rem;
                .title {
                    font-size: 30px;
                    color: #212121;
                }
                p {
                    color: #999;
                    font-size: 28px;
                }
            }
            .btn {
                display: inline-block;
                width: 38px;
                height: 38px;
                border: 1px solid #E5E5E5;
                border-radius: 100px;
                position: absolute;
                right: 2rem;
                top: 35%;
            }
        }
        .btpay {
            position: relative;
            border-bottom: 1px solid #E5E5E5;
            display: flex;
            align-items: center;
            .icon {
                font-size: 58px;
            }
            div {
                display: inline-block;
                margin-left: 30px;
                line-height: 0.6rem;
                .title {
                    display: inline-block;
                    font-size: 30px;
                    color: #212121;
                }
                span {
                    font-size: 32px;
                    margin-left: 12px;
                }
                p {
                    color: #999;
                    font-size: 28px;
                }
                .title-bottom {
                    margin-top: 0;
                }
            }
            .btn {
                display: inline-block;
                width: 38px;
                height: 38px;
                border: 1px solid #E5E5E5;
                border-radius: 100px;
                position: absolute;
                right: 2rem;
                top: 35%;
            }
            img {
                width: 58px;
                height: 58px;
            }
            .icon-global {
                font-size: 58px;
            }
        }
    }
    .btn-active {
        display: inline-block;
        width: 38px;
        height: 38px;
        background: #ff8c56;
        border-radius: 100px;
        position: absolute;
        right: 2rem;
    }
    .btn-active::after {
        content: '';
        display: inline-block;
        width: 23px;
        height: 14px;
        border-top: 3px solid #FFF;
        border-right: 3px solid #FFF;
        transform: rotate(135deg);
        position: absolute;
        top: 8px;
        left: 6px;
    }
    .submit {
        position: fixed;
        bottom: 0;
        background: #FFF;
    }
}

.icon-fire {
    color: #FF9A00;
}

.icon-favourable {
    color: #F35719;
}
</style>
