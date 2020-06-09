import Vue from 'vue'
import firebase from 'firebase'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Fax from '../views/Fax.vue'
import Predmeti from '../views/Predmeti.vue'
import NoviPredmet from '../views/Novi_predmet.vue'
import User from '../views/User.vue'
import Admin from '../views/Admin.vue'


Vue.use(VueRouter)

const router = new VueRouter({
  routes : [
 
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component:Login,
      meta:{
        requiresGuest:true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component:SignUp,
      meta:{
        requiresGuest:true
      }
    },
    {
      path: '/fax',
      name: 'fax',
      component:Fax,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/predmeti/:id',
      name: 'predmeti',
      component:Predmeti
    },
    {
      path: '/novi_predmet',
      name: 'novi_predmet',
      component:NoviPredmet,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/user/:id',
      name: 'user',
      component:User,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component:Admin,
      meta:{
        requiresAuth:true
      }
    }
  ],
  mode:'history'
})

router.beforeEach((to,from,next)=>{
  if(to.matched.some(record=>record.meta.requiresAuth)){
    if (!firebase.auth().currentUser){
      next({
        path:'/login',
        query:{
          redirect:to.fullPath
        }
      })
    }else{
      next()
    }
  }else if (to.matched.some(record=>record.meta.requiresGuest)){
    if (firebase.auth().currentUser){
      next({
        path:'/',
        query:{
          redirect:to.fullPath
        }
      })
    }else{
      next()
    }
  }else{
    next()
  }
 
})



export default router
