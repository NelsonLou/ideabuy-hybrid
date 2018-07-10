const argumentRouter = {
  mode: 'history',
  routes: [
    {
      path: '/aboutProduct',
      name: 'aboutProduct',
      component(resolve) {
        require.ensure([], () => {
          resolve(require('./views/aboutProduct.vue'))
        }, 'aboutProduct')
      }
    }, {
      path: '/register',
      name: 'register',
      component(resolve) {
        require.ensure([], () => {
          resolve(require('./views/register.vue'))
        }, 'register')
      }
    }, {
      path: '*',
      redirect: to => {
        if (to.query.to === 'aboutProduct') {
          return {name: 'aboutProduct'}
        } else if (to.query.to === 'register') {
          return {name: 'register'}
        }
        return {name: 'aboutProduct'}
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

export default argumentRouter
