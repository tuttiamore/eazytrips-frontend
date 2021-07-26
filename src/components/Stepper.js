import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Box from "@material-ui/core/Box";
import Grain from "@material-ui/icons/Grain";
import TripOrigin from "@material-ui/icons/TripOrigin";

import { useHistory } from "react-router-dom";
import { useTripContext } from "../context/TripContext";
import { usePaginationContext } from "../context/PaginationContext";

const useGetSteps = () => {
  const { page } = usePaginationContext();

  const {
    tripData: { trip },
  } = useTripContext();
  let labels = [];

  // if trip duration >3 days: only display -1/+1 day;
  labels = trip.reduce(
    (acc, curr, index) => {
      // Edge case: First day of trip or summary page
      if ((page === 0 || page === 1) && curr.day <= 3) {
        return [...acc, { pageIndex: curr.day, pageLabel: `Day ${curr.day}` }];
        // return acc.push(`Day ${curr.day}`);
      }
      // Edge case: last day of trip
      if (page === trip.length && curr.day >= trip.length - 2) {
        return [...acc, { pageIndex: curr.day, pageLabel: `Day ${curr.day}` }];
      }

      // Remaining days
      if (curr.day >= page - 1 && curr.day <= page + 1) {
        return [...acc, { pageIndex: curr.day, pageLabel: `Day ${curr.day}` }];
      }

      return acc;
    },
    [{ pageIndex: 0, pageLabel: "Summary" }]
  );
  return labels;
};

const IconComponent = (props) => {
  const { active, icon } = props;

  // alternative icons for summary: flair,
  const icons = {
    1: <Grain />,
    2: <TripOrigin />,
    3: <TripOrigin />,
    4: <TripOrigin />,
  };

  return (
    <Box color={active ? "primary.main" : "text.secondary"}>
      {icons[String(icon)]}
    </Box>
  );
};

export default function NavStepper() {
  const steps = useGetSteps();
  const history = useHistory();
  const { page, setPage } = usePaginationContext();

  const activeStep = steps.findIndex((label) => page === label.pageIndex);

  const handleStepClick = (e, targetPage) => {
    setPage(targetPage);
    if (targetPage === 0) {
      return history.push(`/tripsummary`);
    }
    history.push(`/tripsingleday/${targetPage}`);
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
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((page, index) => (
        <Step
          key={page.pageIndex}
          completed={false}
          onClick={(e) => handleStepClick(e, page.pageIndex)}
        >
          <StepLabel StepIconComponent={IconComponent}>
            {page.pageLabel}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
