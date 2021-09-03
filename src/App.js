import React, { useState, useCallback, useEffect } from "react";

import { Switch, Route, useHistory, Redirect } from "react-router-dom";

import Main from "./components/Main";
import Footer from "./components/Footer";
import LandingPage from "./views/LandingPage";
import TripSummary from "./components/TripSummary";
import TripSingleDay from "./components/TripSingleDay";
import TripResultsWrapper from "./views/TripResultsWrapper";
import SavedTrips from "./components/SavedTrips";
import TripPlanerWrapper from "./views/TripPlanerWrapper";
import SignUpPage from "./views/SignUpPage";
import SignInPage from "./views/SignInPage";
import { Box } from "@material-ui/core";

import useAppGridStyle from "./styles/useAppGridStyle";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Div100vh from "react-div-100vh";
import clsx from "clsx";

import { useTripContext } from "./context/TripContext";

import ProtectedRoute from "./components/ProtectedRoute";
import client from "./auth/client";
import { getToken } from "./auth/auth";

function App() {
  const classes = useAppGridStyle();
  const theme = useTheme();
  const isBreakpointSm = useMediaQuery(theme.breakpoints.up("sm"));

  let history = useHistory();

  const [me, setMe] = useState();
  const { tripDataRaw, tripData } = useTripContext();

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
      setMe("bla");
      getUserInfo();
    }
  }, [history, getUserInfo]);

  return (
    <Div100vh>
      {" "}
      <Box
        className={clsx(classes.app, {
          [classes.widthBreakpointLg]: isBreakpointSm === false,
          [classes.widthBreakpointSm]: isBreakpointSm === true,
          [classes.dropShadow]: isBreakpointSm === true,
        })}
      >
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
      </Box>
    </Div100vh>
  );
}

export default App;
