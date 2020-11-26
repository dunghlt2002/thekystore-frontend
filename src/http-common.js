import axios from "axios";
// baseURL: "http://localhost:8080/api",

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL ,
  headers: {
    "Content-type": "application/json"
  }
});