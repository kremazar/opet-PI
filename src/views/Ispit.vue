<template>
  <div id="app">
    <div v-for="prva in questions" :key="prva">
      <div v-for="(question, index) in prva" :key="index">
        <div v-show="index === questionIndex">
          <h2>{{ question.text }}</h2>
          <ol>
            <li v-for="response in question.responses" :key="response.id">
              <label>
                <input
                  type="radio"
                  v-bind:value="response.correct"
                  v-bind:name="index"
                  v-model="userResponses[index]"
                />
                {{response.text}}
              </label>
            </li>
          </ol>
          <button v-if="questionIndex > 0" v-on:click="prev">prev</button>
          <button v-on:click="next">next</button>
        </div>
      </div>
      <div v-show="questionIndex === 5">
        <h2>Quiz finished</h2>
        <p>Rezultat: {{ score() }} / 5</p>
        <p>Čestitamo položili ste!</p>
        <button @click="dodaj">Potvrdi</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "firebase";
import { SviIspiti } from "@/services";

export default {
  data() {
    return {
      predmet: this.$route.params.predmet,
      ispit: "položeno",
      questionIndex: 0,

      questions: [],
      userResponses: Array(5).fill(false),
    };
  },

  methods: {
    next: function () {
      this.questionIndex++;
    },

    prev: function () {
      this.questionIndex--;
    },
    score: function () {
      return this.userResponses.filter(function (val) {
        return val;
      }).length;
    },
    dodaj: function () {
      let id = firebase.auth().currentUser.email;
      var db = firebase.firestore();
      db.collection(id)
        .add({
          položeno: this.predmet,
        })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
      this.$router.replace({ name: "fax" });
    },
  },
  created() {
    SviIspiti.getAll(this.predmet).then((data) => {
      for (let key in data) {
        data[key].id = key;
        this.questions.push(data[key]);
      }
    });
  },
};
</script>
<style >
ol {
  list-style-type: none;
}
</style>