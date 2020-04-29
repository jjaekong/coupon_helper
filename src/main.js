import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const firebaseConfig = {
    apiKey: "AIzaSyDUYnKDNULWrHfKPbGxCgUUNKjTysJRAkU",
    authDomain: "omnitel-coupon-helper.firebaseapp.com",
    databaseURL: "https://omnitel-coupon-helper.firebaseio.com",
    projectId: "omnitel-coupon-helper",
    storageBucket: "omnitel-coupon-helper.appspot.com",
    messagingSenderId: "900452249197",
    appId: "1:900452249197:web:6ba3904a5936f540079964"
};

try {
    firebase.app();
} catch(e) {
    firebase.initializeApp(firebaseConfig);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
