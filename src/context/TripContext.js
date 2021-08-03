import { useContext, createContext, useState } from "react";
import mockBarcelona from "../dataFranz/mockBackend.json";

// Franz' injection of data, can be deleted after proper fetch has been implemented

const TripContext = createContext();
const useTripContext = () => useContext(TripContext);

const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState(mockBarcelona);
  const [tripDataRaw, setTripDataRaw] = useState(mockBarcelona);
  // new state for saved trips

  return (
    <TripContext.Provider
      value={{ tripData, setTripData, tripDataRaw, setTripDataRaw }}
    >
      {children}
    </TripContext.Provider>
  );
};

export { useTripContext, TripProvider };
