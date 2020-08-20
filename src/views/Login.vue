<template>
  <div class="login">
    <h1>This is an Login page</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="email">Email:</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="email"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" class="form-control" v-model="password" placeholder="Password" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
          <div class="error" v-if="error">{{error.message}}</div>
        </div>
        <div class="col-sm-3"></div>
      </div>
      <p>user:kmazar222@gmail.com lozinka:123456</p>
      <p>admin:niksa123@unipu.hr lozinka:123456</p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    login: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            this.$router.go({ path: this.$router.path });
          },
          (err) => {
            alert("oops" + err.message);
          }
        );
    },
  },
};
</script>
