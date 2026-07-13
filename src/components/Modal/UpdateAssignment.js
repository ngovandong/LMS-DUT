import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import { useAuth } from "../../contexts/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigate, useParams } from "react-router";
import { ListDoc } from "./ViewAssignment";
import {
  APP_BAR_SX,
  MAIN_CONTENT_SX,
  MAIN_GRID_SX,
  SIDE_PANEL_SX,
} from "./modalTheme";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateAssignment(props) {
  const [checked, setChecked] = useState(false);
  const [accept, setAccept] = useState(false);
  const [time, setTime] = useState(new Date());
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const { db, updateAssign } = useAuth();
  const navigate = useNavigate();
  const { asignmentid } = useParams();

  function handleAssign() {
    const assignment = {
      title: title,
      des: des,
      dueTime: checked ? time.getTime() : "",
    };
    updateAssign(assignment, asignmentid);
    navigate(-1);
  }

  useEffect(() => {
    setAccept(title === "" || (checked && time <= new Date().getTime()));
  }, [title, checked, time]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "assignments", asignmentid), (doc) => {
      const data = doc.data();
      setTitle(data.title);
      setDes(data.des);
      setList(data.files);
      if (data.dueTime !== "") {
        setTime(data.dueTime);
        setChecked(true);
      } else {
        setTime(new Date().getTime());
      }
    });
    return unsub;
  }, [asignmentid, db]);

  return (
    <Dialog fullScreen open={true} TransitionComponent={Transition}>
      <AppBar sx={APP_BAR_SX}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(-1)}
            aria-label="Go back without saving"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="h1">
            Edit assignment
          </Typography>
          <Button
            disabled={accept}
            color="inherit"
            onClick={handleAssign}
            aria-label="Save assignment changes"
          >
            Update
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={{ xs: 0, md: 2 }}>
        <Grid item xs={12} md={9} sx={MAIN_GRID_SX}>
          <Box sx={MAIN_CONTENT_SX}>
            <Box sx={{ mb: 2 }}>
              <TextField
                autoFocus
                color="success"
                fullWidth
                label="Title"
                variant="filled"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
                id="assignment-title-edit"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                color="success"
                id="assignment-description-edit"
                label="Description"
                multiline
                fullWidth
                rows={6}
                variant="filled"
                onChange={(e) => setDes(e.target.value)}
                value={des}
              />
            </Box>
            {list?.length > 0 && (
              <Typography
                variant="subtitle2"
                sx={{ color: "var(--text-muted)", mb: 1, fontWeight: 600 }}
              >
                Attachments
              </Typography>
            )}
            <List dense={false} aria-label="Assignment attachments">
              {list.map((file) => (
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
                value={time}
                onChange={(newValue) => setTime(newValue)}
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
