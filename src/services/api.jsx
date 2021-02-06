import axios from "axios";
import qs from "qs";

const baseURL = 'http://localhost:5000/api/v1'
// export const baseURL =
//   process.env.NODE_ENV === "production"
//     ? "http://localhost:3000/api/v1"
//     : "http://localhost:3000/api/v1";

// const axiosInstance = axios.create({
//     baseURL: baseURL,
//     timeout: 5000,
// });

const plannerAPI = {

    getEvent: (id) => {
      return axios.get("http://localhost:5000/api/v1/events/" + id);
    },

    updateEvent: (id, data) => {
      return axios.patch("http://localhost:5000/api/v1/events/" + id,
      qs.stringify(data))
    },

    listEvents: () => {
      return axios.get("http://localhost:5000/api/v1/events/")
    },

    createEvent: (data) => {
      // console.log(data);
      // console.log(qs.stringify(data));
      return axios.post("http://localhost:5000/api/v1/events/", qs.stringify(data))
    },

    deleteEvent: (id) => {
      return axios.delete("http://localhost:5000/api/v1/events/" + id)
    }
};

export default plannerAPI;