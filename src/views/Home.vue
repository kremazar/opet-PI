<template>
  <div class="home">
    <div v-for=" korisnik in korisnici"   v-bind:key="korisnik.id">
      <div v-if="korisnik.id==user">
             <router-link v-bind:to="'/user/'+ korisnik.id">User</router-link>
      </div>
    </div>
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
      korisnici:[],
      user:firebase.auth().currentUser.email
    }
  },
   created(){
      var db = firebase.firestore()
      var a= db.collection('korisnici').get().then
      (querySnapshot =>{
        querySnapshot.forEach(doc =>{
          const data ={
            'id':doc.id,
            'ime': doc.data().ime
          }
          this.korisnici.push(data)
        })
      }

      )
      console.log(a)
      }
  
}
</script>



