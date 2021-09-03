import React from "react";
import clsx from "clsx";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";

import MuseumIcon from "@material-ui/icons/Museum";
import LandscapeIcon from "@material-ui/icons/Landscape";
import HotelIcon from "@material-ui/icons/Hotel";
import NaturePeopleIcon from "@material-ui/icons/NaturePeople";
import WavesIcon from "@material-ui/icons/Waves";

import examplePicture from "../media/sampleCardPic.jpg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useHistory } from "react-router";

import useCardStyle from "../styles/useCardStyle";

import { useTripContext } from "../context/TripContext";

export default function TripCard({ type, data, tripStarts, tripEnds }) {
  const { DateTime } = require("luxon");
  const classes = useCardStyle();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let history = useHistory();
  const handleDaySelectClick = (chosenDay) => {
    history.push(`/tripsingleday/${chosenDay}`);
  };
  // };
  const convertTime = (Ztime) => {
    if (type === "UpcomingTrip") {
      const time = Ztime.substring(0, Ztime.length);
      return DateTime.fromISO(time).toLocaleString(DateTime.Date);
    }
    const time = Ztime.substring(0, Ztime.length - 1);
    return DateTime.fromISO(time).toLocaleString(DateTime.TIME_SIMPLE);
  };
  const convertDate = (date) => {
    return DateTime.fromISO(date).toLocaleString(
      DateTime.DateTimeFormatOptions
    );
  };
  const getAvatarImage = (placeType) => {
    if (placeType.includes("museum")) return <MuseumIcon />;
    if (placeType.includes("aquarium")) return <WavesIcon />;
    if (placeType.includes("place_of_worship")) return "⛪";
    if (placeType.includes("park")) return <NaturePeopleIcon />;
    if (placeType.includes("city_hall")) return <MuseumIcon />;
    return <NaturePeopleIcon />;
  };
  const avatarImage = examplePicture;
  const { tripData } = useTripContext();
  if (type === "TripSummary") {
    const place = tripData.rawDataPlaces.find(
      (item) => item.place_id === data.highlight.place_id
    );
    const tripInfo = data;
    return (
      <Card
        className={classes.root}
        onClick={() => handleDaySelectClick(tripInfo.dayIndex)}
      >
        <CardHeader
          avatar={
            <Avatar
              variant="rounded"
              aria-label="default"
              className={classes.avatar}
              src={avatarImage && avatarImage}
            >
              {getAvatarImage(place.types)}
            </Avatar>
          }
          title={place.name}
          subheader={convertDate(tripInfo.date)}
        />
      </Card>
    );
  }
  if (type === "TripSingleDay") {
    const place = tripData.rawDataPlaces.find(
      (item) => item.place_id === data.place_id
    );
    const tripInfo = data;

    return (
      <Card className={classes.outer} onClick={handleExpandClick}>
        <CardHeader
          className={classes.root}
          avatar={
            <Avatar
              variant="rounded"
              aria-label="default"
              className={classes.large}
            >
              {getAvatarImage(place.types)}
            </Avatar>
          }
          title={place.name}
          subheader={`${convertTime(tripInfo.arrivalTime)} - ${convertTime(
            tripInfo.departureTime
          )}`}
        />

        <CardActions className={classes.tick} disableSpacing>
          <Typography variant="caption" className={classes.expand}>
            {!expanded && "show more"}
          </Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.root}>
            <Typography variant="caption" className={classes.address}>
              Address: {place.vicinity}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
  if (type === "UpcomingTrip") {
    const tripName = data;

    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              variant="rounded"
              aria-label="default"
              className={classes.avatar}
              src={avatarImage && avatarImage}
            >
              <LandscapeIcon />
            </Avatar>
          }
          title={tripName}
          subheader={`${convertTime(tripStarts)} - ${convertTime(tripEnds)}`}
        />
      </Card>
    );
  }
  if (type === "Suggested") {
    const tripName = data;

    return (
      <Card className={classes.suggested}>
        <CardHeader
          avatar={
            <Avatar
              variant="rounded"
              aria-label="default"
              className={classes.avatar}
              src={avatarImage && avatarImage}
            >
              <LandscapeIcon />
            </Avatar>
          }
          title={tripName}
          titleTypographyProps={{ noWrap: false }}
        />
      </Card>
    );
  }
  if (type === "Accommodation") {
    const tripName = data;

    return (
      <Card className={classes.accommodation}>
        <CardHeader
          className={classes.root}
          avatar={
            <Avatar
              variant="rounded"
              aria-label="default"
              className={classes.large}
            >
              <HotelIcon />
            </Avatar>
          }
          title={tripName}
        />
      </Card>
    );
  }
  if (type === "LunchBreak") {
    return (
      <Card className={classes.outer}>
        <CardHeader
          className={classes.root}
          avatar={
            <Avatar
              variant="rounded"
              aria-label="default"
              className={classes.large}
            ></Avatar>
          }
          title={"Let's grab something to eat"}
        />
      </Card>
    );
  }
}
