import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import { useParams, useHistory, useLocation } from "react-router-dom";

import { useTripContext } from "../context/TripContext";

// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const useGetSteps = () => {
  let { day } = useParams();
  day = Number(day);

  const { pathname } = useLocation();
  // console.log(location.pathname);
  const {
    tripData: { trip },
  } = useTripContext();
  let labels = [];

  // if trip duration >3 days: only display -1/+1 day;
  labels = trip.reduce(
    (acc, curr, index) => {
      // Edge case: First day of trip or summary page
      if ((day === 1 || pathname === "/tripsummary") && curr.day <= 3) {
        return [...acc, { pageIndex: curr.day, pageLabel: `Day ${curr.day}` }];
        // return acc.push(`Day ${curr.day}`);
      }
      // Edge case: last day of trip
      if (day === trip.length && curr.day >= trip.length - 2) {
        return [...acc, { pageIndex: curr.day, pageLabel: `Day ${curr.day}` }];
      }

      // Remaining days
      if (curr.day >= day - 1 && curr.day <= day + 1) {
        return [...acc, { pageIndex: curr.day, pageLabel: `Day ${curr.day}` }];
      }

      return acc;
    },
    [{ pageIndex: 0, pageLabel: "Summary" }]
  );
  console.log(labels);
  console.log(trip);
  return labels;
};

export default function NavStepper() {
  const classes = useStyles();
  const steps = useGetSteps();
  const history = useHistory();
  const { day } = useParams();
  const location = useLocation();
  let activeStep;

  if (location.pathname === "/tripsummary") {
    activeStep = 0;
  } else {
    activeStep = steps.reduce((acc, curr, index) => {
      if (curr.pageIndex === Number(day)) {
        return acc + index;
      }
      return acc;
    }, 0);
  }

  console.log(activeStep);

  const handleStepClick = (e, index, pageIndex) => {
    if (index === 0) {
      return history.push(`/tripsummary`);
    }
    history.push(`/tripsingleday/${pageIndex}`);
  };

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((page, index) => (
          <Step
            key={page.pageIndex}
            completed={false}
            onClick={(e) => handleStepClick(e, index, page.pageIndex)}
          >
            <StepLabel>{page.pageLabel}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}

// function getStepContent(stepIndex) {
//   switch (stepIndex) {
//     case 0:
//       return "Select campaign settings...";
//     case 1:
//       return "What is an ad group anyways?";
//     case 2:
//       return "This is the bit I really care about!";
//     default:
//       return "Unknown stepIndex";
//   }
// }
