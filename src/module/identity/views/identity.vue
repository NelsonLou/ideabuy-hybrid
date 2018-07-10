<template>
  <div class="my-div" name="myDiv">
    <div class="header-bar">
      <header-bar title="完善信息"
                  :back-to-app="true">
        <div class="header-operation"
             @click="saveInfo">
          保存
        </div>
      </header-bar>
    </div>
    <div class="container">
      <div class="header">
        <div class="photo"
             :style="user.user_portrait?'background-image:url('+user.user_portrait+')':''"
             @click="changePhoto">
          <span class="icon icon-avatar"
                v-if="!user.user_portrait"></span>
        </div>
        <div class="text" @click="changePhoto">
          点击修改头像
        </div>
      </div>
      <div class="body">
        <div class="group">
          <div class="label">姓名</div>
          <div class="text">{{user.real_name}}
          </div>
        </div>
        <div class="group">
          <div class="label">身份证</div>
          <div class="text">{{user.user_idcard}}
          </div>
        </div>
        <div class="group">
          <div class="label">手机</div>
          <div class="text">
            {{user.user_mobile}}
          </div>
          <div class="right"
               style="color:#ff8c56;display:none"
               @click="changeMobile">绑定其他手机号
          </div>
        </div>
        <div class="group">
          <x-address
            v-model="user.user_address_code"
            :list="addressList" title="所在地区"
            ref="address"
            @on-hide="setDefaultAddress"
            value-text-align="left"
            placeholder="请选择所在地区"></x-address>
          <div class="right"><span
            class="icon icon-arrow-right"></span>
          </div>
        </div>
        <div class="group">
          <div class="label">详细地址</div>
          <div class="text"><input type="text"
                                   placeholder="请输入详细地址"
                                   v-model="user.user_address">
          </div>
        </div>
        <div class="group" @click="eduShow=true">
          <div class="label">学历</div>
          <div class="text"
               :class="{gray:user.user_education.length==0}">
            {{user.user_education.length==0?'请选择':user.user_education[0]}}
          </div>
          <div class="right"><span
            class="icon icon-arrow-right"></span>
          </div>
        </div>
        <div class="group">
          <div class="label">职业</div>
          <div class="text"><input type="text"
                                   placeholder="请输入职业"
                                   v-model="user.user_profession">
          </div>
        </div>
        <div class="group">
          <div class="label">公司</div>
          <div class="text"><input type="text"
                                   placeholder="请输入公司名称"
                                   v-model="user.user_company">
          </div>
        </div>
        <div class="group"
             @click="moneyShow=true">
          <div class="label">月收入</div>
          <div class="text"
               :class="{gray:user.user_income.length==0}">
            {{user.user_income.length==0?'请选择':user.user_income[0]}}
          </div>
          <div class="right"><span
            class="icon icon-arrow-right"></span>
          </div>
        </div>
        <div class="group">
          <div class="label">QQ号</div>
          <div class="text"><input type="text"
                                   placeholder="请输入QQ号"
                                   v-model="user.user_qq">
          </div>
        </div>
        <div class="group">
          <div class="label">Email</div>
          <div class="text"><input type="text"
                                   placeholder="请输入Email"
                                   v-model="user.user_email">
          </div>
        </div>
      </div>
      <div class="footer">
        个人信息越完整，授信额度越高！请及时完善个人信息。
      </div>
    </div>
    <popup-picker :show="eduShow"
                  :data="educationArr"
                  v-model="user.user_education"
                  :show-cell="false"
                  @on-hide="setDefaultEdu"></popup-picker>
    <popup-picker :show="moneyShow"
                  :data="moneyArr"
                  v-model="user.user_income"
                  :show-cell="false"
                  @on-hide="moneyShow=false"></popup-picker>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  input {
    /*border:0.5px solid #ddd;*/
    padding-left: 0;
  }

  .header-operation {
    padding-right: 2rem;
    color: #999;
    font-size: 28px;
  }

  .container {
    padding-top: 96px;
    width: 100vw;
    min-height: 100vh;
    .header {
      background: #fff;
      text-align: center;
      padding: 2.3rem 0;
      .photo {
        image-orientation: flip;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin: 0 auto;
        background-color: #eee;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        .icon {
          font-size: 88px;
          color: #ff8c56;
        }
      }
      .text {
        font-size: 28px;
        color: #999;
        margin-top: 1rem;
      }
    }
    .body {
      margin-top: 1rem;
      background: #fff;
      .group {
        border-bottom: 1px solid #ddd;
        font-size: 28px;
        color: #212121;
        position: relative;
        &:last-child {
          border-bottom: none;
        }
        .label {
          position: absolute;
          top: 0;
          left: 0;
          padding-left: 2rem;
          line-height: 100px;
        }
        .text {
          padding-left: 10rem;
          padding-right: 2rem;
          height: 100px;
          line-height: 100px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          input {
            /*line-height: 4.9rem;*/
            width: 100%;
          }
          &.gray {
            color: #ddd;
          }
        }
        .right {
          position: absolute;
          top: 0;
          right: 2rem;
          line-height: 100px;
          font-size: 24px;
          .icon {
            color: #ddd;
          }
        }
      }
    }
    .footer {
      padding-left: 2rem;
      color: #999;
      font-size: 24px;
      line-height: 60px;
    }
  }
