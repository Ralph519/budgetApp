import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vmodal from 'vue-js-modal'
import db from './firebase'
import { store } from "./store";
    
Vue.use(vmodal)
Vue.config.productionTip = false

let app

db.app.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      store,
      router,
      render: h => h(App),
    }).$mount('#app')
  }
})



// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })