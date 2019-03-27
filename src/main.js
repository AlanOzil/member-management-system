// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/iconfont'
import '@/assets/scss/index.scss'
import '@/assets/css/table.styl'
import '@/assets/font/iconfont.css'
// import VueI18n from 'vue-i18n'

// if (process.env.NODE_ENV !== "production") {
//   require('@/mock');
// }

Vue.use(ElementUI, {
  size: 'mini'
})
Vue.use(VueCookie)
// Vue.use(VueI18n)
//
// const i18n = new VueI18n({
//   locale: 'zh-CN', // 语言标识
//   messages: {
//     'zh-CN': require('./common/lang/zh'), // 中文语言包
//     'en-US': require('./common/lang/en') // 英文语言包
//   }
// })
//


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  components: { App },
  template: '<App/>'
})
