import axios from "axios";
import { getToken } from "./auth";

const { NODE_ENV, REACT_APP_DEV_API_URL, REACT_APP_PRODUCTION_URL } =
  process.env;

const baseURL =
  NODE_ENV === "production"
    ? REACT_APP_PRODUCTION_URL
    : REACT_APP_PRODUCTION_URL;
console.log({ baseURL });
const client = axios.create({ baseURL });

client.interceptors.request.use(
  (req) => {
    const token = getToken();
    console.log({ token });
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
client.interceptors.response.use(
  // Here we just send back the response without modifying it
  (response) => response,
  // But for the error, we want some custom behavior
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      // Sending a custom error message to the user
      alert("error");
      // This error will be caught by whichever part of your code is using axios
      // When a 401 or 403 is handled so we can customize the error message
      throw new Error(`${error.config.url}: ${error.request.response}`);
    }
    // Axios' default error message is "Request failed with status code xxx"
    throw error;
  }
);
export default client;
