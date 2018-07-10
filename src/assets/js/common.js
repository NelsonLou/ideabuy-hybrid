import axios from 'axios'

// 功能：获取url参数
// 参数：
//    ＊ paras － 传进来的key值
// 返回值：
//    ＊ returnValue -对应key值的value值

function requestURLparas (paras) {
  const url = location.href
  const paraString = url.substring(url.indexOf('?') + 1, url.length).split('&')
  const paraObj = {}
  let j = null
  for (let i = 0; i < paraString.length; i++) {
    j = paraString[i]
    const key = j.substring(0, j.indexOf('=')).toLowerCase()
    paraObj[key] = j.substring(j.indexOf('=') + 1, j.length)
  }
  const returnValue = paraObj[paras.toLowerCase()]
  if (typeof (returnValue) === 'undefined') {
    return ''
  }
  return returnValue
}

function ifLoading (url) {
  const paraString = url.substring(url.indexOf('?') + 1, url.length).split('&')
  console.log(paraString)
  let j = null
  for (let i = 0; i < paraString.length; i++) {
    j = paraString[i]
    const key = j.substring(0, j.indexOf('='))
    const value = j.substring(j.indexOf('=') + 1, j.length)
    if (key === 'myloading' && value === 'false') {
      return false
    }
  }
  return true
}

// 功能：判断是否是安卓机型
// 参数：
//    无
// 返回值：
//    ＊ true  - 环境为安卓机
//    ＊ false - 环境为非安卓机
function isAndroid () {
  const u = navigator.userAgent
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
}

// 功能：注册JSBridge环境
function setupWebViewJavascriptBridge (callback) {
  if (isAndroid()) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge)
    }
    window.document.addEventListener('WebViewJavascriptBridgeReady', () => {
      callback(window.WebViewJavascriptBridge)
    }, false)
    return
  }
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  const WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

function formatTime (value) {
  return new Date(value * 1000).toLocaleString().replace(/\//g, '-')
    .slice(0, 9)
}

function getToken () {
  return new Promise((resolve, reject) => {
    const token = requestURLparas('token')
    if (!token) {
    //   // get token from app
      let p = navigator.platform
      if (p.indexOf('Win') === 0) {
        resolve()
      } else {
        setupWebViewJavascriptBridge((bridge) => {
          bridge.callHandler('WKJSBridge_getAuth', {}, (res) => {
            if (typeof res === 'string') {
              res = JSON.parse(res)
            }
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.token
            localStorage.setItem('wkToken', res.token)
            resolve()
          })
        })
      }
    } else {
      // get token from url
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      localStorage.setItem('wkToken', token)
      resolve()
    }
  })
}

// function setTokenFromLocalStorage() {
//   if (!axios.defaults.headers.common['token']) {
//     const token = localStorage.getItem('ymdToken')
//     if (token) {
//       axios.defaults.headers.common['token'] = token
//     }
//     else {
//       // 登出
//     }
//   }
//   return true
// }

// function compareObject(o1, o2) {
//   if (typeof o1 != typeof o2)return false
//   if (typeof o1 == 'object') {
//     if (o1.length != o2.length) {
//       return false
//     }
//     if (o1.length == undefined && o2 == undefined) {
//       let o1_key = 0
//       let o2_key = 0
//       for (let key in o1) {
//         o1_key++
//       }
//       for (let key in o2) {
//         o2_key++
//       }
//       if (o1_key != o2_key) {
//         return false
//       }
//     }
//     for (let o in o1) {
//       if (typeof o2[o] == 'undefined')return false
//       if (!compareObject(o1[o], o2[o]))return false
//     }
//     return true
//   } else {
//     return o1 === o2
//   }
// }
// 设置滚动
function setScroll () {
  window.myScrollTop = document.body.scrollTop
  // // // window.documentHeight = document.body.scrollHeight
  document.getElementsByName('myDiv')[0].style.top = '-' + window.myScrollTop + 'px'
  setTimeout(() => {
    document.getElementsByName('myDiv')[0].removeAttribute('style')
    document.getElementsByName('myDiv')[1].removeAttribute('style')
    // document.getElementsByName('headerBar')[0].removeAttribute('style')
    // document.getElementsByName('headerBar')[1].removeAttribute('style')
  }, 410)
}

export {
  requestURLparas,
  isAndroid,
  setupWebViewJavascriptBridge,
  formatTime,
  getToken,
  setScroll,
  ifLoading
  // compareObject
}
