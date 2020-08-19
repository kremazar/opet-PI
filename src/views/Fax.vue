<template>
    <div class="container">
      <div class="row">
        <div v-for=" blog in fax"   v-bind:key="blog.id" class="col-3">
          <div  class="card m-1" style="width: 18rem; height:18rem;">
            <img class="card-img-top" src="http://www.teen385.com/frontend/images/uploads/082009/knjige.jpg" style="width:100%" alt="Card image cap">
            <div  class="card-body">
              <h5 class="card-title">{{blog.naziv}}</h5>
              <router-link v-bind:to="'/predmeti/'+ blog.id">Pregledaj</router-link>
            </div>
          </div>  
              
        </div>
      </div>
      <div v-if="admin=='niksa123@unipu.hr'">
        <router-link v-bind:to="'/novi_predmet'">Dodaj</router-link>
      </div>
      
    </div>
</template>

<script>
import firebase from 'firebase'
import "firebase/auth"
export default {
  data(){
    return{
      fax:[],
      admin:firebase.auth().currentUser.email
    }
  },
 created(){
        this.$http.get('https://pi-projekt-f1460.firebaseio.com/Predmeti.json').then(function(data){
          return data.data
        }).then(data =>{
          var Array=[]
          for (let key in data){
          data[key].id=key
          Array.push(data[key])
          }
         this.fax=Array
        })
      }
}
</script>