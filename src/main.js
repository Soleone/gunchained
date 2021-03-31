import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { firestorePlugin } from 'vuefire'
import vuetify from './plugins/vuetify'
import VueGtag from 'vue-gtag'
import { config } from '@/../firebase.config.js'

Vue.use(
  VueGtag,
  {
    config: { id: config.measurementId }
  },
  router
)
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
  render: h => h(App),
  created() {
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect
      delete sessionStorage.redirect
      this.$router.push(redirect)
    }
  }
}).$mount('#app')