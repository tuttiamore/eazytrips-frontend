import React from "react";
import { DateTime } from "luxon";
import Map from "../components/Map";

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

// Customn components and helper functions
import NavStepper from "../components/Stepper";
import HighlightCard from "../components/Card";
import "../styles/tripSummary.css";

import useTripSummaryStyle from "../styles/useTripSummaryStyle";
import { useTripContext } from "../context/TripContext";

//////////////////////
// Define TripSummary
//////////////////////

export default function TripSummary() {
  const classes = useTripSummaryStyle();
  const { tripData } = useTripContext();
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

  return (
    <>
      <Box id="stepper-nav" component="section">
        <NavStepper></NavStepper>
      </Box>

      <Box
        className={classes.headingContainer}
        id="heading-container"
        component="section"
        bgcolor="primary.main"
        width="100%"
        px={2}
        py={0}
        boxSizing="border-box"
        mb={3}
      >
        <Typography variant="h5" component="p" color="textSecondary">
          Welcome to
        </Typography>
        <Typography variant="h2" component="p" className={classes.cityHeading}>
          {tripData.destination}
        </Typography>
      </Box>
      <Map type="TripSummary" />
      <Box width="100%" boxSizing="border-box" padding={2} component="section">
        <Typography variant="h5" component="p" align="center">
          Trip summary
        </Typography>
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

      <Box padding={2} id="highlights-container">
        <Typography variant="h5" component="p" align="center" gutterBottom>
          Highlights
        </Typography>
        {tripData.trip.map((day) => {
          if (day.highlight.place_id) {
            return (
              <HighlightCard
                type="TripSummary"
                data={day}
                key={day.dayIndex}
              ></HighlightCard>
            );
          }
          return null;
        })}
      </Box>
    </>
  );
}
