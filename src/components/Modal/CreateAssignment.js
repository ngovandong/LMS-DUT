import React, { useState } from "react";
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
import { useAuth } from "../../contexts/AuthContext";
import { errorDialogAtom, errorMessage } from "../../utils/atoms";
import { useRecoilState } from "recoil";
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
  const { addAssign,currentUser } = useAuth();
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
  function checkAccept() {
    if (!checked && time.getTime() <= new Date().getTime()) {
      setAccept(true);
    } else {
      setAccept(false);
    }
  }
  function handleAssign() {
    if (title !== "") {
      const assignment = {
        title: title,
        des: des,
        dueTime: checked ? time.getTime() : "",
        classID: props.classID,
        turnIns: [],
        authorID: currentUser.uid,
        isClose: false
      };
      console.log(assignment);
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
      setMes("Wrong input!");
      setShow(true);
    }
  }
  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClick}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", background: "#007b83" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClick}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Assignment
            </Typography>
            <Button disabled={accept} color="inherit" onClick={handleAssign}>
              Assign
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2}>
          <Grid item xs={9} sx={{ height: "calc(100vh - 64px)" }}>
            <div style={{ height: "100%", padding: "20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <TextField
                  autoFocus
                  color="success"
                  fullWidth
                  label="Title"
                  variant="filled"
                  required={true}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <TextField
                  color="success"
                  id="filled-multiline-static"
                  label="Description"
                  multiline
                  fullWidth
                  rows={4}
                  variant="filled"
                  rows="6"
                  onChange={(e) => setDes(e.target.value)}
                />
              </div>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onInput={fileChange}
              />
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                icon={<SpeedDialIcon />}
                direction="right"
                sx={{ position: "absolute", bottom: "20px", left: "20px" }}
              >
                <SpeedDialAction
                  key="Upload"
                  icon={<DriveFolderUploadIcon />}
                  tooltipTitle="Upload"
                  onClick={addDoc}
                />

                <SpeedDialAction
                  key="Link"
                  icon={<InsertLinkIcon />}
                  tooltipTitle={"Link"}
                />
              </SpeedDial>
              <List dense={false}>
                {list.map((file) => (
                  <ListDoc  key={file.name} name={file.name} handleDel={handleDel} />
                ))}
              </List>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div
              style={{
                borderLeft: "1px #ccc solid",
                padding: "20px",
                height: "calc(100vh - 64px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "5px",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  sx={{ padding: "20px" }}
                  control={
                    <Switch
                      checked={checked}
                      onChange={() => {
                        setChecked(!checked);
                        checkAccept();
                      }}
                    />
                  }
                  label="Due time"
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(params) => <TextField {...params} />}
                    label="Due time"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                      setTime(newValue);
                    }}
                    minDateTime={new Date()}
                    disabled={!checked}
                    onAccept={() => {
                      if (checked) setAccept(false);
                    }}
                    onError={() => {
                      if (checked) setAccept(true);
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

function ListDoc(props) {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => props.handleDel(props.name)}
        >
          <DeleteIcon />
        </IconButton>
      }
      sx={{ borderBottom: "1px #ccc solid" }}
    >
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={props.name} />
    </ListItem>
  );
}
