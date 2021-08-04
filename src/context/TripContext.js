import { useContext, createContext, useState } from "react";
import mockBarcelona from "../dataFranz/mockBackend.json";

// Franz' injection of data, can be deleted after proper fetch has been implemented

const TripContext = createContext();
const useTripContext = () => useContext(TripContext);

const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState();
  const [tripDataRaw, setTripDataRaw] = useState();
  const [savedTrips, setSavedTrips] = useState();
  // new state for saved trips

  return (
    <TripContext.Provider
      value={{
        tripData,
        setTripData,
        tripDataRaw,
        setTripDataRaw,
        savedTrips,
        setSavedTrips,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export { useTripContext, TripProvider };
