import { Box, Typography } from "@material-ui/core";

import AutocompletePlaces from "./AutocompletePlaces";

export default function TripAccomodation() {
  return (
    <>
      <Box mt={1} mb={4}>
        <Typography variant="h5" component="p" color="primary" gutterBottom>
          Accommodation
        </Typography>
        <Typography
          variant="body2"
          component="p"
          color="textPrimary"
          gutterBottom
        >
          Where are you staying?
        </Typography>
      </Box>
      <Box mt={1} mb={4}>
        <AutocompletePlaces
          nextPath="/plantrip/transportation"
          isSearchIcon={false}
          variant="outlined"
          placeType="accommodation"
        ></AutocompletePlaces>
      </Box>
    </>
  );
}
