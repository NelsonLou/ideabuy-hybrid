/**
 * Created by hasee on 2017/7/31.
 */

import axios from '../../assets/js/axios'

const state = {
  orderList: [],
  paymentShow: false,
  byStagesShow: false,
  orderDetail: {},
  byStagesDetail: {},
  monthBill: {
    account: {
      info: {
        is_pay_off: '',
        plan_pay_date: '',
        real_month: '',
        total_overdue_fee: '0.00',
        total_real_pay_fee: '',
        total_should_pay_fee: '',
        total_surplus_pay_fee: ''
      },
      install_list: [],
      uninstall_list: []
    },
    unaccount: {
      info: {
        plan_pay_date: '',
        real_month: '',
        total_plan_pay_fee: ''
      },
      install_list: [],
      uninstall_list: []
    }
  },
  payPageInfo: {}
}

const actions = {
  bill_getByStagesDetail (context, orderId) {
    context.commit('bill_setByStagesDetail', {})
    // setTimeout(() => {
    axios.get(`/user-instalmentinfo?contract_sn=${orderId}`).then(res => {
      if (res) {
        context.commit('bill_setByStagesDetail', res.data.bill_info)
      }
    })
    // }, 20000)
  },
  bill_getMonthBill (context, date) {
    axios.get(`/user-repaymentsindex?date=${date}`).then(res => {
      if (res) {
        context.commit('bill_setMonthBill', res.data.bill_list)
      }
    })
  }
}
const getters = {}
const mutations = {
  bill_setPayPageInfo (state, obj) {
    state.payPageInfo = obj
  },
  bill_setOrderList (state, arr) {
    state.orderList = arr
  },
  bill_setOrderDetail (state, obj) {
    state.orderDetail = obj
  },
  bill_togglePayment (state, status) {
    state.paymentShow = status
  },
  bill_toggleByStages (state, status) {
    state.byStagesShow = status
  },
  bill_setByStagesDetail (state, obj) {
    state.byStagesDetail = obj
  },
  bill_setMonthBill (state, obj) {
    state.monthBill = obj
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
