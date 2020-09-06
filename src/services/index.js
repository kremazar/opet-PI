import axios from "axios";
import firebase from "firebase";

let Service = axios.create({
  baseURL: "https://pi-projekt-f1460.firebaseio.com",
  timout: 1000,
});

let Predmeti = {
  async getAll(id) {
    let response = await Service.get(`/Predmeti/${id}.json`);
    let data = response.data;
    return data;
  },
};
let SviPredmeti = {
  async getAll() {
    let response = await Service.get(`/Predmeti.json`);
    let data = response.data;
    return data;
  },
};
let ObrisiPredmet = {
  async getAll(id) {
    let response = await Service.delete(`/Predmeti/${id}.json`);
    return response;
  },
};
let Novi = {
  async getAll(podaci) {
    let response = await Service.post("/Predmeti.json", podaci);
    return response;
  },
};
let Ispit = {
  async getAll(podaci, kolegij) {
    let response = await Service.post(`/Ispit/${kolegij}.json`, podaci);
    console.log(response);
    return response;
  },
};
let SviIspiti = {
  async getAll(kolegij) {
    let response = await Service.get(`/Ispit/${kolegij}.json`);
    let data = response.data;
    return data;
  },
};
let Storage = {
  getAll(ref, sve) {
    var storage = firebase.storage();
    var storageRef = storage.ref(`${ref}`);
    storageRef
      .listAll()
      .then((result) => {
        result.items.forEach((imageRef) => {
          imageRef
            .getDownloadURL()
            .then((url) => {
              sve.push(url);
            })
            .catch(function(error) {});
        });
      })
      .catch(function(error) {});
  },
};
let Polozeno = {
  getAll(user, korisnici) {
    var db = firebase.firestore();
    db.collection(user)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          korisnici.push(doc.data().položeno);
          console.log(doc.data().položeno);
        });
      });
  },
};
export {
  Service,
  Predmeti,
  SviPredmeti,
  Novi,
  Storage,
  ObrisiPredmet,
  Polozeno,
  Ispit,
  SviIspiti,
};
