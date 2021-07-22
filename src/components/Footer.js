import React from "react";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import HomeIcon from '@material-ui/icons/Home';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";

export default function LandingPage() {

  let history = useHistory();

  const handleClick = (e) => {
    console.log(e);
    history.push(e)
  }
  return (
    <>
      <Container>
        <BottomNavigation showLabels>
          <BottomNavigationAction label="Home" icon={<HomeIcon onClick={() => handleClick("/")} />} />
          <BottomNavigationAction label="New Trip" icon={
            <Fab color="primary" aria-label="add">
              <AddIcon onClick={() => handleClick("/newTrip")} />
            </Fab>
          } />
          <BottomNavigationAction label="Saved" icon={<BookmarkBorderIcon onClick={() => handleClick("/savedTrip")} />} />
        </BottomNavigation>
      </Container>
    </>
  );
}
