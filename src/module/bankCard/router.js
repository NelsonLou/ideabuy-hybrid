const bankCardRouter = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'bankCard',
      component(resolve) {
        resolve(require('./views/bankCard.vue'))
      }
    }, {
      path: '/bankCard/addCard',
      name: 'addCard',
      component(resolve) {
        resolve(require('./views/addCard.vue'))
      }
    }, {
      path: '/bankCard/addCard/addPeople',
      name: 'addPeople',
      component(resolve) {
        resolve(require('./views/addPeople.vue'))
      }
    }, {
      path: '/bankCard/addCard/addPeople/creditText',
      name: 'creditText',
      component(resolve) {
        resolve(require('./views/creditText.vue'))
      }
    }, {
      path: '/addCard/bindSuccess',
      name: 'bindSuccess',
      component(resolve) {
        resolve(require('./views/bindSuccess.vue'))
      }
    }, {
      path: '/bankCard/addCard/addPeople/bindSuccess',
      name: 'first_bindSuccess',
      component(resolve) {
        resolve(require('./views/first-bindSuccess.vue'))
      }
    }, {
      path: '*',
      redirect: to => {
        if (to.query.to === 'addCard') {
          return {name: 'addCard'}
        } else if (to.query.to === 'addPeople') {
          return {name: 'addPeople'}
        }
        return {name: 'bankCard'}
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

export default bankCardRouter
