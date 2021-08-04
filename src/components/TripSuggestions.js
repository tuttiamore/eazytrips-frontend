import { useState, useEffect } from "react";
import useSuggestedPlacesStyle from "../styles/useSuggestedPlacesStyle";
import Suggested from "../components/Card";
import { useTripContext } from "../context/TripContext";
import {
  Box,
  Typography,
  List,
  ListItem,
  Checkbox,
  TextField,
} from "@material-ui/core";

export default function TripSuggestions() {
  const [isSelected, setIsSelected] = useState({});
  const { tripDataRaw, setTripDataRaw } = useTripContext();

  const handleChange = (e) => {
    // on Click: toggle selected status
    // set value of the checkbox to the opposite value of now
    setIsSelected({
      ...isSelected,
      [e.target.name]: !isSelected[e.target.name],
    });
  };

  useEffect(() => {
    console.log("suggestions rerendered");
    const selectedPlaces = Object.keys(isSelected).filter((placeId) => {
      return isSelected[placeId];
    });
    setTripDataRaw({ ...tripDataRaw, userLocations: selectedPlaces });
    // eslint-disable-next-line
  }, [isSelected]);

  const classes = useSuggestedPlacesStyle();

  return (
    <>
      <Box id="highlights-container">
        <Typography variant="h5" component="p" gutterBottom>
          Suggested Places
        </Typography>
        <List className={classes.listMarginBottom}>
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
