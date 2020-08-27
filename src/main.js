// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
  
Vue.use(VueQuillEditor)


Vue.use(ElementUI);
Vue.prototype.$echarts = echarts
axios.defaults.baseURL = 'http://118.24.25.7:5000'
axios.interceptors.request.use(config => {
  // console.log(config);
  config.headers.Authorization = `Bearer ${window.sessionStorage.getItem('token')}`
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
