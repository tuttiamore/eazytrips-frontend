import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import HomeIcon from "@material-ui/icons/Home";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Button } from "@material-ui/core";
export default function LandingPage() {
  let history = useHistory();
  console.log(history);
  const handleClick = (e) => {
    console.log(e);
    history.push(e);
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (history.location.pathname === "/") return;
    history.goBack();
    console.log(history);
  };
  return (
    <>
      <Container>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Back"
            icon={<ArrowBackIosIcon onClick={handleBack} />}
          />
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon onClick={() => handleClick("/")} />}
          />
          <BottomNavigationAction
            label="Saved"
            icon={
              <BookmarkBorderIcon onClick={() => handleClick("/savedTrip")} />
            }
          />
        </BottomNavigation>
      </Container>
    </>
  );
}
