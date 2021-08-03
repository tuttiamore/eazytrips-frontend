import { useHistory } from "react-router";

import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function BottomNav() {
  const history = useHistory();
  const handleClick = (event) => {
    history.push("/signUpPage");
    // console.log(event);
  };
  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction label="Discover" icon={<SearchIcon />} />
      <BottomNavigationAction
        label="Saved Trips"
        icon={<BookmarkBorderIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        icon={<AccountCircleIcon onClick={() => handleClick("/userAccount")} />}
      />
    </BottomNavigation>
  );
}
