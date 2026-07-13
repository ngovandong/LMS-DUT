import { Row } from "../Material/index";
import {
  RowMain,
  RowMeta,
  RowTitle,
  IconCircle,
  IconActionButton,
} from "../styles/shared";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { MdAssignment } from "react-icons/md";
import { useAuth } from "../../../contexts/AuthContext";

const AssignmentCircle = styled(IconCircle)`
  background: ${({ $muted }) =>
    $muted
      ? "linear-gradient(135deg, #94a3b8, #64748b)"
      : "linear-gradient(135deg, var(--brand-500), var(--brand-600))"};
`;

const MenuButton = styled(IconActionButton)`
  color: var(--brand-600);
`;

export default function ListAssign({
  assignID,
  name,
  dueTime,
  isAuthor,
  isSilver,
}) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`../assignments/${assignID}`);
  }

  return (
    <Row
      $clickable
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${name}, ${dueTime || "assignment"}`}
    >
      <RowMain>
        <AssignmentCircle $muted={isSilver} aria-hidden="true">
          <MdAssignment size={20} color="#fff" />
        </AssignmentCircle>
        <RowTitle>{name}</RowTitle>
      </RowMain>
      {dueTime && <RowMeta>{dueTime}</RowMeta>}
      {isAuthor && <ThreeDotMenu assignID={assignID} />}
    </Row>
  );
}

function ThreeDotMenu({ assignID }) {
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
    closeAssign(assignID);
  }

  function handleDeleteAssign(e) {
    e.stopPropagation();
    setAnchorEl(null);
    deleteAssign(assignID);
  }

  function handleEditAssign(e) {
    e.stopPropagation();
    setAnchorEl(null);
    navigate(`../updateAssigment/${assignID}`);
  }

  function handleViewWork(e) {
    e.stopPropagation();
    setAnchorEl(null);
    navigate(`../viewWork/${assignID}`);
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <MenuButton
        type="button"
        id={`assignment-menu-${assignID}`}
        aria-controls={open ? `assignment-menu-list-${assignID}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        aria-label="Assignment options"
        onClick={handleClick}
      >
        <BsThreeDotsVertical size={18} aria-hidden="true" />
      </MenuButton>
      <Menu
        id={`assignment-menu-list-${assignID}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": `assignment-menu-${assignID}`,
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
