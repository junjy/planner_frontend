import axios from "axios";

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:3000/api/v1"
    : "http://localhost:3000/api/v1";

export const ax = axios.create({
    baseURL,
    timeout: 5000,
});

const api = {
    // getEvent: (id) => {
    //   return ax({
    //     method: "GET",
    //     url: `${baseURL}/events/${id}`,
    //   });
    // },
    getEvent: (id) => {
      return axios.get("http://localhost:5000/api/v1/events/" + id);
    },
    listEvents: () => {
      return ax({
        method: "GET",
        url: `${baseURL}/events`,
      });
    },

};

export default api;