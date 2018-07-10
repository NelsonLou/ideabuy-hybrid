<template>
<div class="my-div" name="myDiv">
  <div class="header-bar">
    <header-bar title="手机购买" :back-to-app="true"></header-bar>
  </div>
  <div class="container">
    <div class="category">
      <span :class="{catebutton:true,'tagActive':sortTags===1}" @click="getSortSell">销量<i :class="{'triangle-down':true,'activedown':sortTags===1}"></i></span>
      <span class="catebutton" @click="getSortPrice" :style="sortTags===2 || sortTags ===3?'color:#FF8C56':''">资费<span style=""><i :class="{'triangle-up':true,'activeup':sortTags===2}"></i><i :class="{'triangle-down':true,'activedown':sortTags===3}"></i></span></span>
      <span :class="{catebutton:true,'tagActive':sortTags===4}" @click="getType">品牌<i :class="{'triangle-down':true,'activedown':sortTags===4}" ></i></span>
    </div>
    <div class="main">
      <div class="goodslist" v-show="this.goodList.length">
        <div class="goods-item" v-for="(item,index) in goodList" :key="index" @click="goToDetail(item.id)">
          <div class="img" :style="'backgroundImage:url('+item.img+')'"><span :class="{special:item.special !== ''}">{{item.special}}</span></div>
          <div class="goodinfo">
            <p class="title">{{item.name}}</p>
            <div class="price">
              ￥<span>{{item.price}}</span>
            </div>
            <div class="tips"><span v-for="(tip,it) in item.tips">{{tip.name}}</span></div>
          </div>
        </div>
      </div>
      <div class="emptyList" v-show="this.goodList.length === 0">
        暂无任何信息
      </div>
    </div>

    <div class="typebox" v-if="showtype">
      <div>
        <span class="type" v-for="(item,index) in typelist" :style="index === activeTypeIndex?'color:#FF8C56':''" :key="index" @click="showlist(index)">{{item.name}}</span>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped lang="scss">
