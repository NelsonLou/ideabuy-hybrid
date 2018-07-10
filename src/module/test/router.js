const testRouter = {
  mode: 'history',
  routes: [
    {
      path: '/test.html',
      name: 'test',
      component(resolve) {
        resolve(require('./views/test.vue'))
      }
    }, {
      path: '/test1',
      name: 'test1',
      component(resolve) {
        resolve(require('./views/test1.vue'))
      }
    }, {
      path: '*',
      redirect: {
        name: 'test'
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
export default testRouter
