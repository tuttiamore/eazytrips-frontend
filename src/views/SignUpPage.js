import React, { useState } from "react";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { makeStyles } from "@material-ui/core/styles";
import "react-toastify/dist/ReactToastify.css";

import { useHistory } from "react-router-dom";

import validator from "validator";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const history = useHistory();
  const handleSignInClick = (event) => {
    history.push("/SignInPage");
  };
  const [mailError, setMailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleFormInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMailError(false);
    setNameError(false);
    setPasswordError(false);
    console.log(formData);
    if (!validator.isEmail(formData.email)) {
      return setMailError({ isError: true, message: "Invalid email address!" });
    }
    if (
      !validator.isAlpha(formData.first_name) ||
      !validator.isAlpha(formData.last_name)
    ) {
      return setNameError({
        isError: true,
        message: "Names should only contain letters",
      });
    }
    if (validator.isStrongPassword(formData.password)) {
      return setPasswordError({
        isError: true,
        message: "Password is not strong enough!",
      });
    }
    createUser(formData);
  };

  const createUser = async (formData) => {
    try {
      const data = await axios.post(
        "https://eazytrips-backend.herokuapp.com/user",
        formData
      );
      const token = data.headers["x-authorization-token"];
      if (token) {
        history.push("/SignInPage");
      }
    } catch (error) {
      toast.error("This email address is already in use!");
    }
  };

  return (
    <>
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  error={nameError.isError}
                  helperText={nameError.message}
                  required
                  fullWidth
                  id="first_Name"
                  label="First Name"
                  name="first_name"
                  autoComplete="fname"
                  value={formData.first_name}
                  onChange={handleFormInput}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  error={nameError.isError}
                  helperText={nameError.message}
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="lname"
                  value={formData.last_name}
                  onChange={handleFormInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  error={mailError.isError}
                  helperText={mailError.message}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleFormInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  error={passwordError.isError}
                  helperText={passwordError.message}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleFormInput}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                  onChange={handleFormInput}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" onClick={handleSignInClick}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {/* <Box mt={5}>
                <Copyright />
            </Box> */}
      </Container>
    </>
  );
}
