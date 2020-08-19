<template>
  <div class="home">
    <div class="jumbotron">
  <h1 class="display-4">Dobrodošli u sustav OnlineFax!</h1>
  <hr class="my-4">
  <p>Pristupite fakultetu kojeg pohađate!</p>
  <p class="lead">
   <router-link v-bind:to="'/fax/'" class="btn btn-primary btn-lg"> FIPU</router-link>
  </p>
</div>
  </div>
</template>
<script>
import firebase from 'firebase'
export default {
  name:'home',
  data(){
    return{
      
    }
  }
}
</script>



