import React, { useState } from "react";

import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { useHistory } from "react-router-dom";

import { login, logout, get_user_trips, getToken } from "../auth/auth";

import { useTripContext } from "../context/TripContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// styles
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ me, setMe }) {
  const classes = useStyles();

  const { tripData, setSavedTrips } = useTripContext();
  const token = getToken();
  const history = useHistory();
  const handleClick = (event) => {
    history.push("/SignUpPage");
  };
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleInputChange = (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const isAuthenticated = await login(formData);
    if (isAuthenticated) {
      tripData ? history.push("/tripsummary") : history.push("/");
      const data = await get_user_trips();
      setSavedTrips(data);
      setMe(data);
    } else {
      toast.error("Invalid username or password!");
    }
  };
  const handleLogoutClick = () => {
    logout(history);
    setMe();
  };

  return (
    <Box p={3}>
      <div className={classes.paper}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        {!token && (
          <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              align="center"
            >
              <Grid item xs={12}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link href="#" variant="body2" onClick={handleClick}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        )}
        {token && (
          <Button
            onClick={handleLogoutClick}
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Out
          </Button>
        )}
      </div>
    </Box>
  );
}
