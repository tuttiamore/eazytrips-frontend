import { Switch, Route } from "react-router-dom";
import pathToRegex from "path-to-regexp";
import { TripProvider } from "./context/TripContext";
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
import "./App.css";

function App({ location }) {
  const classes = useAppGridStyle();
  const footerRoute = pathToRegex("/*");
  console.log(footerRoute);
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

          <Route path="/signUpPage">
            <SignUpPage />
          </Route>
          <Route path="/signInPage">
            <SignInPage />
          </Route>
          <Route path="/" exact>
            <LandingPage />
          </Route>
        </Switch>
      </Main>

      <Route path={footerRoute}>
        <Footer className={classes.footer}></Footer>
      </Route>
    </TripProvider>
  );
}

export default App;
