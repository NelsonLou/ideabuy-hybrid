const queryZoneRouter = {
  mode: 'history',
  routes: [
    {
      path: '/historyBill',
      name: 'historyBill',
      component(resolve) {
        require.ensure([], () => {
          resolve(require('./views/historyBill.vue'))
        }, 'historyBill')
      }
    }, {
      path: '/speech',
      name: 'speech',
      component(resolve) {
        require.ensure([], () => {
          resolve(require('./views/speech.vue'))
        }, 'speech')
      }
    }, {
      path: '/flowDetail',
      name: 'flowDetail',
      component(resolve) {
        require.ensure([], () => {
          resolve(require('./views/flowDetail.vue'))
        }, 'flowDetail')
      }
    }, {
      path: '/contract',
      name: 'contract',
      component(resolve) {
        require.ensure([], () => {
          resolve(require('./views/contract.vue'))
        }, 'contract')
      }
    }, {
      path: '/call',
      name: 'call',
      component (resolve) {
        require.ensure([], () => {
          resolve(require('./views/call.vue'))
        }, 'call')
      }
    }, {
      path: '*',
      redirect: to => {
        if (to.query.to === 'historyBill') {
          return {name: 'historyBill'}
        } else if (to.query.to === 'speech') {
          return {name: 'speech'}
        } else if (to.query.to === 'flowDetail') {
          return {name: 'flowDetail'}
        } else if (to.query.to === 'contract') {
          return {name: 'contract'}
        } else if (to.query.to === 'call') {
          return {name: 'call'}
        }
        return {name: 'historyBill'}
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

export default queryZoneRouter
