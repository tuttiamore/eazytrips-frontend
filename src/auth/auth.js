import Cookies from "js-cookie";
import client from "./client";

const { REACT_APP_APP_NAME } = process.env;

const setToken = (data) =>
  Cookies.set(`${REACT_APP_APP_NAME}-auth-token`, data);
const getToken = () => Cookies.get(`${REACT_APP_APP_NAME}-auth-token`);
const login = async (credentials) => {
  try {
    console.log(credentials);
    const { headers } = await client.post("/auth/login", credentials);

    const token = headers["x-authorization-token"];
    console.log(token);
    if (token) {
      setToken(token);
      return true;
    }
  } catch (e) {
    console.log(e);
  }
};

const save_trip = async (tripData) => {
  try {
    console.log(tripData);
    const data = await client.post("/save_trip", tripData);

    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

const get_user_trips = async () => {
  try {
    console.log();
    const data = await client.get("/user");

    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
const logout = (history) => {
  Cookies.remove(`${REACT_APP_APP_NAME}-auth-token`);

  history.push("/");
};

export { login, logout, getToken, setToken, save_trip, get_user_trips };
