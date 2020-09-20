import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { firestorePlugin } from 'vuefire'
import vuetify from './plugins/vuetify'

Vue.use(firestorePlugin)
Vue.config.productionTip = false

// DayJS
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(RelativeTime)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
