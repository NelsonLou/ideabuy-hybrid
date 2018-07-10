const repaymentRouter = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'repayment',
      component(resolve) {
        resolve(require('./views/repayment.vue'))
      }
    }, {
      path: '/repayment/all-bills',
      name: 'all-bills',
      component(resolve) {
        resolve(require('./views/all-bills.vue'))
      }
    }, {
      path: '/repayment/by-stages-detail1',
      name: 'by-stages-detail1',
      component(resolve) {
        resolve(require('./views/by-stages-detail1.vue'))
      }
    }, {
      path: '/repayment/by-stages-detail1/by-stages-detail2',
      name: 'by-stages-detail2',
      component(resolve) {
        resolve(require('./views/by-stages-detail2.vue'))
      }
    }, {
      path: '/repayment/order-detail',
      name: 'order-detail',
      component(resolve) {
        resolve(require('./views/order-detail.vue'))
      }
    }, {
      path: '/repayment/overdue-detail',
      name: 'overdue-detail',
      component(resolve) {
        resolve(require('./views/overdue-detail.vue'))
      }
    }, {
      path: '/repayment/by-stages',
      name: 'by-stages',
      component(resolve) {
        resolve(require('./views/by-stages.vue'))
      }
    }, {
      path: '/repayment/month-bill',
      name: 'month-bill',
      component(resolve) {
        resolve(require('./views/month-bill.vue'))
      }
    }, {
      path: '/repayment/payPage',
      name: 'payPage',
      component(resolve) {
        resolve(require('./views/payPage.vue'))
      }
    }, {
      path: '*',
      redirect: to => {
        if (to.query.to === 'allBill') {
          return {name: 'all-bills'}
        } else if (to.query.to === 'pay') {
          return {name: 'payPage'}
        }
        return {name: 'repayment'}
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
export default repaymentRouter
