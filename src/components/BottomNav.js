import { useHistory } from "react-router";

import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function BottomNav() {
  const history = useHistory();
  const handleClickSignIn = (event) => {
    if (history.location.pathname === "/signInPage") {
      return history.goBack();
    }
    return history.push("/signInPage");
  };
  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        label="Discover"
        icon={<SearchIcon></SearchIcon>}
        name="discover"
        onClick={(e) => history.push("/")}
      />
      <BottomNavigationAction
        label="Saved Trips"
        icon={<BookmarkBorderIcon />}
        onClick={(e) => history.push("/savedtrips")}
      />
      <BottomNavigationAction
        label="Profile"
        icon={<AccountCircleIcon />}
        onClick={handleClickSignIn}
      />
    </BottomNavigation>
  );
}
