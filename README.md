# 畅想购移动端

> 畅想购移动端

## 项目仓库

> git@code.aliyun.com:weknet-frontend/ideabuy-hybrid.git

## 目录结构

```bash
├── /build/          # 项目构建(webpack)相关代码
├── /config/         # 项目开发环境配置
├── /src/            # 源码目录
│ ├── /assets/       # 组件公共css、img、js、font
│ ├── /components/   # vue公共组件
│ ├── /mock/         # mock数据接口
│ ├── /module/       # 多页应用多模块入口
│ ├── /router/       # vue-router路由
│ ├── /store/        # vuex状态管理
│ ├── App.vue        # 页面入口文件
│ └── main.js        # 程序入口文件
├── /static/         # 非组件静态资源
├── .babelrc         # ES6语法编译配置
├── .editorconfig    # 定义代码格式
├── .eslintignore    # ES6规范忽略文件
├── .eslintrc.js     # ES6语法规范配置
├── .gitignore       # git忽略文件
├── index.html       # 入口页面
├── package.json     # 项目基本信息
└── README.md        # 项目说明
```

## 安装构建

```bash
# 安装依赖
yarn
# 或
npm install

# 启用热加载到 localhost:8080
npm start
# 或
npm run dev

# 构建最小生产目录
npm run build

# 构建测试目录
npm test
# 或
npm run test
```

## 开发管理

1. 所有 views 组件模板必须都写在以下元素内，否则路由跳转效果会出现问题

  ```html
  <template>
   <div class="my-div" name="myDiv">
     <!-- ... -->
   </div>
  </template>
  ```

2. 路由配置时，注意一级页面，二级页面，三级页面区分：一级页面/xx; 二级页面/xx/xx; 三级页面/xx/xx/xx 否则路由跳转效果会出现问题

3. 所有 views 组件模板必须加上以下脚本，setScroll 从 common.js 里引入

  ```javascript
  import {setScroll} from '@/assets/js/common'
  beforeRouteLeave (to, from, next) {
   setScroll()
   next()
  },
  ```

4. 如果此页面在 created mounted activated 等生命周期钩子内有请求访问 需要延时加载 loading 弹窗，在发请求前加上以下代码

  ```javascript
  this.$store.commit('loading_setDelay', true)
  ```

5. 如果在发请求时不想弹出 loading 弹窗，需要在接口名后面加上

  ```bash
  ?myloading=false
  ```

6. 请求处理 如果 code 为 1 则正常返回，并对返回数据进行操作，否则自动弹出返回的 msg

## 和客户端交互的jsBridge

1. WKJSBridge_getAuth 获取token
2. WKJSBridge_back 返回
3. WKJSBridge_share 分享
4. WKJSBridge_logout 退出
5. WKJSBridge_openPage 新开webview
6. WKJSBridge_hideTabbar 隐藏底部栏
7. WKJSBridge_showTabbar 显示底部栏
8. WKJSBridge_hideNavigationBar 隐藏导航栏
9. WKJSBridge_showNavigationBar 显示导航栏
10. WKJSBridge_webViewFullWindow webview全屏
11. WKJSBridge_webViewResetWindow webview 恢复
12. WKJSBridge_callAlbum 打开相册

13. WKJSBridge_fetchImage 获取相册图片
14. WKJSBridge_repay 还款

## 客户端传参备注

1.添加银行卡和添加常用联系人