* {
    font-size: 28px;
    font-family: "Microsoft YaHei";
}
@mixin table_cell($height) {
    display: table-cell;
    width: 1%;
    text-align: center;
    height: $height;
    line-height: $height;
}
.my-div {
    background-color: #eee;
}
.container {
    background-color: #eee;
    padding-top: 96px;
    width: 100vw;
    min-height: 100vh;
    .category {
        background-color: #fff;
        border-bottom: 1px solid #e5e5e5;
        position: fixed;
        width: 100%;
        z-index: 5;
        .catebutton {
            @include table-cell(88px);
            font-size: 1.4rem;
            border-right: 1px solid #e5e5e5;
            font-size: 28px;
            & i {
                margin-left: 14px;
                color: #ababab;
                font-size: 14px;
            }
            & > span {
                display: inline-block;
                vertical-align: middle;
                margin-top: -12px;
                i {
                    display: block;
                    margin: 6px 0 0.5px 19px;
                    color: #ababab;
                    font-size: 14px;
                }
            }
        }
        .catebutton:last-child {
            border: none;
        }
        .tagActive {
            color: #FF8C56;
            & i {
                color: #FF8C56;
            }
        }
    }

    .main {
        margin-top: 1rem;
        background-color: #eee;
        padding-top: 89px;
        .emptyList {
            height: 15rem;
            width: 100%;
            line-height: 15rem;
            text-align: center;
            font-size: 32px;
            background-color: #fff;
        }
        .goodslist {
          background-color: #fff;
            .goods-item {
                padding: 24px 0;
                position: relative;
                margin-left: 35px;
                width: calc(100% -35px);
                border-bottom: 1px solid #e5e5e5;
                .img {
                    display: inline-block;
                    position: relative;
                    height: 181px;
                    width: 181px;
                    background-size: cover;
                    vertical-align: middle;
                    .special {
                        position: absolute;
                        bottom: 0;
                        display: inline-block;
                        width: 100%;
                        font-size: 24px;
                        color: #fff;
                        background-color: #E73C24;
                        padding: 5px;
                        text-align: center;
                    }
                }
                .goodinfo {
                    display: inline-block;
                    margin-left: 39px;
                    width: calc(100% - 260px);
                    vertical-align: top;
                    .title {
                        margin: 0;
                    }
                    .price {
                        position: absolute;
                        bottom: 24px;
                        color: #F65A44;
                        font-size: 24px;
                        & span {
                            font-size: 36px;
                        }
                    }
                    .tips {
                        position: absolute;
                        bottom: 24px;
                        right: 26px;
                        & span {
                            font-size: 23px;
                            color: #fff;
                            background-color: #378ED7;
                            padding: 4px;
                            border-radius: 5px;
                        }
                    }
                }
            }
            .goods-item:last-child {
                border: none;
            }
        }
    }

    .typebox {
        position: absolute;
        top: 178px;
        width: 100%;
        background-color: #fff;
        border-bottom: 1px solid #e7e7e7;
        border-top: 1px solid #e7e7e7;
        & > div {
            padding: 26px;
        }
        .type {
            display: inline-block;
            width: 25%;
            text-align: center;
            line-height: 50px;
        }
    }
    .activeup{
      border-bottom: 10px solid #FF8C56 !important;
    }    
    .activedown{
      border-top: 10px solid #FF8C56 !important;
    }
    .triangle-up {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #999;
        display: inline-block;
    }
    .triangle-down {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #999;
        display: inline-block;
    }

}
</style>
<script>
import {
  setScroll
} from '../../../assets/js/common'
import headerBar from '../../../components/header-bar.vue'
// import data from './../data/buyphone'
export default {
  data() {
    return {
      goodList: [],
      typelist: [],
      sortIndex: 0,
      sellIndex: 0,
      typeIndex: 0,
      activeTypeIndex: 0,
      goodslength: true, // 商品列表空时显示内容
      showtype: false, // 类型下拉框
      sortTags: 0, // sortags
      tempgoodlist: []
    }
  },
  beforeRouteLeave(to, from, next) {
    setScroll()
    next()
  },
  components: {
    headerBar
  },
  activated() {
    this.$store.state.selectParams.price = ''
    this.$store.state.selectParams.typelist = ''
    this.$store.state.clearStatus = true
    this.sortTags = 0
    this.showtype = false
    this.getList()
  },
  methods: {
    // 获取商品列表
    getList() {
      let that = this
      this.axios.get('goodslist')
        .then(res => {
          that.goodList = res.data.list
          that.tempgoodlist = res.data.list
          that.typelist = res.data.type
        }).catch(res => {

        })
    },
    // 详情页
    goToDetail(index) {
      this.$router.push({
        path: '/buyPhone/good-detail',
        query: {
          id: index
        }
      })
    },
    // 按照销量排序
    getSortSell() {
      let that = this
      let list = that.goodList
      that.showtype = false
      that.typeIndex = 0
      that.sortTags = 1
      that.sellIndex++
        this.sortIndex = 0
      if (that.sellIndex % 2 === 0) {
        list.sort((x, y) => {
          return x['sellnum'] - y['sellnum']
        })
      } else {
        list.sort((x, y) => {
          return y['sellnum'] - x['sellnum']
        })
      }
    },
    // 按照价格排序
    getSortPrice() {
      let that = this
      let list = that.goodList
      that.showtype = false
      that.typeIndex = 0
      that.sortIndex++
        this.sellIndex = 0
      if (that.sortIndex % 2 === 0) {
        that.sortTags = 2
        list.sort((x, y) => {
          return x['price'] - y['price']
        })
      } else {
        that.sortTags = 3
        list.sort((x, y) => {
          return y['price'] - x['price']
        })
      }
    },
    // 获取手机型号
    getType() {
      let that = this
      that.sortTags = 4
      that.typeIndex++
        if (that.typeIndex % 2 === 0) {
          that.showtype = false
        } else {
          that.showtype = true
        }
    },
    // 筛选列表
    showlist(index) {
      let that = this
      let typelist = that.typelist
      let list = that.tempgoodlist
      let typeName = typelist[index]['name']
      that.activeTypeIndex = index
      let newlist = list.filter(g => {
        if (g.type.indexOf(typeName) === -1) {
          return false
        }
        return g
      })
      that.goodList = newlist
      if (typeName === '全部') {
        that.goodList = list
      }
      that.showtype = false
      that.typeIndex = 0
    }
  }
}
</script>
