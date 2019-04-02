import Vue from 'vue'
import Router from 'vue-router'
// const _import = require('./import-' + process.env.NODE_ENV);

Vue.use(Router)

let router = new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/login/login'], resolve)
  }, {
    path: '/404',
    name: '404',
    component: resolve => require(['@/views/error/401'], resolve)
  }, {
    path: '/401',
    name: '401',
    component: resolve => require(['@/views/error/401'], resolve)
  }, {
    path: '/base',
    component: resolve => require(['@/views/layout/index'], resolve),
    name: 'base',
    redirect: {
      name: 'dictionary'
    },
    children: [{
      path: 'home',
      component: resolve => require(['@/views/home/index'], resolve),
      name: 'home',
      desc: '首页'
    }, {
      path: 'config/dictionary',
      component: resolve => require(['@/views/base/dictionary/index'], resolve),
      name: 'dictionary',
      desc: '字典配置',
      meta: {
        isTab: true
      }
    }]
  }, {
    path: '/',
    redirect: {
      name: 'dictionary'
    }
  }, {
    path: '*',
    redirect: {
      name: '404'
    }
  }]
})

// router.beforeEach( (to, from, next) => {
//   let token = Vue.cookie.get('token');
//   if (!token || !/\S/.test(token)) {
//     next({ name: 'login' })
//   }
//   next()
// })

export default router
