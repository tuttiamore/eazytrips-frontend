import { useState } from "react";
import useSuggestedPlacesStyle from "../styles/useSuggestedPlacesStyle";
import Suggested from "../components/Card";
import { useTripContext } from "../context/TripContext";
import { useHistory } from "react-router";
import Map from "../components/Map";
import {
  Box,
  Typography,
  List,
  ListItem,
  Checkbox,
  TextField,
  Button,
} from "@material-ui/core";
import axios from "axios";

export default function SuggestedPlaces() {
  const [isSelected, setIsSelected] = useState({});
  const { tripDataRaw, setTripData } = useTripContext();
  const history = useHistory();

  console.log(isSelected);
  const handleChange = (e) => {
    // on Click: toggle selected status
    // set value of the checkbox to the opposite value of now
    setIsSelected({
      ...isSelected,
      [e.target.name]: !isSelected[e.target.name],
    });
  };

  const handleSubmit = async () => {
    // grab the raw data object: use trip context
    // add locations selected by user to the raw trip data object
    const tripDataRawUpdated = {
      ...tripDataRaw,
      userLocations: Object.keys(isSelected),
    };
    console.log(tripDataRawUpdated);

    // send updated data back to API which will calculate final itinerary
    try {
      const { data } = await axios.put(
        "https://eazytrips-backend.herokuapp.com/gettrip",
        tripDataRawUpdated
      );
      console.log("received trip:", data);
      setTripData(data);
      history.push("/tripsummary");
    } catch (err) {
      console.log(err);
    }
  };

  const classes = useSuggestedPlacesStyle();
  // const { tripData } = useTripContext();

  return (
    <>
      <Box padding={2} id="highlights-container">
        <Typography variant="h5" component="p" gutterBottom>
          Suggested Places
        </Typography>
        <Map key="1" type="SuggestedPlaces" isSelected={isSelected} />
        <List
          className={classes.listMarginBottom}
          // style={{
          //     height: "100%",
          //     overflow: "auto",
          //     padding: "8px",
          //     width: "80%",
          //     margin: "auto",
          // }}
        >
          {tripDataRaw.rawDataPlaces.map((item, index) => (
            <ListItem key={index}>
              <Checkbox
                color="primary"
                name={item.place_id}
                inputProps={{ "aria-label": "secondary checkbox" }}
                onChange={handleChange}
                checked={isSelected.place_id}
              />
              <Suggested
                type="Suggested"
                data={item.name}
                key={item.place_id}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h5" component="p" gutterBottom>
          Anything you don't want to miss?
        </Typography>

        <Box p={2}>
          <TextField
            fullWidth
            id="additionalUserLocations"
            placeholder="Enter name of sight"
            variant="filled"
          />
        </Box>

        <Box p={2} align="right">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            SKIP/NEXT
          </Button>
        </Box>
      </Box>
    </>
  );
}
