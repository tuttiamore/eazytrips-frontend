import React, { useState } from "react";
import { DateTime } from "luxon";
import Button from "@material-ui/core/Button";
// Material UI helper functions

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
import HighlightCard from "../components/Card";
import "../styles/tripSummary.css";
import useTripSummaryStyle from "../styles/useTripSummaryStyle";
import { useTripContext } from "../context/TripContext";
import { useHistory } from "react-router-dom";
import { save_trip, getToken, get_user_trips } from "../auth/auth";

//////////////////////
// Define TripSummary
//////////////////////

export default function TripSummary() {
  const classes = useTripSummaryStyle();
  const { tripData, setTripData } = useTripContext();
  const [stored, setStored] = useState();
  const history = useHistory();

  console.log(tripData);
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const datesSecondary = (
    <>
      {DateTime.fromISO(tripData.tripStarts).toLocaleString(
        DateTime.DATETIME_SHORT
      )}
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

  const handleSaveTrip = async () => {
    let tripToSave = tripData;
    tripData.email = getToken();

    setStored(true);
    if (tripData.email && !stored && !tripData.isStored) {
      tripData.isStored = true;
      await save_trip(tripToSave);
      await get_user_trips();
    }
    setTripData({ ...tripData, isStored: true });
    setStored(true);
  };

  const handleRedirectToLogin = () => {
    history.push("/SignInPage");
  };

  return (
    <Box
      width="100%"
      boxSizing="border-box"
      padding={2}
      component="section"
      className={classes.summaryWrapper}
    >
      <Box display="flex" justifyContent="center">
        {/* show the save /saved button if the user is logged in */}
        {getToken() && (
          <Button
            color="primary"
            variant={stored || tripData.isStored ? "contained" : "contained"}
            onClick={handleSaveTrip}
            disabled={stored || tripData.isStored}
          >
            {stored || tripData.isStored ? "Saved" : "Save"}
          </Button>
        )}
        {/* show the login button if the user is not logged in */}
        {!getToken() && (
          <Button
            color="primary"
            variant="outlined"
            onClick={handleRedirectToLogin}
          >
            Log in to save
          </Button>
        )}
      </Box>
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
