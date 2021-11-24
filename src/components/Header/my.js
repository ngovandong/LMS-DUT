import { HeaderAvatar } from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import "./style.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from 'react'


export default function My() {
  const { logout, getPhoto } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUpdate() {
    try {
      history.push("/update-profile");
    } catch (error) {
      console.log(error);
    }
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <HeaderAvatar
        className="imgAvatar"
        src={getPhoto()}
        alt="Unknown"
        onClick={handleClick}
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleUpdate();
          }}
        >
          Update infor
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout();
          }}
        >
          Log out
        </MenuItem>
      </Menu>
    </div>
  );
}
