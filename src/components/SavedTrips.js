import React from "react";
import { useTripContext } from "../context/TripContext";
import CachedIcon from "@material-ui/icons/Cached";
import { Box, Typography, List, ListItem } from "@material-ui/core";
import CardCustom from "./Card";
import SavedTripsList from "./SavedTripsList";

export default function SavedTrips({ me }) {
  const { savedTrips } = useTripContext();

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
        {savedTrips && savedTrips.data.length === 0 ? (
          <Typography align="center">
            You don't have any saved trips yet
          </Typography>
        ) : (
          <SavedTripsList></SavedTripsList>
        )}
      </Box>
    </>
  );

  // <CachedIcon color="primary" onClick={handleRefreshClick} />;
}
