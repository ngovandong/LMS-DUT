import { HeaderAvatar } from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from 'react'


export default function My() {
  const { logout, getPhoto } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUpdate() {
    try {
      navigate("/update-profile");
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
        alt="Open profile menu"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Open profile menu"
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") handleClick(event);
        }}
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
          Update profile
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
