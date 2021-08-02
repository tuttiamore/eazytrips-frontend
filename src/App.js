import { Switch, Route, withRouter, useHistory } from "react-router-dom";
import React, { useState, useCallback } from "react";
import { TripProvider } from "./context/TripContext";
import Box from "@material-ui/core/Grid";
import Main from "./components/Main";
import Footer from "./components/Footer";
import LandingPage from "../src/views/LandingPage";
import SuggestedPlaces from "../src/views/SuggestedPlaces";
import TripSummary from "../src/views/TripSummary";
import TripSingleDay from "../src/views/TripSingleDay";
import useAppGridStyle from "../src/styles/useAppGridStyle";
import TripPlanerWrapper from "./views/TripPlanerWrapper";
import SignUpPage from "../src/views/SignUpPage";
import SignInPage from "../src/views/SignInPage";
import WelcomePage from "../src/views/WelcomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { login } from "./auth/auth";
import client from "./auth/client";
import { useEffect } from "react";
import { getToken } from "./auth/auth";
import SavedTrips from "./components/SavedTrips";

function App({ location }) {
  let history = useHistory();
  const [me, setMe] = useState();
  const [credentials, setCredentials] = useState();

  // const handleCredentials = (e) => {
  //   setCredentials((prevCredentials) => ({
  //     ...prevCredentials,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const handleAuthentication = async () => {
  //   const isAuthenticated = await login(credentials);
  //   if (isAuthenticated) {
  //     getUserInfo();
  //   } else {
  //     alert("Invalid login credentials");
  //   }
  // };
  const getUserInfo = useCallback(async () => {
    try {
      const { data } = await client.get("backenurltogetdata");
      if (data) {
        setMe(data);
        history.push("home");
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [history]);

  useEffect(() => {
    if (getToken()) {
      getUserInfo();
    }
  }, [history, getUserInfo]);
  const classes = useAppGridStyle();
  return (
    <TripProvider>
      <Main>
        <Switch>
          <Route path="/plantrip/:stage">
            <TripPlanerWrapper />
          </Route>
          <Route path="/tripsingleday/:day">
            <TripSingleDay />
          </Route>
          <Route path="/tripsummary">
            <TripSummary />
          </Route>
          <Route path="/suggestedplaces">
            <SuggestedPlaces />
          </Route>
          <ProtectedRoute path="/savedtrips" component={SavedTrips} me={me} />
          <Route path="/signUpPage">
            <SignUpPage />
          </Route>
          <Route path="/signInPage">
            <SignInPage me={me} setMe={setMe} />
          </Route>
          <Route path="/" exact>
            <LandingPage />
          </Route>
        </Switch>
      </Main>

      <Box className={classes.footer}>
        {location.pathname !== "/" && <Footer location={location}></Footer>}
      </Box>
    </TripProvider>
  );
}

export default withRouter(App);
