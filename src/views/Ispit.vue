<template>
  <div id="app">
    <h1>{{ quiz.title }}</h1>
    <!-- index is used to check with current question index -->
    <div v-for="(question, index) in quiz.questions" :key="index">
      <!-- Hide all questions, show only the one with index === to current question index -->
      <div v-show="index === questionIndex">
        <h2>{{ question.text }}</h2>
        <ol>
          <li v-for="response in question.responses">
            <label>
              <!-- The radio button has three new directives -->
              <!-- v-bind:value sets "value" to "true" if the response is correct -->
              <!-- v-bind:name sets "name" to question index to group answers by question -->
              <!-- v-model creates binding with userResponses -->
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
        <!-- The two navigation buttons -->
        <!-- Note: prev is hidden on first question -->
        <button v-if="questionIndex > 0" v-on:click="prev">prev</button>
        <button v-on:click="next">next</button>
      </div>
    </div>
    <div v-show="questionIndex === quiz.questions.length">
      <h2>Quiz finished</h2>
      <p>Total score: {{ score() }} / {{ quiz.questions.length }}</p>
      <p>Čestitamo položili ste!</p>
      <button @click="dodaj">Potvrdi</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "firebase";
var quiz = {
  title: "My quiz",
  questions: [
    {
      text: "Vue je framework kojeg programskoj jezika?",
      responses: [{ text: "Java" }, { text: "JavaScript", correct: true }],
    },
    {
      text: "Koji model koristi Vue",
      responses: [{ text: "v-model", correct: true }, { text: "model-v" }],
    },
    {
      text: "Osnivač Vue",
      responses: [
        { text: "Evan You", correct: true },
        { text: "Brendan Eich" },
      ],
    },
    {
      text: "Koje godine je napravljen Javascript",
      responses: [{ text: "1995", correct: true }, { text: "2005" }],
    },
    {
      text: "Jocker pitanje",
      responses: [
        { text: "Ovdje je točan odgovor", correct: true },
        { text: "Ovdje nije točan odgovor" },
      ],
    },
  ],
};
export default {
  data() {
    return {
      predmet: this.$route.params.predmet,
      ispit: "položeno",
      quiz: quiz,
      // Store current question index
      questionIndex: 0,
      // An array initialized with "false" values for each question
      // It means: "did the user answered correctly to the question n?" "no".
      userResponses: Array(quiz.questions.length).fill(false),
    };
  },
  // The view will trigger these methods on click
  methods: {
    // Go to next question
    next: function () {
      this.questionIndex++;
    },
    // Go to previous question
    prev: function () {
      this.questionIndex--;
    },
    // Return "true" count in userResponses
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
};
</script>