import axios from "axios";

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
let Novi = {
  async getAll(podaci) {
    let response = await Service.post("/Predmeti.json", podaci);
    return response;
  },
};
export { Service, Predmeti, SviPredmeti, Novi };
