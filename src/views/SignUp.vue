<template>
  <div class="about">
    <div v-if="error" class="list-group-item-danger">{{error}}</div>
    <h1>This is an SignUp page</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-9">
          <form>
            <div class="form-group">
              <label for="Email">Email:</label>
              <input type="Email" class="form-control" v-model="user.email" placeholder="Email" />
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input
                type="password"
                class="form-control"
                v-model="user.password"
                placeholder="Password"
              />
            </div>
            <div class="form-group">
              <label for="password2">Confirm Password:</label>
              <input
                type="password"
                class="form-control"
                v-model="user.password2"
                placeholder="Confirm Password"
              />
            </div>
            <button v-on:click.prevent="post" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <div class="col-sm-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "firebase";
import "firebase/auth";
export default {
  name: "signup",
  data() {
    return {
      error: "",
      ime: "",
      user: {
        email: "",
        password: "",
        password2: "",

        FullName: "",
        UserName: "",
      },
    };
  },
  methods: {
    post: function () {
      if (this.user.password !== this.user.password2) {
        this.error = "Password do not match!!!";
      } else {
        var db = firebase.firestore();
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then(() => {
            /*  // postavi podatke o korisniku
          let id = this.user.email;
          // sada moramo spremiti te dodatne podatke
          db.collection("korisnici")
            .doc(id)
            .set({
              ime: this.ime
            })
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            }); */
          })
          .then(() => {
            this.$router.go("/");
          });
      }
    },
  },
};
</script>
