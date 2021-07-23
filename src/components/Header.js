import React from "react";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from "react-router-dom";

const options = [
  'Home',
  'TripSummary',
  'tripsingleday',
];

const ITEM_HEIGHT = 48;

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    history.push(event);
    console.log(event);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLinks = (e) => {
    setAnchorEl(null);
    e === "Home" ? history.push("/") : e === "TripSummary" ? history.push("/tripsummary") : history.push("/tripsingleday/:day")
    console.log(e);
    history.push();
  };


  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
    >
      <AccountCircleIcon onClick={() => handleClick("/userAccount")} />
      <div >
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} selected={option === { option }} onClick={() => handleLinks(option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Grid>
  );
}
