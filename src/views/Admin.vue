<template>
  <div class="admin">
    {{predmeti}}
  </div>
</template>

<script>
import firebase from 'firebase'
import "firebase/auth"
export default {
    data(){
        return {
            predmeti:[]
        }
    },
    created(){
        var db = firebase.firestore()
        db.collection("korisnici").get().then((snapshot)=>{
            snapshot.docs.forEach(doc=>{
                console.log(doc.data())
            })
        })
      
    }
}
</script>

<style>

</style>