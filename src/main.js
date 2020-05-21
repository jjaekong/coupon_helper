import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase/app'
import moment from 'moment'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

let firebaseConfig;

if (process.env.NODE_ENV == 'production') {
    firebaseConfig = {
        apiKey: "AIzaSyDUYnKDNULWrHfKPbGxCgUUNKjTysJRAkU",
        authDomain: "omnitel-coupon-helper.firebaseapp.com",
        databaseURL: "https://omnitel-coupon-helper.firebaseio.com",
        projectId: "omnitel-coupon-helper",
        storageBucket: "omnitel-coupon-helper.appspot.com",
        messagingSenderId: "900452249197",
        appId: "1:900452249197:web:6ba3904a5936f540079964"
    };
} else {
    firebaseConfig = {
        apiKey: "AIzaSyDwALFZn6vNOsKMDAO06J2XSni_U3SELqA",
        authDomain: "omnitel-coupon-helper-dev.firebaseapp.com",
        databaseURL: "https://omnitel-coupon-helper-dev.firebaseio.com",
        projectId: "omnitel-coupon-helper-dev",
        storageBucket: "omnitel-coupon-helper-dev.appspot.com",
        messagingSenderId: "983936416628",
        appId: "1:983936416628:web:2729cc6b813f2ce5fc4a21"
    };
}

try {
    firebase.app();
} catch(e) {
    firebase.initializeApp(firebaseConfig);
}

moment.locale('ko')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
