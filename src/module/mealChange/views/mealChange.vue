<template>
    <div class="my-div" name="myDiv">
        <div class="header-bar">
            <header-bar title="优惠套餐" :back-to-app="true"></header-bar>
        </div>
        <div class="container">
            <div class="bar">
                <ul>
                    <li :class="{active:active == 'xl'}" @click="toggle('xl')">销量
                        <span></span>
                    </li>
                    <li :class="{active:active == 'zf'}" @click="toggle('zf')">资费
                        <span :class="[{'icon-top-active':sort === 'big'}, 'icon-top']"></span>
                        <span :class="[{'icon-bottom-active':sort === 'small'}, 'icon-bottom']"></span>
                    </li>
                    <li @click="alertMeal('type')" :class="{active:active == 'type'}">类型
                        <span></span>
                        <div class="alert-meal" v-if="alert">
                            <div class="top"></div>
                            <div class="content">
                                <p @click="type_change('new')" :class="{active:active_text === 'new' }">新品上市</p>
                                <p @click="type_change('whole')" :class="{active:active_text === 'whole' }">全国套餐</p>
                                <p @click="type_change('one')" :class="{active:active_text === 'one' }">流量日租</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="meal-list">
                <ul>
                    <li v-for="(item,index) in meal_list" :key="index" @click="go(item['package_id'])">
                        <div class="pic" :style="'background-image:url(' + item.packge_img + ')'">
                        </div>
                        <div class="content">
                            <p class="title">{{ item['package_name'] }}</p>
                            <div>
                                <span>￥</span>
                                <span class="money">{{ item['package_price'] }}</span>
                                <span class="give icon-give" v-if="item['packge_give'] == 1"></span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="text">暂无更多套餐</div>
        </div>
    </div>
</template>

<script>
import {
    setScroll,
    setupWebViewJavascriptBridge
} from '../../../assets/js/common'
import headerBar from '../../../components/header-bar.vue'
// import dialog from '../../../components/dialog.vue'
export default {
    data: () => ({
        active: 'xl',
        meal_list: [],
        alert: false,
        sort: 'big',
        dataList: [],
        active_text: 'new'
    }),
    beforeRouteLeave(to, from, next) {
        setScroll()
        next()
    },
    mounted() {
        this.handleAdManage()
        setupWebViewJavascriptBridge((bridge) => {
            bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {
            })
        })
    },
    methods: {
        handleAdManage() {
            this.axios.post('requestPackge').then(res => {
                var arr = []
                this.meal_list = res.data
                for (var i = 0; i < res.data.length; i++) {
                    arr.push(res.data[i])
                }
                this.dataList = arr
            }).catch(error => {
                console.log(error)
            })
        },
        toggle(i) {
            this.active = i
            this.alert = false
            if (i === 'xl') {
                this.meal_list = this.dataList
            }
            if (i === 'zf' && this.sort === 'big') {
                this.meal_list.sort((a, b) => {
                    var val1 = a['package_price']
                    var val2 = b['package_price']
                    return val1 - val2
                })
                this.sort = 'small'
                return false
            }
            if (i === 'zf' && this.sort === 'small') {
                this.meal_list.sort((a, b) => {
                    var val1 = a['package_price']
                    var val2 = b['package_price']
                    return val2 - val1
                })
                this.sort = 'big'
                return false
            }
        },
        go(id) {
            this.alert = false
            this.$router.push('./mealDetail?id=' + id)
            this.$store.state.meal = ''
            this.$store.state.tel = ''
            this.$store.state.banner = this.meal_list[id]['packge_img']
            this.$store.state.price = this.meal_list[id]['package_price']
            this.$store.state.package_name = this.meal_list[id]['package_name']
        },
        alertMeal(i) {
            this.active = i
            this.alert = !this.alert
        },
        type_change(type) {
            this.active_text = type
            this.meal_list = this.dataList
            var arr = []
            for (var i = 0; i < this.meal_list.length; i++) {
                this.meal_list[i]['type'] === type ? arr.push(this.meal_list[i]) : ''
            }
            this.meal_list = arr
        }
    },
    components: {
        headerBar
//        'v-dialog': dialog
    }
}
</script>

<style lang='scss' scoped>
.active {
    color: #FF865C !important;
    span {
        border-color: #FF865C transparent transparent transparent !important;
    }
    .icon-top {
        border-color: transparent transparent #999 transparent !important;
    }
    .icon-bottom {
        border-color: #999 transparent transparent transparent !important;
    }
    .icon-top-active {
        border-color: transparent transparent #FF865C transparent !important;
        margin-top: -25px !important;
    }
    .icon-bottom-active {
        border-color: #FF865C transparent transparent transparent !important;
        margin-left: -20px !important;
        margin-top: 21px !important;
    }
}

.container {
    padding-top: 76px;
    width: 100vw;
    min-height: 100vh;
    .meal-list {
        background: #FFF;
        margin-top: 120px;
        ul {
            list-style: none;
            li {
                position: relative;
                height: 228px;
                padding-top: 22px;
                border-bottom: 1px solid #e5e5e5;
                .pic {
                    display: inline-block;
                    width: 180px;
                    height: 180px;
                    background: #CCC;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .content {
                    width: 63%;
                    height: 228px;
                    position: absolute;
                    top: 0;
                    right: 2rem;
                    .title {
                        font-size: 28px;
                        color: #212121;
                        line-height: 2rem;
                    }
                    div {
                        margin-top: 10%;
                        color: #F65A45;
                        span {
                            font-size: 24px;
                        }
                        .money {
                            font-size: 38px;
                        }
                        .give {
                            color: #378ED7;
                            float: right;
                            font-size: 36px;
                        }
                    }
                }
            }
        }
    }
}

.alert-meal {
    position: absolute;
    width: 100%;
    z-index: 1;
    right: 0;
    border: 1px solid #E5E5E5;
    background: #FFF;
    top: 105px;
    .content {
        padding-top: 20px;
        padding-bottom: 1px;
        padding-left: 50px;
        padding-right: 50px;
        padding-bottom: 20px;
        padding-right: 4.5rem;
        p {
            display: inline-block;
            width: 24%;
            margin-right: 12px;
            color: #212121;
            font-size: 26px;
            text-align: right;
            line-height: 3rem;
            text-align: right;
        }
        .active {
            color: #FF865C;
        }
    }
}

.container .bar {
    width: 100%;
    height: 88px;
    background: #FFF;
    position: fixed;
    z-index: 100;
    ul {
        list-style: none;
        overflow: hidden;
        margin-left: -2rem;
        background: #FFF;
        li {
            float: left;
            width: 33.3%;
            font-size: 28PX;
            color: #212121;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 88px;
            border-right: 1px solid #e5e5e5;
            span {
                width: 0;
                height: 0;
                border: 10px solid;
                border-color: #999 transparent transparent transparent;
                margin-left: 10px;
                margin-top: 10px;
                display: inline-block;
            }
            .icon-top {
                display: inline-block;
                border-color: transparent transparent #999 transparent;
                margin-top: -25px;
            }
            .icon-bottom {
                display: inline-block;
                margin-left: -20px;
                margin-top: 21px;
            }
        }
    }
}

.text {
    text-align: center;
    color: #999;
    font-size: 28px;
    margin-top: 2rem;
}
</style>
