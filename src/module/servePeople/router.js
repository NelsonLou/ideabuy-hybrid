const servePeopleRouter = {
  mode: 'history',
  routes: [
    {
      path: '/loss',
      name: 'loss',
      component(resolve) {
        require.ensure(['./views/lossSuccess.vue'], () => {
          resolve(require('./views/loss.vue'))
        }, 'loss')
      }
    }, {
      path: '/lossSuccess',
      name: 'lossSuccess',
      component (resolve) {
        resolve(require('./views/lossSuccess.vue'))
      }
    }, {
      path: '/numberAssignment',
      name: 'numberAssignment',
      component (resolve) {
        require.ensure([], () => {
          resolve(require('./views/numberAssignment.vue'))
        }, 'numberAssignment')
      }
    }, {
      path: '/webQuery',
      name: 'webQuery',
      component (resolve) {
        require.ensure([], () => {
          resolve(require('./views/webQuery.vue'))
        }, 'webQuery')
      }
    }, {
      path: '/onlineService',
      name: 'onlineService',
      component (resolve) {
        require.ensure([], () => {
          resolve(require('./views/onlineService.vue'))
        }, 'onlineService')
      }
    }, {
      path: '*',
      redirect: to => {
        if (to.query.to === 'loss') {
          return {name: 'loss'}
        } else if (to.query.to === 'lossSuccess') {
          return {name: 'lossSuccess'}
        } else if (to.query.to === 'numberAssignment') {
          return {name: 'numberAssignment'}
        } else if (to.query.to === 'webQuery') {
          return {name: 'webQuery'}
        } else if (to.query.to === 'onlineService') {
          return {name: 'onlineService'}
        }
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

export default servePeopleRouter
