import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vmodal from 'vue-js-modal'
import db from './firebase'
import { store } from "./store";
import moment from 'moment'

import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-134948154-1',
})
    
Vue.use(vmodal)
Vue.config.productionTip = false

var numeral = require('numeral');

Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0.00"); // displaying other groupings/separators is possible, look at the docs
})

Vue.filter('formatDate', function(value) {
  if (value) {
    let myDate = new Date(value * 1000) 
    return moment(String(myDate)).format('MMMM DD, YYYY')
  }
})

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