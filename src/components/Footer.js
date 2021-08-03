import { useHistory, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";
import BottomNavTrip from "./BottomNavTrip";

export default function Footer() {
  const location = useLocation();
  console.log("location in footer is", location);
  // const handleBack = (e) => {
  //   e.preventDefault();
  //   if (history.location.pathname === "/") return;
  //   history.goBack();
  // console.log(history);
  // };
  return (
    <>
      {!location.pathname.includes("plantrip") && <BottomNav></BottomNav>}
      {location.pathname.includes("plantrip") && (
        <BottomNavTrip></BottomNavTrip>
      )}
    </>
  );
}
