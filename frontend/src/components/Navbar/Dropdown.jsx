import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { Link } from "react-router-dom";
import Popup from './Popup';

export default function Dropdown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  console.log(props);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <img width='22' height='20' className='navbar-desktop-profile-picture' src={props.profileImageURL}/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/profile">
            <MenuItem onClick={handleClose}>{props.name.replace("_", "")}</MenuItem>
        </Link>
        <Link to="/find">
            <MenuItem onClick={handleClose}>Find Teammates</MenuItem>
        </Link>
        <Link to="/teams">
            <MenuItem onClick={handleClose}>My Teams</MenuItem>
        </Link>
        <Link to="/settings">
            <MenuItem onClick={handleClose}>Settings</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>
          <Popup text = {"sample text"} />
        </MenuItem>
      </Menu>
    </div>
  );
}