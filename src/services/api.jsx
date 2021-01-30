import axios from "axios";

const baseURL = 'http://localhost:3000/api/v1'
// export const baseURL =
//   process.env.NODE_ENV === "production"
//     ? "http://localhost:3000/api/v1"
//     : "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

const plannerAPI = {
    // getEvent: (id) => {
    //   return ax({
    //     method: "GET",
    //     url: `${baseURL}/events/${id}`,
    //   });
    // },
    getEvent: (id) => {
      return axios.get("http://localhost:5000/api/v1/events/" + id);
    },

    // listEvents: () => {
    //   return ax({
    //     method: "GET",
    //     url: `${baseURL}/events`,
    //   });
    // },
    listEvents: () => {
      return axios.get("http://localhost:5000/api/v1/events/")
    }

};

export default plannerAPI;