</style>
<script type="es6">
  import headerBar from '../../../components/header-bar.vue'
  import {
    XAddress,
    PopupPicker
  } from 'vux'
  import addressList from '../../../assets/js/address'
  import {
    setScroll,
    setupWebViewJavascriptBridge,
    getToken
  } from '../../../assets/js/common'
  import eventhub from '../../../assets/js/eventhub'
  export default {
    data() {
      return {
        rules: [{
          key: 'user_address',
          str_length: 50,
          msg: '详细地址长度不能超过50个字'
        }, {
          key: 'user_profession',
          str_length: 50,
          msg: '职业长度不能超过50个字'
        }, {
          key: 'user_company',
          str_length: 50,
          msg: '公司长度不能超过50个字'
        }, {
          key: 'user_qq',
          str_length: 20,
          msg: 'qq号不能超过20位'
        }, {
          key: 'user_email',
          str_length: 50,
          msg: '邮箱不符合规范'
        }],
        addressList: addressList,
        value: [],
        eduShow: false,
        education: [],
        educationArr: [
          [
            '小学',
            '初中',
            '高中/职高',
            '专科',
            '本科',
            '硕士',
            '博士'
          ]
        ],
        moneyShow: false,
        money: [],
        moneyArr: [
          [
            '3000~5000',
            '5000~8000',
            '8000~10000',
            '10000~15000',
            '150000~20000',
            '30000以上'
          ]
        ],
        user_address_code: ['33', '3303', '330283'],
        user: {
          real_name: '',
          user_address: '',
          user_address_code: [],
          user_company: '',
          user_education: [],
          user_email: '',
          user_idcard: '',
          user_income: [],
          user_mobile: '',
          user_portrait: '',
          user_profession: '',
          user_qq: ''
        }
      }
    },
    methods: {
      saveInfo() {
        for (let i = 0; i < this.rules.length; i++) {
          if (this.user[this.rules[i].key].length > this.rules[i].str_length) {
            this.$vux.alert.show({
              title: '提示',
              content: this.rules[i].msg
            })
            return
          }
        }
        this.axios.post('/userinfo-add', {
          user_portrait: this.user.user_portrait.replace(this.imgBaseUrl, ''),
          user_education: this.user.user_education[0],
          user_profession: this.user.user_profession,
          user_income: this.user.user_income[0],
          user_company: this.user.user_company,
          user_qq: this.user.user_qq,
          user_email: this.user.user_email,
          address: this.user.user_address,
          province: this.user.user_address_code[0],
          city: this.user.user_address_code[1],
          district: this.user.user_address_code[2]
        }).then(res => {
          if (res) {
            setupWebViewJavascriptBridge((bridge) => {
              bridge.callHandler('WKJSBridge_refreshUserInfo', {}, () => {
              })
            })
            this.$vux.alert.show({
              title: '提示',
              content: '保存信息成功'
            })
          }
        })
      },
      show() {
        console.log(addressList)
      },
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
      setDefaultEdu() {
        this.eduShow = false
        //        if (boolean) {
        //          if (this.user.user_education.length === 0) {
        //            this.user.user_education[0] = this.educationArr[0]
        //          }
        //        }
      },
      changeMobile() {
        this.$router.push(`/identity/change-mobile?photo=${this.user.user_portrait}`)
      },
      changePhoto() {
        setupWebViewJavascriptBridge((bridge) => {
          bridge.callHandler('WKJSBridge_fetchImage', {}, (res) => {
            if (typeof res === 'string') {
              res = JSON.parse(res)
            }
            if (res.code === '0') {
              this.$vux.alert.show({
                title: '提示',
                content: '照片上传失败'
              })
            } else {
              this.user.user_portrait = this.imgBaseUrl + res.imgURL
            }
          })
        })
      },
      getBase64Image (img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        console.log(img)
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
        console.log(canvas)
        var dataURL = canvas.toDataURL("image/jpeg");
        return dataURL;
      }
    },
    mounted() {
      setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler('WKJSBridge_hideNavigationBar', {}, () => {
        })
      })
      getToken().then(() => {
        this.$store.commit('loading_setDelay', true)
        this.axios.get('/userinfo-detail').then(res => {
          if (res) {
            for (let key in this.user) {
              if (res.data.user[key]) {
                this.user[key] = res.data.user[key]
              }
            }
            let me = this
            let myImg = new Image()
            myImg.src = me.user.user_portrait
            let aaa = this.getBase64Image(myImg)
            console.log(aaa)
//            this.axios.get(this.user.user_portrait + '?x-oss-process=image/info').then(res => {
//              console.log(res)
//            })
//            let xhttp = new XMLHttpRequest()
//            xhttp.open('GET', this.user.user_portrait + '?x-oss-process=image/info')
//            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
//            xhttp.send()
//            xhttp.onreadystatechange = function () {
//              if (xhttp.readyState === 4 && xhttp.status === 200) {
////                console.log(xhttp.responseText)
////                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//                console.log(111)
//              }
//            }
          }
        })
      })
      eventhub.$on('identity-change-mobile', (phone) => {
        this.user.user_mobile = phone
      })
    },
    beforeRouteLeave(to, from, next) {
      setScroll()
      next()
    },
    components: {
      headerBar,
      XAddress,
      PopupPicker
    }
  }
</script>
