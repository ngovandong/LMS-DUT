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
import Box from "@mui/material/Box";
import { useAuth } from "../../contexts/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import {
  APP_BAR_SX,
  FILE_LINK_SX,
  LIST_ITEM_SX,
  MAIN_CONTENT_SX,
  MAIN_GRID_SX,
  SIDE_PANEL_SX,
  STATUS_CHIP_SX,
  WORK_CARD_SX,
} from "./modalTheme";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Input = styled("input")({
  display: "none",
});

export default function ViewAssignment(props) {
  const { asignmentid } = useParams();
  const navigate = useNavigate();
  const { db, currentUser } = useAuth();
  const [currentAssign, setCurrentAssign] = useState({});
  const [isAuthor, setIsAuthor] = useState(false);
  const [accept, setAccept] = useState(true);
  const [isTurnIn, setIsTurnIn] = useState(false);
  const [yourWork, setYourWork] = useState(null);
  const [grade, setGrade] = useState("");

  useEffect(() => {
    let id;
    const unsub = onSnapshot(doc(db, "assignments", asignmentid), (doc) => {
      const data = doc.data();
      setCurrentAssign(data);
      if (data.authorID === currentUser.uid) {
        setIsAuthor(true);
      }
      const TurnIn = data.turnIns[currentUser.uid] ? true : false;
      if (TurnIn) {
        setYourWork(data.turnIns[currentUser.uid].files);
        setGrade(data.turnIns[currentUser.uid].grade);
      }
      setIsTurnIn(TurnIn);
      id = setInterval(() => {
        if (
          data.isClose ||
          TurnIn ||
          (data.dueTime !== "" && data.dueTime < new Date().getTime())
        ) {
          setAccept(true);
        } else {
          setAccept(false);
        }
      }, 1000);
    });
    return () => {
      unsub();
      clearInterval(id);
    };
  }, [asignmentid, currentUser.uid, db]);

  return (
    <Dialog fullScreen open={true} TransitionComponent={Transition}>
      <AppBar sx={APP_BAR_SX}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(-1)}
            aria-label="Go back to classwork"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="h1">
            Assignment
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={{ xs: 0, md: 2 }}>
        <Grid item xs={12} md={9} sx={MAIN_GRID_SX}>
          <Box sx={MAIN_CONTENT_SX}>
            <Box sx={{ mb: 2 }}>
              <TextField
                id="assignment-title"
                fullWidth
                label="Title"
                disabled
                value={currentAssign.title || ""}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                id="assignment-description"
                label="Description"
                multiline
                fullWidth
                rows={4}
                disabled
                value={currentAssign.des || ""}
              />
            </Box>
            {currentAssign.files?.length > 0 && (
              <Typography
                variant="subtitle2"
                sx={{ color: "var(--text-muted)", mb: 1, fontWeight: 600 }}
              >
                Attachments
              </Typography>
            )}
            <List dense={false} aria-label="Assignment attachments">
              {currentAssign.files?.map((file) => (
                <ListDoc
                  key={file.name}
                  name={file.name}
                  linkDownload={file.linkDownload}
                />
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={SIDE_PANEL_SX}>
            {currentAssign.dueTime !== "" && (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(params) => (
                    <TextField {...params} fullWidth aria-label="Due date and time" />
                  )}
                  label="Due date"
                  value={currentAssign.dueTime}
                  readOnly
                  onChange={() => {}}
                  minDateTime={new Date()}
                />
              </LocalizationProvider>
            )}
            {!isAuthor && (
              <Work
                assignID={asignmentid}
                accept={accept}
                isTurnIn={isTurnIn}
                files={yourWork}
                grade={grade}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
}

function Work(props) {
  const [list, setList] = useState([]);
  const { addWork } = useAuth();
  const navigate = useNavigate();
  const [empty, setEmpty] = useState(true);

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
      navigate(-1);
    }
  }

  useEffect(() => {
    setEmpty(list.length === 0);
  }, [props.accept, list]);

  return (
    <Box sx={WORK_CARD_SX} component="section" aria-label="Your work">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
          mb: 1,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
          Your work
        </Typography>
        <Typography component="span" sx={STATUS_CHIP_SX}>
          {props.isTurnIn ? "Turned in" : "Assigned"}
        </Typography>
      </Box>
      {props.isTurnIn && props.grade && (
        <Typography sx={{ ...STATUS_CHIP_SX, display: "block", mb: 1 }}>
          Grade: {props.grade}
        </Typography>
      )}
      <List dense={false} aria-label="Submitted and pending files">
        {props.files?.map((ele) => (
          <ListDoc key={ele.linkDownload} linkDownload={ele.linkDownload} name={ele.name} />
        ))}
        {list.map((ele) => (
          <WorkDoc key={ele.name} name={ele.name} handleDel={handleDel} />
        ))}
      </List>
      <Input onChange={fileChange} id="work-files" type="file" aria-hidden="true" />
      <Button
        variant="outlined"
        sx={{ my: 1.25 }}
        color="success"
        fullWidth
        startIcon={<AddIcon />}
        onClick={addDoc}
        disabled={props.accept}
        aria-label="Add work file"
      >
        Add file
      </Button>
      <Button
        fullWidth
        variant="contained"
        onClick={handleTurnIn}
        disabled={props.accept || empty}
        color="success"
        aria-label="Turn in assignment"
      >
        Turn in
      </Button>
    </Box>
  );
}

function WorkDoc(props) {
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

export function ListDoc(props) {
  return (
    <Box
      component="a"
      sx={FILE_LINK_SX}
      href={props.linkDownload}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${props.name}`}
    >
      <ListItem sx={LIST_ITEM_SX}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "var(--brand-100)", color: "var(--brand-700)" }}>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.name} />
      </ListItem>
    </Box>
  );
}
