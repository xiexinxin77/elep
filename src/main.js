import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/'
import store from './store/'
import './config/rem'
import {routerMode} from './config/env'
import SvgIcon from './components/svg/svgIcon.vue'
import pm from './config/pm'
import alert from './components/common/alertTip'
Vue.use(VueRouter)
Vue.component('svg-icon', SvgIcon)
// 让 icons/svg下面的图片自动导入，而不是每次手动导入
// 遍历require.context的返回模块，并导入
const requireAll = requireContext => requireContext.keys().map(requireContext)

// import所有符合条件的svg 三个参数：文件夹、是否使用子文件夹、正则
const req = require.context('src/assets/icons', true, /\.svg$/)
requireAll(req)
pm.init()
Vue.use(alert)
const router = new VueRouter({
  routes,
  module: routerMode,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {x: 0, y: from.meta.savedPosition || 0}
    }
  }
})

new Vue({
  router,
  store
}).$mount('#app')