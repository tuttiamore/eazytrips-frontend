import { useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";
import BottomNavTrip from "./BottomNavTrip";

export default function Footer({ className }) {
  const location = useLocation();
  return (
    <div className={className}>
      {!location.pathname.includes("plantrip") && <BottomNav></BottomNav>}
      {location.pathname.includes("plantrip") && (
        <BottomNavTrip></BottomNavTrip>
      )}
    </div>
  );
}
