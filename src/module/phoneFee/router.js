const phoneFeeRouter = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'phoneFee',
      component(resolve) {
        resolve(require('./views/phoneFee.vue'))
      }
    }, {
      path: '/phoneFee/invoice',
      name: 'invoice',
      component(resolve) {
        resolve(require('./views/invoice.vue'))
      }
    }, {
      path: '/phoneFee/myIndent',
      name: 'myIndent',
      component(resolve) {
        resolve(require('./views/myIndent.vue'))
      }
    }, {
      path: '/phoneFee/paynow',
      name: 'paynow',
      component(resolve) {
        resolve(require('./views/paynow.vue'))
      }
    }, {
      path: '/neverStop',
      name: 'neverStop',
      component(resolve) {
        resolve(require('./views/neverStop.vue'))
      }
    }, {
      path: '*',
      redirect: to => {
        if (to.query.to === 'neverStop') {
          return {name: 'neverStop'}
        }
        return {name: 'phoneFee'}
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

export default phoneFeeRouter
