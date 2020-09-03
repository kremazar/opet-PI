<template>
  <div class="predmeti">
    <div class="container">
      <h1>{{predmet.naziv}}</h1>
      <div class="card mt-3" style="width:100%;">
        <div class="card-body">
          <h3 class="card-title">Opis:</h3>
          <p class="card-text">{{predmet.opis}}</p>
        </div>
      </div>
      <div class="card mt-3" style="width:100%;">
        <div class="card-body">
          <h5 class="card-title">Nositelji:</h5>
          <p class="card-text">{{predmet.nositelji}}</p>
        </div>
      </div>
      <div class="card mt-3" style="width:100%;">
        <div class="card-body">
          <h5 class="card-title">Literatura:</h5>
          <p class="card-text">{{predmet.literatura}}</p>
        </div>
      </div>
      <div class="card mt-3" style="width:100%;">
        <h4>Materijali:</h4>
        <div class="card-body">
          <div v-for="url in sve" :key="url">
            <a :href="url">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTDahnud_WsFulNFAkQLAwWeZlMRbJzMaIcZQ&usqp=CAU"
                width="100"
                height="100"
              />
            </a>
          </div>
        </div>
      </div>

      <div class="card mt-3" style="width:100%;">
        <h1 v-if="korisnici.includes(predmet.naziv)">
          <p>Već ste položili ispit</p>
        </h1>
        <div v-else>
          <div class="card-body">
            <router-link v-bind:to="'/ispit/'+ predmet.naziv ">Ispit</router-link>
          </div>
        </div>
      </div>
      <div v-if="admin=='niksa123@unipu.hr'">
        <p>Dodaj materijale:</p>
        <input type="file" @change="previewImage" accept="*" />
        <p>
          Status: {{uploadValue.toFixed()+"%"}}
          <progress
            id="progress"
            :value="uploadValue"
            max="100"
          ></progress>
        </p>
      </div>
      <div v-if="imageData!=null">
        <button @click="onUpload">Upload</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "firebase";
import { Predmeti, Storage, Polozeno } from "@/services";
export default {
  data() {
    return {
      admin: firebase.auth().currentUser.email,
      id: this.$route.params.id,
      imageData: null,
      picture: null,
      sve: [],
      uploadValue: 0,
      predmet: {},
      korisnici: [],
    };
  },

  created() {
    Storage.getAll(this.id, this.sve);
    Predmeti.getAll(this.id).then((data) => {
      this.predmet = data;
    });
    Polozeno.getAll(this.admin, this.korisnici);
  },
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.id}/${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref
            .getDownloadURL()
            .then((url) => {
              this.picture = url;
            })
            .then(() => {
              location.reload();
            });
        }
      );
    },
  },
};
</script>