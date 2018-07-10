const broadbandRouter = {
  mode: 'history',
  routes: [
    {
      path: '/broadband.html',
      name: 'broadband',
      component(resolve) {
        resolve(require('./views/broadband.vue'))
      }
    }, {
      path: '/broadband/newBroadband',
      name: 'newBroadband',
      component (resolve) {
        resolve(require('./views/newBroadband.vue'))
      }
    }, {
      path: '/broadband/newBroadband/brdAccessInfo',
      name: 'brdAccessInfo',
      component(resolve) {
        resolve(require('./views/brdAccessInfo.vue'))
      }
    }, {
      path: '/broadband/brdRenewal',
      name: 'brdRenewal',
      component(resolve) {
        resolve(require('./views/brdRenewal.vue'))
      }
    }, {
      path: '*',
      redirect: {
        name: 'broadband'
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
export default broadbandRouter
