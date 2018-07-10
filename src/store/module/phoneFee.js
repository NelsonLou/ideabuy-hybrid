const state = {
  commodity: {
    name: '中国联通套餐更换',
    desc: '70元套餐（新）',
    price: 120
  }
}

const getters = {
  getCommodity: state => state.commodity
}
const mutations = {
  // 选择商品
  BUYTHIS: (state, data) => {
    state.commodity = data
  }
}
const actions = {
  // 选择商品
  submitPay: ({commit}, data) => {
    commit('BUYTHIS', data)
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
