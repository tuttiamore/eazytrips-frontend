import React, { useState } from "react";
import { DateTime } from "luxon";
import Map from "../components/Map";
import Button from "@material-ui/core/Button";
// Material UI helper functions
// import { sizing, palette, spacing } from "@material-ui/system";

// Material UI ICONS
import { DirectionsWalk, Commute } from "@material-ui/icons";

// Material UI CORE components
import {
  Box,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

// Customn components and helper functions
import HighlightCard from "../components/Card";
import "../styles/tripSummary.css";

import useTripSummaryStyle from "../styles/useTripSummaryStyle";
import { useTripContext, setTripData } from "../context/TripContext";
import { save_trip, getToken } from "../auth/auth";

//////////////////////
// Define TripSummary
//////////////////////

export default function TripSummary() {
  const classes = useTripSummaryStyle();
  const { tripData, setTripData } = useTripContext();

  console.log(tripData);
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const datesSecondary = (
    <>
      {DateTime.fromISO(tripData.tripStarts).toLocaleString(
        DateTime.DATETIME_SHORT
      )}{" "}
      -<br></br>
      {DateTime.fromISO(tripData.tripEnds).toLocaleString(
        DateTime.DATETIME_SHORT
      )}
    </>
  );

  const transportationSecondary = () => {
    return (
      <>
        {tripData.transportation.walking && (
          <Box boxSizing="border-box" marginRight={1} display="inline">
            <Chip
              icon={<DirectionsWalk></DirectionsWalk>}
              label="Walking"
              // onClick={handleClick}
              onDelete={handleDelete}
              variant="outlined"
            />
          </Box>
        )}
        {tripData.transportation.public && (
          <Box boxSizing="border-box" marginRight={1} display="inline">
            <Chip
              icon={<Commute></Commute>}
              label="Public/Car"
              // onClick={handleClick}
              onDelete={handleDelete}
              variant="outlined"
            />
          </Box>
        )}
      </>
    );
  };
  const [stored, setStored] = useState();
  const handleSaveTrip = async () => {
    let tripToSave = tripData;
    tripToSave.email = getToken();
    tripToSave.isStored = true;
    setTripData(tripToSave);
    setStored(true);
    if (tripData.email && !stored) {
      tripToSave = tripData;
      await save_trip(tripToSave);
    }
    setStored(true);
  };
  return (
    <Box
      width="100%"
      boxSizing="border-box"
      padding={2}
      component="section"
      className={classes.summaryWrapper}
    >
      {getToken() && (
        <Button
          color="primary"
          variant={stored ? "outlined" : "contained"}
          onClick={handleSaveTrip}
        >
          {stored ? "Saved" : "Save"}
        </Button>
      )}
      <Box>
        <List component="ul">
          <ListItem>
            <ListItemText
              primary="Dates"
              secondary={datesSecondary}
              primaryTypographyProps={{ variant: "h6" }}
              secondaryTypographyProps={{ color: "textPrimary" }}
            />
            <ListItemText primary="Edit" className={classes.textAlignRight} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Accomodation"
              secondary={tripData.accommodation}
              primaryTypographyProps={{ variant: "h6" }}
              secondaryTypographyProps={{ color: "textPrimary" }}
            />
            <ListItemText primary="Edit" className={classes.textAlignRight} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              component="div"
              primary="Transportation"
              secondary={transportationSecondary()}
              primaryTypographyProps={{ variant: "h6" }}
              secondaryTypographyProps={{
                color: "textPrimary",
                component: "div",
              }}
            />
          </ListItem>
        </List>
      </Box>
      <Box id="highlights-container">
        <Typography variant="h5" component="p" align="center" gutterBottom>
          Highlights
        </Typography>
        <List>
          {tripData.trip.map((day) => {
            if (day.highlight.place_id) {
              return (
                <ListItem>
                  <HighlightCard
                    type="TripSummary"
                    data={day}
                    key={day.dayIndex}
                  ></HighlightCard>
                </ListItem>
              );
            }
            return null;
          })}
        </List>
      </Box>
    </Box>
  );
}
