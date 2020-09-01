<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9">
        <form>
          <div class="form-group">
            <label for="FullName">Naziv Predmeta:</label>
            <input v-model="Predmet.naziv" class="form-control" placeholder="Naziv predmeta" />
          </div>
          <div class="form-group">
            <label for="userName">Opis:</label>
            <input v-model="Predmet.opis" class="form-control" placeholder="Opis" />
          </div>
          <div class="form-group">
            <label for="Email">Nositelji:</label>
            <input v-model="Predmet.nositelji" class="form-control" placeholder="Nositelji" />
          </div>
          <div class="form-group">
            <label for="password">Literatura:</label>
            <input v-model="Predmet.literatura" class="form-control" placeholder="Literatura" />
          </div>
          <button @click.prevent="dodaj" class="btn btn-primary">Dodaj</button>
        </form>
      </div>
      <div class="col-sm-2"></div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/auth";
import { Novi } from "@/services";
export default {
  data() {
    return {
      Predmet: {
        naziv: "",
        opis: "",
        nositelji: "",
        literatura: "",
      },
    };
  },
  methods: {
    dodaj: function () {
      Novi.getAll(this.Predmet).then(() => {
        this.$router.replace({ name: "fax" });
      });
    },
  },
};
</script>