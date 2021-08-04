import React from "react";
import ReactDOM from "react-dom";
import Box from "@material-ui/core/Box";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { TripProvider } from "./context/TripContext";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { deleteToken } from "./auth/auth";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Rubik",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

deleteToken();

ReactDOM.render(
  <Router>
    <TripProvider>
      <ThemeProvider theme={theme}>
        <Box
          style={{
            height: "100vh",
          }}
        >
          <App />
        </Box>
      </ThemeProvider>
    </TripProvider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
