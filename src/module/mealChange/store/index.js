import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    // 套餐
    meal: '',
    // 手机号码
    tel: '',
    banner: '',
    price: '',
    packge_name: ''
}

export default new Vuex.Store({
    state
})
