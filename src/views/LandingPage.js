import { Box, Typography } from "@material-ui/core";

import AutocompletePlaces from "../components/AutocompletePlaces";
import useLandingPageStyle from "../styles/useLandingPageStyle";
import CardCustom from "../components/Card";

export default function LandingPage() {
  const classes = useLandingPageStyle();

  return (
    <Box>
      <Box component="section" className={classes.searchBarContainer}>
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
            ></AutocompletePlaces>
          </Box>
        </Box>
      </Box>

      <Box p={2}>
        <Typography variant="h5" component="p" color="primary">
          Upcoming trips
        </Typography>
      </Box>
      <Box p={2}>
        <CardCustom type="UpcomingTrip" data={"Berlin"} />
      </Box>
    </Box>
  );
}
