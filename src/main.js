import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.axios=axios
import { Row, Col, Icon, Toast} from 'vant'

Vue.use(Row).use(Col).use(Icon).use(Toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
