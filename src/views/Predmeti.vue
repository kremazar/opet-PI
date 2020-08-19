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
                    <router-link v-bind:to="'/ispit/'+ predmet.naziv ">Ispit</router-link>                   
                </div>
                
         <!--        <form >
            <div class="form-group">
              <label for="link">URL riješenja:</label>
              <input v-model="ispit.link"  class="form-control"   placeholder="Riješenje" />
            </div>
            <button @click.prevent="dodaj"  class="btn btn-primary">Dodaj</button>
          </form> -->
            </div>
            <div >
      <p>Upload an image to Firebase:</p>
      <input type="file" @change="previewImage" accept="*" >
    </div>
    <div>
      <p>Progress: {{uploadValue.toFixed()+"%"}}
      <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
    </div>
    <div v-if="imageData!=null">
        <img class="preview" :src="picture">
        <br>
      <button @click="onUpload">Upload</button>
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
            imageData: null,
            picture: null,
            sve:[],
            uploadValue: 0,
            predmet:{},
            ispit:{
                link:'',
            }
        }
    },
    created(){
        var storage = firebase.storage();

        var storageRef = storage.ref(`${this.id}`);

    console.log(this.sve[0])
    // Now we get the references of these images
    storageRef.listAll().then(function(result) {
      console.log(result)
      result.items.forEach(function(imageRef) {
        imageRef.getDownloadURL().then(function(url) {
        //console.log(url)
        this.sve.push(url)
      }).catch(function(error) {
        // Handle any errors
      });   
      });
    }).catch(function(error) {
      // Handle any errors
    });

    function displayImage(imageRef) {
      imageRef.getDownloadURL().then(function(url) {
        // TODO: Display the image on the UI
      }).catch(function(error) {
        // Handle any errors
      });
    }


        this.$http.get('https://pi-projekt-f1460.firebaseio.com/Predmeti/' + this.id + '.json').then(function(data){
            return data.data
        }).then (data=>{
            this.predmet=data
        })
      },
      methods:{
       
        /* dodaj: function(){
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
        } */
        previewImage(event) {
            this.uploadValue=0;
            this.picture=null;
            this.imageData = event.target.files[0];
         },
          onUpload(){
      this.picture=null;
      const storageRef=firebase.storage().ref(`${this.id}/${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          this.picture =url;
       
        });
      }
      );
         this.sve.push(this.picture)
          console.log(this.sve[0])
    }
    }
}
</script>