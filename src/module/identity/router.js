const identityRouter = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'identity',
      component(resolve) {
        resolve(require('./views/identity.vue'))
      }
    }, {
      path: '/identity/change-mobile',
      name: 'changeMobile',
      component(resolve) {
        resolve(require('./views/change-mobile.vue'))
      }
    }, {
      path: '*',
      redirect: {
        name: 'identity'
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
export default identityRouter
