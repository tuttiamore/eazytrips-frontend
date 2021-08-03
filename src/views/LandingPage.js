import { Box, Typography, Button } from "@material-ui/core";

import AutocompletePlaces from "../components/AutocompletePlaces";
import DrawerCustom from "../components/DrawerCustom";
import useLandingPageStyle from "../styles/useLandingPageStyle";
import CardCustom from "../components/Card";
import LoginButton from "../components/LoginButton";

export default function LandingPage() {
  const classes = useLandingPageStyle();

  return (
    <Box className={classes.searchBarContainer}>
      <Box
        component="article"
        p={2}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Box my={8} width="70%">
          <Typography
            variant="h3"
            component="p"
            className={classes.headingDiscover}
            gutterBottom
            align="center"
          >
            Discover
          </Typography>
          <AutocompletePlaces
            nextPath={"/plantrip/tripdates"}
            isSearchIcon={true}
            variant="standard"
            placeType="destination"
          ></AutocompletePlaces>
        </Box>
      </Box>

      <Box p={3} component="section">
        {/* Conditional render based on logged in state */}
        <Box component="article">
          <DrawerCustom>
            <Typography variant="h5" component="p" color="primary">
              Upcoming trips
            </Typography>
            <Box component="article" py={2}>
              <CardCustom type="UpcomingTrip" data={"Berlin"} />
            </Box>

            <Box component="article" py={2}>
              <LoginButton></LoginButton>
            </Box>
          </DrawerCustom>
        </Box>
      </Box>
    </Box>
  );
}
