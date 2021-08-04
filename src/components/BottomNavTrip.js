import axios from "axios";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Button, Box } from "@material-ui/core";

import { useTripContext } from "../context/TripContext";

export default function BottomNavTrip() {
  const history = useHistory();
  const {
    params: { stage },
  } = useRouteMatch("/plantrip/:stage");
  const { tripDataRaw, setTripDataRaw, setTripData } = useTripContext();

  const nextDeactivated =
    !tripDataRaw.tripStarts || !tripDataRaw.tripEnds ? true : false;

  const nextPath = {
    tripdates: "accommodation",
    accommodation: "transportation",
    transportation: "suggestions",
  };

  const handleClickNext = async (nextPath, stage) => {
    // get suggestions from google places after entering transportation
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

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Button
            color="primary"
            onClick={(e) => {
              handleClickNext(nextPath, stage);
            }}
            disabled={nextDeactivated}
          >
            Skip
          </Button>
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
