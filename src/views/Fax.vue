<template>
  <div class="container">
    <div class="row">
      <div v-for=" blog in fax" v-bind:key="blog.id" class="col-3">
        <div class="card m-1" style="width: 18rem; height:18rem;">
          <img
            class="card-img-top"
            src="http://www.teen385.com/frontend/images/uploads/082009/knjige.jpg"
            style="width:100%"
            alt="Card image cap"
          />
          <div class="card-body">
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
import firebase from "firebase";
import "firebase/auth";
import { SviPredmeti } from "@/services";
export default {
  data() {
    return {
      fax: [],
      admin: firebase.auth().currentUser.email,
    };
  },
  created() {
    SviPredmeti.getAll().then((data) => {
      for (let key in data) {
        data[key].id = key;
        this.fax.push(data[key]);
      }
    });
  },
};
</script>