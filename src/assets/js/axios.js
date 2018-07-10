import axios from 'axios'

import Vue from './vue'
import {LoadingPlugin, AlertPlugin} from 'vux'
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
import '../css/vux.css'
import {
  ifLoading,
  setupWebViewJavascriptBridge
} from './common'
import store from '../../store/index'
import catchCode from './catchCode'
import eventhub from './eventhub'
// let myVue = new Vue()
// axios.defaults.baseURL = process.env.NODE_ENV ===
// 'production' ? 'https://api3.yunmodel.com' : 'http://v3.yunmodel.com'

let qs = require('qs')
let timer = null

let setStatus = () => {
  store.commit('loading_setDelay', false)
  clearTimeout(timer)
  timer = null
  Vue.$vux.loading.hide()
}

eventhub.$on('backword', () => {
  setStatus()
})

axios.interceptors.request.use(
  config => {
    if (ifLoading(config.url)) {
      if (store.state.loading.delay === true) {
        timer = setTimeout(() => {
          Vue.$vux.loading.show({
            text: 'Loading'
          })
        }, 480)
      } else {
        Vue.$vux.loading.show({
          text: 'Loading'
        })
      }
    }
    config.data = qs.stringify(config.data)
    return config
  },
  err => {
    setStatus()
    Vue.$vux.alert.show({
      title: '提示',
      content: '网络异常'
    })
    return Promise.reject(err)
  })
// http response 拦截
axios.interceptors.response.use(
  response => {
    setStatus()
    if (response.data.code > 11090 && response.data.code < 11096) {
      Vue.$vux.alert.show({
        title: '提示',
        content: '登录失效',
        onHide() {
          setupWebViewJavascriptBridge((bridge) => {
            bridge.callHandler('WKJSBridge_logout', {}, () => {
            })
          })
        }
      })
    } else if (catchCode.indexOf(response.data.code) !== -1) {
      return response.data
    } else {
      Vue.$vux.alert.show({
        title: '提示',
        content: response.data.msg
      })
      return ''
    }
  },
  error => {
    setStatus()
    Vue.$vux.alert.show({
      title: '提示',
      content: '网络异常'
    })
    return Promise.reject(error)
  }
)
// axios.defaults.baseURL = 'http://i.dev.weknet.cn/api/'
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'https://i.d.weknet.cn/api/'
} else if (process.env.NODE_ENV === 'testing') {
  axios.defaults.baseURL = 'https://i.t.weknet.cn/api/'
} else {
  axios.defaults.baseURL = 'https://i.weknet.cn/api/'
}
axios.defaults.timeout = 60000
// axios.defaults.baseURL = 'http://127.0.0.1:8888'
// axios.defaults.baseURL = 'http://'
// axios.defaults.headers.post['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcm9tIjoidXNlciIsInVzZXJfaWQiOjIsInVzZXJfbW9iaWxlIjoiMTM0ODY2MjczNDgiLCJzdWIiOjIsImlzcyI6Imh0dHA6Ly9pLmRldi53ZWtuZXQuY24vYXBpL3VzZXItbG9naW4iLCJpYXQiOjE1MDE5MDEwMzYsImV4cCI6MTUwMzExMDYzNiwibmJmIjoxNTAxOTAxMDM2LCJqdGkiOiIxS2RUdm9zclpCY0ZENmJiIn0.SaU7Dvt0NfJrNN4FEXBc-_EQwJAK-7BOlgAf1nvuWQM'
// axios.defaults.headers.get['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcm9tIjoidXNlciIsInVzZXJfaWQiOjIsInVzZXJfbW9iaWxlIjoiMTM0ODY2MjczNDgiLCJzdWIiOjIsImlzcyI6Imh0dHA6Ly9pLmRldi53ZWtuZXQuY24vYXBpL3VzZXItbG9naW4iLCJpYXQiOjE1MDE5MDEwMzYsImV4cCI6MTUwMzExMDYzNiwibmJmIjoxNTAxOTAxMDM2LCJqdGkiOiIxS2RUdm9zclpCY0ZENmJiIn0.SaU7Dvt0NfJrNN4FEXBc-_EQwJAK-7BOlgAf1nvuWQM'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['Accept'] = 'application/vnd.ideabuy.' + Vue.prototype.version_number + '+json'

export default axios
