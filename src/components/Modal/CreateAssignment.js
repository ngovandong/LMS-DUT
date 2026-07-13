/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import { useAuth } from "../../contexts/AuthContext";
import { errorDialogAtom, errorMessage } from "../../utils/atoms";
import { useRecoilState } from "recoil";
import {
  APP_BAR_SX,
  LIST_ITEM_SX,
  MAIN_CONTENT_SX,
  MAIN_GRID_SX,
  SIDE_PANEL_SX,
} from "./modalTheme";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateAssignment(props) {
  const [value, setValue] = useState(new Date());
  const [checked, setChecked] = useState(false);
  const [accept, setAccept] = useState(false);
  const [time, setTime] = useState(new Date());
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const { addAssign, currentUser } = useAuth();
  const [show, setShow] = useRecoilState(errorDialogAtom);
  const [message, setMes] = useRecoilState(errorMessage);

  function addDoc() {
    const fileIn = document.getElementById("fileInput");
    fileIn.click();
  }

  function fileChange() {
    const fileIn = document.getElementById("fileInput");
    if (fileIn.files[0]) {
      let check = true;
      const newList = [];
      list.forEach((ele) => {
        if (fileIn.files[0].name === ele.name) check = false;
        newList.push(ele);
      });
      if (check) {
        newList.push(fileIn.files[0]);
        setList(newList);
      }
    }
  }

  function handleDel(name) {
    const newList = [];
    list.forEach((ele) => {
      if (ele.name !== name) {
        newList.push(ele);
      }
    });
    setList(newList);
  }

  function handleAssign() {
    if (title !== "") {
      const assignment = {
        title: title,
        des: des,
        dueTime: checked ? time.getTime() : "",
        classID: props.classID,
        turnIns: {},
        authorID: currentUser.uid,
        isClose: false,
      };
      addAssign(assignment, list);
      props.handleClick();
      setTitle("");
      setDes("");
      setList([]);
      setTime(new Date());
      setValue(new Date());
      setChecked(false);
      setAccept(false);
    } else {
      setMes("Please enter an assignment title.");
      setShow(true);
    }
  }

  useEffect(() => {
    setAccept(title === "" || (checked && time <= new Date().getTime()));
  }, [title, checked, time]);

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClick}
      TransitionComponent={Transition}
    >
      <AppBar sx={APP_BAR_SX}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClick}
            aria-label="Close create assignment dialog"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="h1">
            New assignment
          </Typography>
          <Button
            disabled={accept}
            color="inherit"
            onClick={handleAssign}
            aria-label="Publish assignment to class"
          >
            Assign
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={{ xs: 0, md: 2 }}>
        <Grid item xs={12} md={9} sx={MAIN_GRID_SX}>
          <Box sx={{ ...MAIN_CONTENT_SX, position: "relative" }}>
            <Box sx={{ mb: 2 }}>
              <TextField
                autoFocus
                color="success"
                fullWidth
                label="Title"
                variant="filled"
                required
                placeholder="What should students complete?"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                color="success"
                label="Description"
                multiline
                fullWidth
                variant="filled"
                rows={6}
                placeholder="Add instructions, links, or context for your class."
                onChange={(e) => setDes(e.target.value)}
                value={des}
              />
            </Box>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onInput={fileChange}
              aria-hidden="true"
            />
            {list.length > 0 && (
              <Typography
                variant="subtitle2"
                sx={{ color: "var(--text-muted)", mb: 1, fontWeight: 600 }}
              >
                Attachments
              </Typography>
            )}
            <List dense={false} aria-label="Assignment attachments">
              {list.map((file) => (
                <ListDoc key={file.name} name={file.name} handleDel={handleDel} />
              ))}
            </List>
            <SpeedDial
              ariaLabel="Add assignment attachment"
              icon={<SpeedDialIcon />}
              direction="up"
              sx={{
                position: "fixed",
                bottom: { xs: 24, md: 32 },
                left: { xs: 24, md: 32 },
              }}
            >
              <SpeedDialAction
                key="Upload"
                icon={<DriveFolderUploadIcon />}
                tooltipTitle="Upload file"
                onClick={addDoc}
              />
              <SpeedDialAction
                key="Link"
                icon={<InsertLinkIcon />}
                tooltipTitle="Add link"
              />
            </SpeedDial>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={SIDE_PANEL_SX}>
            <Typography
              variant="subtitle2"
              sx={{ color: "var(--text-muted)", mb: 1.5, fontWeight: 600 }}
            >
              Scheduling
            </Typography>
            <FormControlLabel
              sx={{ mb: 1, ml: 0 }}
              control={
                <Switch
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  inputProps={{ "aria-label": "Enable due date" }}
                />
              }
              label="Set a due date"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(params) => (
                  <TextField {...params} fullWidth aria-label="Assignment due date and time" />
                )}
                label="Due date"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                  setTime(newValue);
                }}
                minDateTime={new Date()}
                disabled={!checked}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
}

function ListDoc(props) {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label={`Remove ${props.name}`}
          onClick={() => props.handleDel(props.name)}
        >
          <DeleteIcon />
        </IconButton>
      }
      sx={LIST_ITEM_SX}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "var(--brand-100)", color: "var(--brand-700)" }}>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={props.name} />
    </ListItem>
  );
}
