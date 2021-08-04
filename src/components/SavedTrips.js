import React from "react";
import { useTripContext } from "../context/TripContext";
import { get_user_trips } from "../auth/auth";
import CachedIcon from "@material-ui/icons/Cached";
import { Box, Typography, List, ListItem } from "@material-ui/core";
import CardCustom from "./Card";
import SavedTripsList from "./SavedTripsList";

export default function SavedTrips({ me }) {
  const { savedTrips } = useTripContext();
  const handleRefreshClick = async () => await get_user_trips();
  console.log(me);
  console.log(savedTrips);
  return (
    <>
      <Box p={3}>
        <Typography
          variant="h5"
          component="p"
          color="primary"
          align="center"
          gutterBottom
        >
          Saved trips
        </Typography>
        {savedTrips && <SavedTripsList></SavedTripsList>}
      </Box>
    </>
  );

  // <CachedIcon color="primary" onClick={handleRefreshClick} />;
}
