const state = {
  delay: false
}

const actions = {}
const getters = {}
const mutations = {
  loading_setDelay (state, boolean = true) {
    state.delay = boolean
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
/**
 * Created by hasee on 2017/8/5.
 */
