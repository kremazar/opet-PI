<template>
    <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand"><router-link to="/">Home</router-link></a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active"></li>
      <li v-if="isLoggedIn"> <router-link to="/fax">Fax</router-link></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li v-if="!isLoggedIn"><router-link to="/signup"><span class="glyphicon glyphicon-user"></span>SignUp</router-link></li>
      <li v-if="!isLoggedIn"><router-link to="/login"><span class="glyphicon glyphicon-log-in"></span>Login</router-link></li>
      <li v-if="isLoggedIn"><button @click="logout"><span class="glyphicon glyphicon-log-out"></span>LogOut</button></li>
    </ul>
  </div>
</nav>
</template>

<script>
import firebase from 'firebase'
export default {
    name:'navigation',
    data(){
        return{
            isLoggedIn:false,
            currentUser:false,
        }
    },
    created(){
        if(firebase.auth().currentUser){
            this.isLoggedIn=true
            this.currentUser=firebase.auth().currentUser.email
        }
    },
    methods:{
    logout:function(){
      firebase.auth().signOut().then(()=>{
        this.$router.go({path:this.$router.path})
      })
    }
  }
}
</script>

<style lang="scss">

#navigation {
  padding: 30px;
    float:left;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>