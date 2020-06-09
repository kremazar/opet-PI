<template>
       <div class="container ">
      <div class="row">
   
        <div class="col-sm-9">
          <form >
            <div class="form-group">
              <label for="FullName">Naziv Predmeta:</label>
              <input v-model="Predmet.naziv"  class="form-control"   placeholder="Naziv predmeta" />
            </div>
            <div class="form-group">
              <label for="userName">Opis:</label>
              <input v-model="Predmet.opis"  class="form-control" placeholder="Opis"  />
            </div>
            <div class="form-group">
              <label for="Email">Nositelji:</label>
              <input v-model="Predmet.nositelji" class="form-control"  placeholder="Nositelji" />
            </div>
            <div class="form-group">
              <label for="password">Literatura:</label>
              <input v-model="Predmet.literatura"  class="form-control" placeholder="Literatura" />
            </div>
            <div class="form-group">
              <label for="password">Predavanje:</label>
              <input v-model="Predmet.predavanje"  class="form-control" placeholder="predavanje" />
            </div>
            <div class="form-group">
              <label for="password">Ispit:</label>
              <input v-model="Predmet.ispit"  class="form-control" placeholder="ispit" />
            </div>
            <button @click.prevent="dodaj"  class="btn btn-primary">Dodaj</button>
          </form>
        </div>
        <div class="col-sm-2"></div>
      </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import "firebase/auth"
export default {
    data(){
        return{
            Predmet:{
                naziv:'',
                opis:'',
                nositelji:'',
                literatura:'',
                predavanje:'',
                ispit:''
            }
        }
    },
    methods:{
        dodaj: function(){
            this.$http.post('https://pi-projekt-f1460.firebaseio.com/Predmeti.json',this.Predmet).then(function(data){
        console.log(data)
      })
      /*
             var db = firebase.firestore()
       db.collection("Predmeti")
            .add(this.Predmet)
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
       */
      this.$router.replace({name:"fax"})
        }
    }
}
</script>