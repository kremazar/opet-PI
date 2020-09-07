<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9">
        <form action>
          <button @click.prevent="novopitanje">dodaj pitanje</button>
        </form>
        <form>
          <div class="form-group">
            <select v-model="kolegij">
              <option disabled value>Odaberi predmet</option>
              <option v-for="predmet in fax" :key="predmet">{{predmet}}</option>
            </select>
          </div>
          <div class="border p-5 mb-5" v-for="index in broj" :key="index">
            <div class="form-group">
              <label for="Pitanje">Pitanje {{index}}:</label>
              <input v-model="ispit[index-1].text" class="form-control" />
            </div>
            <div class="form-group">
              <label for="userName">Točan odgovor {{index}}:</label>
              <input v-model="ispit[index-1].responses[0].text" class="form-control" />
            </div>
            <div class="form-group">
              <label for="Email">Netočan odgovor {{index}}:</label>
              <input v-model="ispit[index-1].responses[1].text" class="form-control" />
            </div>
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
import { Ispit, SviPredmeti } from "@/services";
export default {
  data() {
    return {
      pitanje: {
        text: "",
        responses: [{ text: "", correct: true }, { text: "" }],
      },
      broj: 5,
      fax: [],
      predmet: [],
      kolegij: "",
      ispit: [
        {
          text: "",
          responses: [{ text: "", correct: true }, { text: "" }],
        },
        {
          text: "",
          responses: [{ text: "", correct: true }, { text: "" }],
        },
        {
          text: "",
          responses: [{ text: "", correct: true }, { text: "" }],
        },
        {
          text: "",
          responses: [{ text: "", correct: true }, { text: "" }],
        },
        {
          text: "",
          responses: [{ text: "", correct: true }, { text: "" }],
        },
      ],
    };
  },
  methods: {
    dodaj: function () {
      Ispit.getAll(this.ispit, this.kolegij).then(() => {
        location.reload();
      });
    },
    novopitanje: function () {
      this.ispit.push(this.pitanje);
      this.broj += 1;
    },
  },
  created() {
    SviPredmeti.getAll().then((data) => {
      for (let key in data) {
        data[key].id = key;
        this.fax.push(data[key].naziv);
      }
    });
  },
};
</script>