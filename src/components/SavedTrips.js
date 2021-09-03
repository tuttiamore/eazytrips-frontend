import React from "react";

import { useTripContext } from "../context/TripContext";

import { Box, Typography } from "@material-ui/core";
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
}
