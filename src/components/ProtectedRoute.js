import React from "react";
import SavedTrips from "./SavedTrips";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, me, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return me ? <SavedTrips {...props} me={me} /> : <Redirect to="./" />;
      }}
    />
  );
};

export default ProtectedRoute;