##加密
私钥：
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAtSkrgyNayGtKViJ6snAiMujnWrJkBLJe5uOPWiiIU3orDI64
QFzj22V+nqRUQO4mkI1xYQY6GTZySkWjztYsv8TppPe2kB5QoWxUCMloqxlsLpzL
/33qsklzB6wzT1IId3KiU1thBcX+Mfd5XERShXABePhCwX6v3bJ5uzI5yL7WLQoM
7FI2HAvbfcLZZddRCpvgU/J15Yd/3OY8lK2BYK8uUmNh2BIA/EDwXyHU9sQzpsah
tqQq8I6J3BFZ7t0OHLtvzJ7l1XzV0aRgkXN/AukXQXZmA0zMCGIym7kZpezU4Im7
ozajs/SlLHiePPHcyjLfzV3QKTWaPK9kVtduAwIDAQABAoIBAQCL8AFsiyLVLgt9
/aRJsdS4/q+3n5UjC6XDNITHYAfuc7BNQvGQxjA8iWoFoWpzvYKMprWt/OFkGGqw
dJrUaxymBbV1eOPM753ZE5TWNL5lbH3kg7oQ4XMpxRLWGm6IFxXzLtm1CiEoFIkG
j+NvIlecO6jniN4IGZQ/7F2b/HAmX/YmRIgcGX5qN+accMyMhKmzcAF79kPphqng
+hB1lFU31mtLUg2fxMwqILUqp4U7lOe9rh94nkvTLCkK358Vx1MSeEklr9MHXqPZ
vh+TR4L/laSnQUP5KePM+SxkbVqyTwXZJ7li4O6o9azXmpBU0P3jU0lYwEnHhehu
UIMwroQBAoGBAOXt4LNaZo23fCe9DgV2ZnODHsKq9igrRzwubrKXoyXI2701HIF0
Za3gJwnyhOmxZ3AQCewm4aoZv9qzB5CcyaTSBn7BLt0HtQ9TpuITfo64kELrBU5h
uQsCTDyZlRTkTWDt/CRb6STbsGyCl3PIHnqs6zmEN/UKMuT0p4c6YdSZAoGBAMmz
svyFIOypi7u9rNpr9KL9fNkmRr3exNvqe38RPmjNAYt7eER3UnQ1HkXXRPhc2yEG
7hQxRJWgJw6uAscb1WOo1DHx59GBeTxWArTGlA6tQartY+2WBI7n1zVK1GhHE1sl
yBOAxxiGM5r7uSfzhkMamplw6DCF2Vz8qHaCzVz7AoGAUweNpva0JeTmbqs0jwBs
irYEu6Nk9Kh8Nt1FmDRt880OnMq7Gnxf42QYdN0g5grsIWmJS7/WqchWobEYwD3+
CwjU050LQUHxPjGlB+qmPv+jCKc56U4ctj8ELLYBQeQXlTMbZD3UeTzj/qtB6cuQ
Rhh/cOuwEUq3ijpW7NxGS7ECgYAgmhQnLtmIh0sXuGvVDjgHlFN2wfITRIurRDZb
7oyY4fIK+pUQ8/x23hMblNUIE/IzX2xiBSihyrYlcEjwp/YQ2rwZqpEe0v+mmfxr
/eD2kliX6TEKuQHZm220pni4tixRwkSZqmoD88UpmuBtrbYY6JbukEpndWsR1aDh
LvlEuwKBgGO3rT3a0Nf0YEtGlESdJ1vb6YXZ2NOzNu1eApuqpGRKS/rNovcsRqru
simOponMWAMAAB9/FNhZNat3RKqmm0oXrZGafWzXEkSuLQm9FpSuFbgii/sD9vQ3
69VfnasOhMPpkbMe4/t/6ehgi+pChPEYajKILK5vAyECCypxKIT/
-----END RSA PRIVATE KEY-----
公钥：
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC1KSuDI1rIa0pWInqycCIy6OdasmQEsl7m449aKIhTeisMjrhAXOPbZX6epFRA7iaQjXFhBjoZNnJKRaPO1iy/xOmk97aQHlChbFQIyWirGWwunMv/feqySXMHrDNPUgh3cqJTW2EFxf4x93lcRFKFcAF4+ELBfq/dsnm7MjnIvtYtCgzsUjYcC9t9wtll11EKm+BT8nXlh3/c5jyUrYFgry5SY2HYEgD8QPBfIdT2xDOmxqG2pCrwjoncEVnu3Q4cu2/MnuXVfNXRpGCRc38C6RdBdmYDTMwIYjKbuRml7NTgibujNqOz9KUseJ488dzKMt/NXdApNZo8r2RW124D hasee@DESKTOP-TDT0KKR


