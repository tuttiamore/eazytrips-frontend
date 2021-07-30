import { Switch, Route, withRouter } from "react-router-dom";
import { TripProvider } from "./context/TripContext";
import Box from "@material-ui/core/Grid";
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
import WelcomePage from "../src/views/WelcomePage";
import "./App.css";

function App({ location }) {
  const classes = useAppGridStyle();
  return (
    <TripProvider>
      {/* <Grid item xs={12} className={classes.header}>
          {location.pathname !== "/" && <Header></Header>}
        </Grid> */}

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
          <Route path="/landingpage" >
            <LandingPage />
          </Route>
          <Route path="/" exact>
            <WelcomePage />
          </Route>
        </Switch>
      </Main>

      <Box className={classes.footer}>
        {location.pathname !== "/" && <Footer location={location} ></Footer>}
      </Box>
    </TripProvider>
  );
}

export default withRouter(App);
