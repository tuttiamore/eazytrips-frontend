import React from "react";
import NavStepper from "../components/Stepper";
import CardPlaceholder from "../components/CardPlaceholder";
import Box from "@material-ui/core/Box";
import Star from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";
import useTripSummaryStyle from "../styles/useTripSummaryStyle";
import "../styles/tripSummary.css";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

export default function TripSummary() {
  const classes = useTripSummaryStyle();
  return (
    <>
      <Box id="stepper-nav" component="section">
        <NavStepper></NavStepper>
      </Box>

      <Box
        className={classes.headingContainer}
        id="heading-container"
        component="section"
      >
        <Typography variant="h5" component="p" color="textSecondary">
          Welcome to
        </Typography>
        <Typography variant="h2" component="p" color="textPrimary">
          Barcelona
        </Typography>
      </Box>

      <section></section>

      <Box padding={1} id="highlights-container">
        <Timeline>
          <TimelineItem classes={{ root: "removeLeftSpace" }}>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <Star fontSize="large" color="secondary"></Star>
              </TimelineDot>
              <TimelineConnector color="secondary" />
            </TimelineSeparator>
            <TimelineContent>
              <CardPlaceholder></CardPlaceholder>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem classes={{ root: "removeLeftSpace" }}>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined">
                <Star fontSize="large" color="secondary"></Star>
              </TimelineDot>
              <TimelineConnector color="secondary" />
            </TimelineSeparator>
            <TimelineContent classes={{ root: "removeLeftSpace" }}>
              <CardPlaceholder></CardPlaceholder>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem classes={{ root: "removeLeftSpace" }}>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined">
                <Star fontSize="large" color="secondary"></Star>
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent classes={{ root: "removeLeftSpace" }}>
              <CardPlaceholder></CardPlaceholder>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Box>
    </>
  );
}
