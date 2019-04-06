import Vue from 'vue'
import VueTouch from 'vue-touch'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueTouch, {
  name: 'v-touch'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')