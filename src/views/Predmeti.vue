<template>
    <div class="predmeti">
        <div class="container">
            <h1>{{predmet.naziv}}</h1>
            <div class="card mt-3" style="width:100%;">
                <div class="card-body">
                    <h3 class="card-title">Opis: </h3>
                    <p class="card-text">{{predmet.opis}}</p>
                </div>
            </div>
            <div class="card mt-3" style="width:100%;">
                <div class="card-body">
                    <h5 class="card-title">Nositelji: </h5>
                    <p class="card-text"> {{predmet.nositelji}}</p>
                </div>
            </div>
            <div class="card mt-3" style="width:100%;">
                <div class="card-body">
                    <h5 class="card-title">Literatura: </h5>
                    <p class="card-text"> {{predmet.literatura}}</p>
                </div>
            </div>
            <div class="card mt-3" style="width:100%;">
                <div class="card-body">
                    <h5 class="card-title">Predavanje: </h5>
                        <iframe width="768" height="450"
                            :src="predmet.predavanje">
                        </iframe>
                </div>
            </div>
            <div class="card mt-3" style="width:100%;">
                <div class="card-body">
                    <h5 class="card-title">Ispit: </h5>
                    <p class="card-text"> {{predmet.ispit}}</p>
                </div>
                <form >
            <div class="form-group">
              <label for="link">URL riješenja:</label>
              <input v-model="ispit.link"  class="form-control"   placeholder="Riješenje" />
            </div>
            <button @click.prevent="dodaj"  class="btn btn-primary">Dodaj</button>
          </form>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from 'firebase'
export default {
    data(){
        return{
            id:this.$route.params.id,
            predmet:{},
            ispit:{
                link:'',
            }
        }
    },
    created(){
        var db = firebase.firestore()
        this.$http.get('https://pi-projekt-f1460.firebaseio.com/Predmeti/' + this.id + '.json').then(function(data){
            return data.data
        }).then (data=>{
            this.predmet=data
        })
      },
      methods:{
        dodaj: function(){
            let id= firebase.auth().currentUser.email
            var db = firebase.firestore()
            var naziv=  this.predmet.naziv
            db.collection("korisnici")
            .doc(id)
            .collection('ispit')
            .doc(naziv)
            .collection('rješenje')
            .add({
              ispit: this.ispit.link
            })
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
            this.$router.replace({name:"fax"})
        }
    }
}
</script>