import { Stepper, Step, StepLabel, Box } from "@material-ui/core";
import Grain from "@material-ui/icons/Grain";
import TripOrigin from "@material-ui/icons/TripOrigin";

import { useHistory, useParams } from "react-router-dom";
import { useTripContext } from "../context/TripContext";

const useGetSteps = () => {
  let { day } = useParams();
  day = Number(day);

  const {
    tripData: { trip },
  } = useTripContext();
  let labels = [];

  // if trip duration >3 days: only display -1/+1 day;
  labels = trip.reduce(
    (acc, curr) => {
      // only run this if days do not fit screen, i.e. more than 4 days

      console.log("inside trip length");
      // Edge case: First day of trip or summary page
      if ((!day || day === 1) && curr.dayIndex <= 3) {
        return [
          ...acc,
          { pageIndex: curr.dayIndex, pageLabel: `Day ${curr.dayIndex}` },
        ];
        // return acc.push(`Day ${curr.dayIndex}`);
      }
      // Edge case: last dayIndex of trip
      if (day === trip.length && curr.dayIndex >= trip.length - 3) {
        return [
          ...acc,
          { pageIndex: curr.dayIndex, pageLabel: `Day ${curr.dayIndex}` },
        ];
      }

      // Edge case:  dayIndex before last dayIndex of trip
      if (day === trip.length - 1 && curr.dayIndex >= trip.length - 3) {
        return [
          ...acc,
          { pageIndex: curr.dayIndex, pageLabel: `Day ${curr.dayIndex}` },
        ];
      }

      // Remaining dayIndexs
      if (curr.dayIndex >= day - 1 && curr.dayIndex <= day + 1) {
        return [
          ...acc,
          { pageIndex: curr.dayIndex, pageLabel: `Day ${curr.dayIndex}` },
        ];
      }

      return acc;
    },
    [{ pageIndex: 0, pageLabel: "Summary" }]
  );
  return labels;
};

const IconComponent = (props) => {
  const { active, icon } = props;

  const icons = {
    1: <Grain />,
    2: <TripOrigin />,
    3: <TripOrigin />,
    4: <TripOrigin />,
    5: <TripOrigin />,
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
  const { tripData } = useTripContext();
  let { day } = useParams();
  day = !day ? 0 : Number(day);

  const activeStep = steps.findIndex((label) => {
    return day === label.pageIndex;
  });

  const handleStepClick = (e, targetPage) => {
    if (targetPage === 0) {
      return history.push(`/tripsummary`);
    }
    history.push(`/tripsingleday/${targetPage}`);
  };

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((page, index) => {
        return (
          <Step
            key={page.pageIndex}
            completed={false}
            onClick={(e) => handleStepClick(e, page.pageIndex)}
          >
            <StepLabel StepIconComponent={IconComponent}>
              {page.pageLabel}
            </StepLabel>
          </Step>
        );
      })}

      {/* only show next if days do not fit screen */}
      {tripData.trip.length >= 4 && day < tripData.trip.length - 1 && (
        <Step completed={false} onClick={(e) => handleStepClick(e, day + 1)}>
          <StepLabel StepIconComponent={IconComponent}>Next </StepLabel>
        </Step>
      )}
    </Stepper>
  );
}
