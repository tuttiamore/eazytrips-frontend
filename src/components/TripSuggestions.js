import { useState, useEffect } from "react";
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

export default function TripSuggestions() {
  const [isSelected, setIsSelected] = useState({});
  const { tripDataRaw, setTripDataRaw, setTripData } = useTripContext();
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

  useEffect(() => {
    const selectedPlaces = Object.keys(isSelected).filter((placeId) => {
      return isSelected[placeId];
    });
    setTripDataRaw({ ...tripDataRaw, userLocations: selectedPlaces });
  }, [isSelected]);

  const classes = useSuggestedPlacesStyle();
  // const { tripData } = useTripContext();

  return (
    <>
      <Box id="highlights-container">
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
      </Box>
    </>
  );
}
