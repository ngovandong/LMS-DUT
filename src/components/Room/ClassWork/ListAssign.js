import { Row } from "../Material/index";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { MdAssignment } from "react-icons/md";
import { useAuth } from "../../../contexts/AuthContext";

export default function ListAssign(props) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`../assignments/${props.assignID}`);
  }

  const Circle = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 100%;
    margin: auto 5px;
    background-color: ${props.isSilver
      ? "rgba(0,0,0,0.24)!important"
      : "#129eaf"};
    display: flex;
    justify-content: center;
    padding-top: 7px;
  `;

  return (
    <Row onClick={handleClick}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "660px",
        }}
      >
        <div style={{ display: "flex" }}>
          <Circle>
            <MdAssignment size={25} color="#fff" />
          </Circle>
          <span
            style={{
              margin: "auto 0.5rem",
              fontFamily: "Arial,sans-serif",
              fontWeight: "500",
              fontSize: "0.9rem",
              width: "400px",
            }}
          >
            {props.name}
          </span>
        </div>
        <div style={{ display: "flex" }}>
          <span
            style={{
              margin: "auto 0.5rem",
              fontFamily: "Arial,sans-serif",
              fontWeight: "500",
              fontSize: "0.75rem",
              letterSpacing: "0.03rem",
              color: "rgba(0,0,0,0.549)",
            }}
          >
            {props.dueTime}
          </span>
        </div>
      </div>
      {props.isAuthor && <ThreeDotMenu assignID={props.assignID} />}
    </Row>
  );
}

function ThreeDotMenu(props) {
  const { closeAssign, deleteAssign } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  function handleCloseAssign(e) {
    e.stopPropagation();
    setAnchorEl(null);
    closeAssign(props.assignID);
  }
  function handleDeleteAssign(e) {
    e.stopPropagation();
    setAnchorEl(null);
    deleteAssign(props.assignID);
  }
  function handleEditAssign(e) {
    e.stopPropagation();
    setAnchorEl(null);
    navigate(`../updateAssigment/${props.assignID}`);
  }
  function handleViewWork(e) {
    e.stopPropagation();
    setAnchorEl(null);
    navigate(`../viewWork/${props.assignID}`);
  }
  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <BsThreeDotsVertical size={20} color="#007b83" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleViewWork}>Class work</MenuItem>
        <MenuItem onClick={handleEditAssign}>Edit</MenuItem>
        <MenuItem onClick={handleCloseAssign}>Close</MenuItem>
        <MenuItem onClick={handleDeleteAssign}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
