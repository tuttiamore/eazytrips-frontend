import { useContext, createContext, useState } from "react";

const TripContext = createContext();
const useTripContext = () => useContext(TripContext);

const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState("Getting Started");

  return (
    <TripContext.Provider value={{ tripData, setTripData }}>
      {children}
    </TripContext.Provider>
  );
};

export { useTripContext, TripProvider };
