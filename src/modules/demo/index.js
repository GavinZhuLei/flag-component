import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './route'
import './element-variables.scss'

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
