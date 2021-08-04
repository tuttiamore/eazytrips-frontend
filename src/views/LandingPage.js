import { Box } from "@material-ui/core";

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

      <Box p={3} component="section">
        {/* Conditional render based on logged in state */}
        <DrawerCustom heading="Upcoming trips">
          <Box component="article" p={2}>
            <CardCustom type="UpcomingTrip" data={"Berlin"} />
          </Box>
          <Box component="article" p={2}>
            <LoginButton></LoginButton>
          </Box>
        </DrawerCustom>
      </Box>
    </Box>
  );
}
