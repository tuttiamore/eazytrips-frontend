import { useHistory } from "react-router-dom";

import { List, ListItem } from "@material-ui/core";
import CardCustom from "../components/Card";

import { useTripContext } from "../context/TripContext";

export default function SavedTripsList() {
  const { savedTrips, setTripData } = useTripContext();
  const history = useHistory();

  const handleTripSelect = (tripId) => {
    setTripData(savedTrips.data.find((trip) => trip.tripId === tripId));
    history.push("/tripsummary");
  };

  return (
    <>
      {savedTrips && (
        <List>
          {savedTrips.data.map((trip) => {
            return (
              <ListItem onClick={() => handleTripSelect(trip.tripId)}>
                <CardCustom
                  type="UpcomingTrip"
                  data={trip.destination}
                  tripStarts={trip.tripStarts}
                  tripEnds={trip.tripEnds}
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
}
