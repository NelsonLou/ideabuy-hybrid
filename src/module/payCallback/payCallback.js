
import Vue from '../../assets/js/vue'
import 'normalize.css'
import '../../assets/css/common.css'
import payCallback from './payCallback.vue'
import axios from '../../assets/js/axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#payCallback',
  template: '<payCallback/>',
  components: {payCallback}
})
