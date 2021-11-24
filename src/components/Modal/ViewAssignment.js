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
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useAuth } from "../../contexts/AuthContext";
import { errorDialogAtom, errorMessage } from "../../utils/atoms";
import { useRecoilState } from "recoil";
import { doc, onSnapshot } from "firebase/firestore";
import { useHistory } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Input = styled("input")({
  display: "none",
});

export default function ViewAssignment(props) {
  const history = useHistory();
  const { db, currentUser } = useAuth();
  const [show, setShow] = useRecoilState(errorDialogAtom);
  const [message, setMes] = useRecoilState(errorMessage);
  const [currentAssign, setCurrentAssign] = useState({});
  const [isAuthor, setIsAuthor] = useState(false);
  const [accept, setAccept] = useState(true);
  const [isTurnIn,setIsTurnIn]=useState(false);
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "assignments", props.match.params.id),
      (doc) => {
        const data = doc.data();
        setCurrentAssign(data);
        if (data.authorID === currentUser.uid) {
          setIsAuthor(true);
        }
        const TurnIn = data.turnIns.some(
          (ele) => ele.userID === currentUser.uid
        );
        setIsTurnIn(TurnIn)
        setInterval(() => {
          if (TurnIn || (data.dueTime!==""&&data.dueTime < new Date().getTime())) {
            setAccept(true);
          } else {
            setAccept(false);
          }
        }, 1000);
      }
    );
    return unsub;
  }, [props.match.params.id]);
  return (
    <div>
      <Dialog fullScreen open={true} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative", background: "#007b83" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => history.goBack()}
              aria-label="close"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Assignment
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2}>
          <Grid item xs={9} sx={{ height: "calc(100vh - 64px)" }}>
            <div style={{ height: "100%", padding: "20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <TextField
                  id="outlined"
                  fullWidth
                  label="Title"
                  disabled
                  value={currentAssign.title}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <TextField
                  id="filled-multiline-static"
                  label="Description"
                  multiline
                  fullWidth
                  rows={4}
                  disabled
                  defaultValue={currentAssign.des}
                />
              </div>

              <List dense={false}>
                {currentAssign.files?.map((file) => (
                  <ListDoc
                    key={file.name}
                    name={file.name}
                    linkDownload={file.linkDownload}
                  />
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
                  justifyContent: "center",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {currentAssign.dueTime !== "" && (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(params) => <TextField {...params} />}
                      label="Due time"
                      value={currentAssign.dueTime}
                      readOnly
                      onChange={() => {}}
                      minDateTime={new Date()}
                    />
                  </LocalizationProvider>
                )}
              </div>
              {!isAuthor && (
                <Work assignID={props.match.params.id} accept={accept} isTurnIn={isTurnIn} />
              )}
            </div>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

function Work(props) {
  const [list, setList] = useState([]);
  const { addWork } = useAuth();
  const history = useHistory();
  const [show, setShow] = useRecoilState(errorDialogAtom);
  const [message, setMes] = useRecoilState(errorMessage);
  function addDoc() {
    const fileIn = document.getElementById("work-files");
    fileIn.click();
  }
  function fileChange() {
    const fileIn = document.getElementById("work-files");
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

  function handleTurnIn() {
    if (list.length !== 0) {
      addWork(list, props.assignID);
      history.goBack();
    } else {
      setMes("Your work is empty!");
      setShow(true);
    }
  }

  // useEffect(() => {

  // // }, [props.accept])

  return (
    <div
      style={{
        boxShadow:
          "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
        borderRadius: "0.5rem",
        margin: "20px",
        padding: "20px",
      }}
    >
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <h4 style={{ fontSize: "1.375rem" }}>YOUR WORK</h4>
        <span style={{color:"#129eaf"}}>{props.isTurnIn ? "Turned in" : "Assigned"}</span>
      </div>
      <List dense={false}>
        {list.map((ele) => (
          <WorkDoc key={ele.name} name={ele.name} handleDel={handleDel} />
        ))}
      </List>
      <Input onChange={fileChange} id="work-files" type="file" />
      <Button
        variant="outlined"
        style={{
          margin: "10px 0",
        }}
        color="success"
        fullWidth
        startIcon={<AddIcon />}
        onClick={addDoc}
      >
        Add work
      </Button>
      <Button
        fullWidth
        variant="contained"
        onClick={handleTurnIn}
        disabled={props.accept}
        color="success"
      >
        Turn in
      </Button>
    </div>
  );
}

function WorkDoc(props) {
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

function ListDoc(props) {
  return (
    <a
      style={{ textDecoration: "none", color: "#000" }}
      href={props.linkDownload}
      target="_blank"
      rel="noopener"
    >
      <ListItem sx={{ borderBottom: "1px #ccc solid" }}>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.name} />
      </ListItem>
    </a>
  );
}