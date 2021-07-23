import React from "react";
//import { animateScroll as scroll } from "react-scroll";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import examplePicture from "../media/sampleCardPic.jpg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useCardStyle from "../styles/useCardStyle";
import LandscapeIcon from "@material-ui/icons/Landscape";
import mockData from "../mock.json";

export default function RecipeReviewCard({ type, data }) {
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
  const convertTime = (time) => {
    return DateTime.fromISO(time).toLocaleString(DateTime.TIME_SIMPLE);
  };
  const avatarImage = examplePicture;

  if (type === "TripSummary") {
    const place = mockData.rawDataPlaces.find(
      (item) => item.place_id === data.highlights.place_id
    );
    const tripInfo = data ? data : mockData.trip[0];

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
          title={place.name}
          subheader={`Date: ${tripInfo.day}`}
        />
      </Card>
    );
  }
  if (type === "TripSingleDay") {
    const place = mockData.rawDataPlaces.find(
      (item) => item.place_id === data.place_id
    );
    const tripInfo = data ? data : mockData.trip[0];
    //console.log(tripInfo);
    console.log();

    //console.log(tripInfo.arrivalTime);
    return (
      <Card className={classes.outer}>
        <CardHeader
          className={classes.root}
          avatar={
            <Avatar
              variant="rounded"
              aria-label="default"
              className={classes.large}
              src={avatarImage && avatarImage}
            >
              <LandscapeIcon />
            </Avatar>
          }
          title={place.name}
          subheader={`${convertTime(tripInfo.arrivalTime)} - ${convertTime(
            tripInfo.departureTime
          )}`}
        />

        <CardActions className={classes.tick} disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {" "}
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Address: {place.vicinity}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
  if (type === "UpcomingTrip") {
    const tripName = data ? data : mockData.trip[0];

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
        />
      </Card>
    );
  }
}
