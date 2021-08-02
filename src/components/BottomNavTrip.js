import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import HomeIcon from "@material-ui/icons/Home";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Button, Box, Typography } from "@material-ui/core";
import useBottomNavTripStyle from "../styles/useBottomNavTripStyle";

export default function BottomNavTrip() {
  const classes = useBottomNavTripStyle();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   // build the request object
  //   const req = {
  //     destination: tripUserInput.destination,
  //     tripName: `Trip to ${tripUserInput.destination}`,
  //     tripStarts: tripUserInput.tripStarts,
  //     tripEnds: tripUserInput.tripEnds,
  //     accommodation: tripUserInput.accommodation,
  //     transportation: {
  //       walking: tripUserInput.walking,
  //       public: tripUserInput.public,
  //     },
  //   };

  //   //fetch sight suggestions for destination and store them in context

  //   try {
  //     const { data } = await axios.post(
  //       "https://eazytrips-backend.herokuapp.com/gettrip",
  //       req
  //     );
  //     console.log(data);
  //     setTripDataRaw(data);
  //     history.push("/suggestedplaces");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography className={classes.skip}>Skip</Typography>
        </Box>

        <Box>
          <Button variant="contained" color="primary" type="submit">
            Next
          </Button>
        </Box>
      </Box>

      {/* <BottomNavigationAction
        label="Back"
        icon={
          <ArrowBackIosIcon
            onClick={() => {
              console.log("click");
            }}
          />
        }
      />
      <BottomNavigationAction
        label="Home"
        icon={
          <HomeIcon
            onClick={() => {
              console.log("click");
            }}
          />
        }
      />
      <BottomNavigationAction
        label="Saved"
        icon={
          <BookmarkBorderIcon
            onClick={() => {
              console.log("click");
            }}
          />
        }
      /> */}
    </Box>
  );
}
