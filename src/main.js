import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import axios from 'axios';
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
let app=''
const config ={
    apiKey: "AIzaSyCrDBsXf426gQGaTvILsSCNVEBSHDOWvOo",
    authDomain: "pi-projekt-f1460.firebaseapp.com",
    databaseURL: "https://pi-projekt-f1460.firebaseio.com",
    projectId: "pi-projekt-f1460",
    storageBucket: "pi-projekt-f1460.appspot.com",
    messagingSenderId: "257335448495",
    appId: "1:257335448495:web:cf6271e26e0cc3c798555a"
};
Vue.use(VueAxios, axios)

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(()=>{
  if (!app){
    app=new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})

