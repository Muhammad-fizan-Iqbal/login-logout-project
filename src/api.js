//Axios is a promise based HTTP client for Node.js and browser.
import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("api/login", credentials).then(res => res.data),
    logout: credentials =>
      axios.post("api/logout", credentials).then(res => res.data)
  }
};
