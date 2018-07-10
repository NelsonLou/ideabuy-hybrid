const mealChangeRouter = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'mealChange',
      component(resolve) {
        resolve(require('./views/mealChange.vue'))
      }
    }, {
      path: '/mealDetail',
      name: 'mealDetail',
      component(resolve) {
        resolve(require('./views/mealDetail.vue'))
      }
    }, {
      path: '/mealChoose',
      name: 'mealChoose',
      component(resolve) {
        resolve(require('./views/mealChoose.vue'))
      }
    }, {
      path: '/tel',
      name: 'tel',
      component(resolve) {
        resolve(require('./views/tel.vue'))
      }
    }, {
      path: '/payment',
      name: 'payment',
      component(resolve) {
        resolve(require('./views/payment.vue'))
      }
    }, {
      path: '*',
      redirect: {
        name: 'mealChange'
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
export default mealChangeRouter
