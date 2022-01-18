import { useRef, useState } from "react";
import "./style.css";
import { createDialogAtom, joinDialogAtom } from "../../utils/atoms";
import { useRecoilState } from "recoil";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

export default function ClassGroup() {
  const [show, setShow] = useState(false);
  const [createOpened, setCreateOpened] = useRecoilState(createDialogAtom);
  const [joinOpened, setJoinOpened] = useRecoilState(joinDialogAtom);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleCreate() {
    setCreateOpened(true);
    setShow(false);
  }
  async function handleJoin() {
    setJoinOpened(true);
    setShow(false);
  }

  return (
    <div style={{ marginRight: "15px" }}>
      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AddIcon />
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
        <MenuItem
          onClick={() => {
            handleClose();
            handleJoin();
          }}
        >
          Join
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleCreate();
          }}
        >
          Create
        </MenuItem>
      </Menu>
    </div>
  );
}
