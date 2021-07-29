import { Switch, Route } from "react-router-dom";
import { TripProvider } from "./context/TripContext";
import Grid from "@material-ui/core/Grid";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import LandingPage from "../src/views/LandingPage";
import SuggestedPlaces from "../src/views/SuggestedPlaces";
import TripSummary from "../src/views/TripSummary";
import TripSingleDay from "../src/views/TripSingleDay";
import useAppGridStyle from "../src/styles/useAppGridStyle";
import EnterDestinationPage from "../src/views/EnterDestinationPage";
import SignUpPage from "../src/views/SignUpPage";
import SignInPage from "../src/views/SignInPage";
import { PaginationProvider } from "./context/PaginationContext";
import "./App.css";

function App() {
  const classes = useAppGridStyle();
  return (
    <TripProvider>
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={12} className={classes.header}>
          <Header></Header>
        </Grid>

        <Grid item xs={12} className={classes.main}>
          <Main>
            <Switch>
              <Route path="/tripsingleday/:day">
                <TripSingleDay />
              </Route>
              <Route path="/tripsummary">
                <TripSummary />
              </Route>
              <Route path="/suggestedplaces">
                <SuggestedPlaces />
              </Route>
              <Route path="/plantrip">
                <EnterDestinationPage />
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
        </Grid>

        <Grid item xs={12} className={classes.footer}>
          <Footer></Footer>
        </Grid>
      </Grid>
    </TripProvider>
  );
}

export default App;
