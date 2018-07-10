/**
 * Created by hasee on 2017/8/16.
 */
import Vue from 'vue'
// import JsEncrypt from 'jsencrypt/bin/jsencrypt'
import {
  setupWebViewJavascriptBridge
} from './common'
// let jse = new JsEncrypt.JSEncrypt()
// jse.setPublicKey(`MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgJ2SmYXDPfDTgm2fq2JOCnwyr2JbIITBnRHLreNGoncXkLRT43hDE9JEnq/Cg7dK7kKjpHztB66oAb3IbnMydHG7GoIl31nPD+1BWjUdWVOe+g+hHsLlQi/l0fnesdcac1cgJj1OrCYrUkcWAEcBZBIxkMCRafolYci9mAYpTNlV5kdQ7IUW/QKNGDOOVaq1m/vcw5uCUYG0tHS55dMPLZtGmyEt0XdYNEzrlo8FehI8qxjk/4EixzjuphUdKmWMv2Cnc7FqClJjYMauYa9FSJ19bEWFQ1RC5iMI3lL4p/4pEgZqWqKMGsz6bSNjcz6UtOXUZr66fZRiEPAKfoCdwIDAQAB`)
// Vue.prototype.jse = jse

let p = navigator.platform
if (p.indexOf('Win') === 0) {
  window.myFixedbottom = 0
} else {
  window.myFixedbottom = 40
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
    setupWebViewJavascriptBridge((bridge) => {
      bridge.callHandler('WKJSBridge_statusHeight', {}, (res) => {
        window.myFixedbottom = parseFloat(res) * 2
      })
    })
  }
}
Vue.prototype.imgBaseUrl = 'https://ideabuy.oss-cn-hangzhou.aliyuncs.com/'
Vue.prototype.version_number = 'v1'

export default Vue
