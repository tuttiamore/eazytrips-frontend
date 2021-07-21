import { Switch, Route } from "react-router-dom";
import { TripProvider } from "./context/TripContext";
import Grid from "@material-ui/core/Grid";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import LandingPage from "./views/LandingPage";
import TripSummary from "./views/TripSummary";
import TripSingleDay from "./views/TripSingleDay";
import useAppGridStyle from "../src/styles/useAppGridStyle";
import "./App.css";

function App() {
  const classes = useAppGridStyle();
  return (
    <TripProvider>
      <Grid
        container
        style={{ height: "100%" }}
        direction="column"
        className="MuiGrid-wrap-xs-nowrap"
      >
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
