import clsx from "clsx";
import { useState } from "react";
import axios from "axios";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { Button, Box, Typography } from "@material-ui/core";

import { useTripContext } from "../context/TripContext";

import useBottomNavTripStyle from "../styles/useBottomNavTripStyle";

export default function BottomNavTrip() {
  const classes = useBottomNavTripStyle();
  const history = useHistory();
  const {
    params: { stage },
  } = useRouteMatch("/plantrip/:stage");
  const { tripDataRaw, setTripDataRaw, setTripData } = useTripContext();

  const skipDeactivated = stage.includes("tripdates") ? true : false;
  const nextDeactivated =
    !tripDataRaw.tripStarts || !tripDataRaw.tripEnds ? true : false;

  const nextPath = {
    tripdates: "accommodation",
    accommodation: "transportation",
    transportation: "suggestions",
  };

  const handleClickSkip = (skipDeactivated, nextPath, stage) => {
    if (skipDeactivated) return;
    history.push(`/plantrip/${nextPath[stage]}`);
  };

  const handleClickNext = async (nextPath, stage) => {
    // get suggestions from google places
    if (stage === "transportation") {
      console.log(tripDataRaw);

      const req = {
        ...tripDataRaw,
        tripName: `Trip to ${tripDataRaw.destination}`,
      };

      // //fetch sight suggestions for destination and store them in context

      try {
        const { data } = await axios.post(
          "https://eazytrips-backend.herokuapp.com/gettrip",
          req
        );
        console.log(data);
        setTripDataRaw(data);
        history.push("/plantrip/suggestions");
      } catch (err) {
        console.log(err);
      }
    } else if (stage === "suggestions") {
      //   // send updated data back to API which will calculate final itinerary

      try {
        const { data } = await axios.put(
          "https://eazytrips-backend.herokuapp.com/gettrip",
          tripDataRaw
        );
        console.log("received trip:", data);
        setTripData(data);
        history.push("/tripsummary");
      } catch (err) {
        console.log(err);
      }
    } else {
      history.push(`/plantrip/${nextPath[stage]}`);
    }
  };

  //   MOVE THIS TO BOTTOM TRIP NAV
  // const handleSubmit = async () => {
  //   // grab the raw data object: use trip context
  //   // add locations selected by user to the raw trip data object
  //   const tripDataRawUpdated = {
  //     ...tripDataRaw,
  //     userLocations: Object.keys(isSelected),
  //   };
  //   console.log(tripDataRawUpdated);

  //   try {
  //     const { data } = await axios.put(
  //       "https://eazytrips-backend.herokuapp.com/gettrip",
  //       tripDataRawUpdated
  //     );
  //     console.log("received trip:", data);
  //     setTripData(data);
  //     history.push("/tripsummary");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography
            className={clsx(classes.skip, {
              [classes.skipDeactivated]: skipDeactivated,
            })}
            onClick={(e) => {
              handleClickSkip(skipDeactivated, nextPath, stage);
            }}
          >
            Skip
          </Typography>
        </Box>

        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              handleClickNext(nextPath, stage);
            }}
            disabled={nextDeactivated}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}