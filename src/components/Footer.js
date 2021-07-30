import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
export default function LandingPage() {

  let history = useHistory();

  const handleClick = (event) => {
    history.push("/signUpPage");
    // console.log(event);
  };

  // const handleBack = (e) => {
  //   e.preventDefault();
  //   if (history.location.pathname === "/") return;
  //   history.goBack();
  // console.log(history);
  // };
  return (
    <>
      <Container>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Discover"
            icon={<SearchIcon />}
          />
          <BottomNavigationAction
            label="Saved Trips"
            icon={
              <BookmarkBorderIcon />
            }
          />
          <BottomNavigationAction
            label="Profile"
            icon={<AccountCircleIcon onClick={() => handleClick("/userAccount")} />}
          />
        </BottomNavigation>
      </Container>
    </>
  );
}
