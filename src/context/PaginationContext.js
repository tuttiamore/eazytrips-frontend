import { useContext, createContext, useState } from "react";

const PaginationContext = createContext();
const usePaginationContext = () => useContext(PaginationContext);

const PaginationProvider = ({ children }) => {
  const [page, setPage] = useState(0);

  return (
    <PaginationContext.Provider value={{ page, setPage }}>
      {children}
    </PaginationContext.Provider>
  );
};

export { usePaginationContext, PaginationProvider };
