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
export { Service, Predmeti, SviPredmeti, Novi, Storage, ObrisiPredmet };
