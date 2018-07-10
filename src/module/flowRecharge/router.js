const routes = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'flowList',
      component(resolve) {
        resolve(require('./views/FlowList.vue'))
      }
    }, {
      path: '/flow-recharge/flow-info',
      name: 'flowInfo',
      component(resolve) {
        resolve(require('./views/FlowInfo.vue'))
      }
    }, {
      path: '/flow-recharge/flow-buy',
      name: 'flowBuy',
      component(resolve) {
        resolve(require('./views/FlowBuy.vue'))
      }
    }, {
      path: '*',
      redirect: {
        name: 'flowList'
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

export default routes
