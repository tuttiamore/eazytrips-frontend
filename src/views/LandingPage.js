import { Link, useHistory } from "react-router-dom";

import { Box, List, ListItem, Typography } from "@material-ui/core";

import AutocompletePlaces from "../components/AutocompletePlaces";
import DrawerCustom from "../components/DrawerCustom";
import useLandingPageStyle from "../styles/useLandingPageStyle";
import CardCustom from "../components/Card";
import LoginButton from "../components/LoginButton";
import SavedTripsList from "../components/SavedTripsList";

import { getToken } from "../auth/auth";
import { useTripContext } from "../context/TripContext";

export default function LandingPage() {
  const classes = useLandingPageStyle();
  const { savedTrips, setTripData } = useTripContext();
  const history = useHistory();

  const handleTripSelect = (tripId) => {
    setTripData(savedTrips.data.find((trip) => trip.tripId === tripId));
    history.push(`/tripsummary`);
  };

  return (
    <Box className={classes.searchBarContainer}>
      <Box
        component="article"
        p={2}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Box my={10} width="70%">
          <Box component="article" p={2}>
            <img
              src="./easzytrips-2-white.png"
              style={{ maxWidth: "100%" }}
              alt="View on street with skyscrapers rising left and right"
            ></img>
          </Box>

          <AutocompletePlaces
            nextPath={"/plantrip/tripdates"}
            isSearchIcon={true}
            variant="standard"
            placeType="destination"
          ></AutocompletePlaces>
        </Box>
      </Box>

      {/* Conditional render based on logged in state */}
      <DrawerCustom heading="Upcoming trips">
        {getToken() && savedTrips && <SavedTripsList></SavedTripsList>}
        {getToken() && savedTrips && savedTrips.data.length === 0 && (
          <Typography align="center">
            You don't have any saved trips yet
          </Typography>
        )}

        {!getToken() && (
          <>
            <Box pb={2}>
              <Typography align="center" variant="body1" gutterBottom>
                You must be logged in to view this feature.
              </Typography>
            </Box>

            <Link to="/signInPage">
              <LoginButton></LoginButton>
            </Link>
          </>
        )}
      </DrawerCustom>
    </Box>
  );
}
