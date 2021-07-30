import React from "react";
//import { animateScroll as scroll } from "react-scroll";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import examplePicture from "../media/sampleCardPic.jpg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from "react-router";
import useCardStyle from "../styles/useCardStyle";

import mockData from "../dataFranz/mockBerlin.json";
import { useTripContext } from "../context/TripContext";
import MuseumIcon from "@material-ui/icons/Museum";
//import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
//import BeachAccessIcon from "@material-ui/icons/BeachAccess";
//import DirectionsIcon from "@material-ui/icons/Directions";
import LandscapeIcon from "@material-ui/icons/Landscape";
import HotelIcon from "@material-ui/icons/Hotel";
//import LocalFloristIcon from "@material-ui/icons/LocalFlorist";
import NaturePeopleIcon from "@material-ui/icons/NaturePeople";
import WavesIcon from "@material-ui/icons/Waves";

//import LocationCityIcon from "@material-ui/icons/LocationCity";

export default function TripCard({ type, data }) {
  //console.log(mockData);
  //const time = luxon.DateTime;
  const { DateTime } = require("luxon");
  const classes = useCardStyle();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    // scroll.scrollToBottom();
    // scroll.scrollMore(5000);
  };
  let history = useHistory();
  const handleDaySelectClick = (chosenDay) => {
    // console.log(chosenDay);
    history.push(`/tripsingleday/${chosenDay}`);
  };
  const handleUpcomingTripSelectClick = () => {
    history.push(`/tripSummary`);
  };
  const convertTime = (Ztime) => {
    const time = Ztime.substring(0, Ztime.length);
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
    const tripInfo = data ? data : mockData.trip[0];
    //console.log(place);
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
    const tripInfo = data ? data : mockData.trip[0];
    //console.log(tripInfo);
    // console.log();

    //console.log(tripInfo.arrivalTime);
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
            {" "}
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
    const tripName = data ? data : mockData.trip[0];

    return (
      <Card
        className={classes.landing}
        onClick={() => handleUpcomingTripSelectClick()}
      >
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
        />
      </Card>
    );
  }
  if (type === "Suggested") {
    const tripName = data ? data : mockData.trip[0];

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
    const tripName = data ? data : mockData.trip[0];

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
}
