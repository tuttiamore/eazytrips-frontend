import React from "react";
import { Button } from "@material-ui/core";
import useLoginButtonStyle from "../styles/useLoginButtonStyle";

export default function LoginButton() {
  const classes = useLoginButtonStyle();

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      className={classes.loginButton}
    >
      Login
    </Button>
  );
}
