import Vue from 'vue'
import Vuex from 'vuex'

import bill from './module/bill'
import loading from './module/loading'
import phoneFee from './module/phoneFee'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    bill,
    loading,
    phoneFee
  }
})
