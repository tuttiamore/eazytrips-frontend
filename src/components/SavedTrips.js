import React from "react";
import { useTripContext } from "../context/TripContext";
import { get_user_trips } from "../auth/auth";
import CachedIcon from "@material-ui/icons/Cached";

export default function SavedTrips({ me }) {
  const { savedTrips } = useTripContext();
  const handleRefreshClick = async () => await get_user_trips();
  console.log(me);
  console.log(savedTrips);
  return <CachedIcon color="primary" onClick={handleRefreshClick} />;
}
