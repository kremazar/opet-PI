<template>
  <div class="user">
    <h1>Korisnik {{user}}</h1>
    <div>
      <table v-for="url in korisnici" :key="url.id" class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Položeni predmeti</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{{url}}</th>
          </tr>
        </tbody>
      </table>
    </div>
    <h1 v-if="korisnici.length==max">Položili ste sve predmete!!!!!</h1>
    <h1
      v-else-if="korisnici.length < max"
    >Preostalo vam je položiti još {{max-korisnici.length}} predmeta</h1>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "firebase";
import { Polozeno } from "@/services";
export default {
  data() {
    return {
      id: this.$route.params.id,
      user: firebase.auth().currentUser.email,
      korisnici: [],
      max: 5,
    };
  },
  created() {
    Polozeno.getAll(this.user, this.korisnici);
  },
};
</script>