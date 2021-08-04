import { useContext, createContext, useState } from "react";
import mockData from "../dataFranz/mockBerlin.json";

// Franz' injection of data, can be deleted after proper fetch has been implemented

const TripContext = createContext();
const useTripContext = () => useContext(TripContext);

const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState(mockData);
  const [tripDataRaw, setTripDataRaw] = useState(mockData);

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
