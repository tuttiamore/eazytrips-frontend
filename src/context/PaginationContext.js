import { useContext, createContext, useState } from "react";
// Franz' injection of data, can be deleted after proper fetch has been implemented

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
