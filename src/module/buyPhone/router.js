const buyPhoneRouter = {
  mode: 'history',
  routes: [
    {
      path: '/buyPhone.html',
      name: 'buyPhone',
      component(resolve) {
        resolve(require('./views/buyPhone.vue'))
      }
    }, {
      path: '/buyPhone/good-detail',
      name: 'goodDeatils',
      component (resolve) {
        resolve(require('./views/goodsdetail.vue'))
      }
    }, {
      path: '/buyPhone/packageSelect',
      name: 'packageSelect',
      component (resolve) {
        resolve(require('./views/packageSelect.vue'))
      }
    }, {
      path: '/buyPhone/contractSelect',
      name: 'contractSelect',
      component (resolve) {
        resolve(require('./views/contractSelect.vue'))
      }
    }, {
      path: '/buyPhone/mobileSelect',
      name: 'mobileSelect',
      component (resolve) {
        resolve(require('./views/mobileSelect.vue'))
      }
    }, {
      path: '/buyPhone/payOrder',
      name: 'payOrder',
      component (resolve) {
        resolve(require('./views/payOrder.vue'))
      }
    }, {
      path: '/buyPhone/NetInfo',
      name: 'NetInfo',
      component (resolve) {
        resolve(require('./views/NetInfo.vue'))
      }
    }, {
      path: '/buyPhone/Invoice',
      name: 'Invoice',
      component (resolve) {
        resolve(require('./views/Invoice.vue'))
      }
    }, {
      path: '/buyPhone/Address',
      name: 'Address',
      component (resolve) {
        resolve(require('./views/Address.vue'))
      }
    }, {
      path: '/buyPhone/VerifyMobile',
      name: 'VerifyMobile',
      component (resolve) {
        resolve(require('./views/VerifyMobile.vue'))
      }
    }, {
      path: '*',
      redirect: {
        name: 'buyPhone'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
}

export default buyPhoneRouter
