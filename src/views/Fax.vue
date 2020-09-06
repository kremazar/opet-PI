<template>
  <div class="container">
    <div class="row">
      <div v-for=" blog in fax" v-bind:key="blog.id" class="col-3">
        <div class="card m-1">
          <img
            class="card-img-top"
            src="http://www.teen385.com/frontend/images/uploads/082009/knjige.jpg"
            style="width:100%"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{{blog.naziv}}</h5>
            <router-link v-bind:to="'/predmeti/'+ blog.id">Pregledaj</router-link>
            <button class="btn btn-danger float-right" @click="onDelete(blog.id)">X</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="admin=='niksa123@unipu.hr'">
      <router-link v-bind:to="'/novi_predmet'">Dodaj predmet</router-link>
      <br />
      <br />
      <router-link v-bind:to="'/DodajIspit'">Dodaj Ispit</router-link>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/auth";
import { SviPredmeti, ObrisiPredmet } from "@/services";
export default {
  data() {
    return {
      fax: [],
      admin: firebase.auth().currentUser.email,
    };
  },
  methods: {
    deletePred(id) {
      ObrisiPredmet.getAll(id)
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onDelete(book) {
      this.deletePred(book);
    },
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