const orderRouter = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'order',
      component(resolve) {
        resolve(require('./views/order.vue'))
      }
    }, {
      path: '*',
      redirect: {
        name: 'order'
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

export default orderRouter
