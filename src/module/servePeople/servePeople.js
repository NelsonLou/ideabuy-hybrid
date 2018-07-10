/**
 * Created by hasee on 2017/7/26.
 */

import Vue from '../../assets/js/vue'
import 'normalize.css'
import '../../assets/css/common.css'
import '../../assets/css/vux.css'
import axios from '../../assets/js/axios'
import VueAxios from 'vue-axios'
import servePeople from './servePeople.vue'
import servePeopleRouter from './router'
import Router from 'vue-router'
import {AlertPlugin} from 'vux'
import '../../assets/icon/style.css'
import {requestURLparas, setupWebViewJavascriptBridge} from '../../assets/js/common'

Vue.use(VueAxios, axios)
Vue.use(AlertPlugin)
Vue.use(Router)
// Vue.use(window.infiniteScroll)

const router = new Router(servePeopleRouter)
document.body.addEventListener('touchstart', () => {
})

const u = navigator.userAgent
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
if (isAndroid) {
  // register JSBridge callback
  setupWebViewJavascriptBridge((bridge) => {
    bridge.init((message, responseCallback) => {
      const data = {
        'Javascript Responds': 'Wee!'
      }
      responseCallback(data)
    })
  })
}

let token = requestURLparas('token') ? decodeURIComponent(requestURLparas('token').replace(/%20/g, '+')) : ''

if (!token) {
  // get token from app
  setupWebViewJavascriptBridge((bridge) => {
    bridge.callHandler('WKJSBridge_getAuth', {}, (res) => {
      if (typeof res === 'string') {
        res = JSON.parse(res)
      }
      localStorage.setItem('wkToken', res.token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.token
    })
  })
} else {
  // get token from url
  localStorage.setItem('wkToken', token)
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('wkToken')
}
// make token cache in loaclStorage
if (localStorage.getItem('wkToken')) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('wkToken')
}

/* eslint-disable no-new */
new Vue({
  el: '#servePeople',
  router,
  template: '<servePeople/>',
  components: {servePeople}
})
