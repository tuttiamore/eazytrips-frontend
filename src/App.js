import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";
import Main from "./components/Main";
import Footer from "./components/Footer";
import LandingPage from "../src/views/LandingPage";
import TripSummary from "./components/TripSummary";
import TripSingleDay from "./components/TripSingleDay";
import TripResultsWrapper from "./views/TripResultsWrapper";
import SavedTrips from "./components/SavedTrips";
import useAppGridStyle from "../src/styles/useAppGridStyle";
import TripPlanerWrapper from "./views/TripPlanerWrapper";
import SignUpPage from "../src/views/SignUpPage";
import SignInPage from "../src/views/SignInPage";
import "./App.css";

import { useTripContext } from "./context/TripContext";

// AUTH
import ProtectedRoute from "./components/ProtectedRoute";
import client from "./auth/client";
import { getToken } from "./auth/auth";

function App() {
  let history = useHistory();
  const [me, setMe] = useState();
  const { tripDataRaw, tripData } = useTripContext();
  const classes = useAppGridStyle();

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

  return (
    <>
      <Main>
        <Switch>
          <Route path="/plantrip/:stage">
            {!tripDataRaw ? <Redirect to="/" /> : <TripPlanerWrapper />}
          </Route>
          <Route path="/tripsingleday/:day">
            {!tripData ? (
              <Redirect to="/" />
            ) : (
              <TripResultsWrapper>
                <TripSingleDay></TripSingleDay>
              </TripResultsWrapper>
            )}
          </Route>
          <Route path="/tripsummary">
            {!tripData ? (
              <Redirect to="/" />
            ) : (
              <TripResultsWrapper>
                <TripSummary></TripSummary>
              </TripResultsWrapper>
            )}
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

      <Footer className={classes.footer}></Footer>
    </>
  );
}

export default App;
