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
import { useAuth } from "../../contexts/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router";
import { ListDoc } from "./ViewAssignment";

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
  
  function checkAccept() {
    if (title === "" || (checked && time <= new Date().getTime())) {
      setAccept(true);
    } else {
      setAccept(false);
    }
  }
  function handleAssign() {
      const assignment = {
        title: title,
        des: des,
        dueTime: checked ? time.getTime() : "",
      };
      updateAssign(assignment,props.match.params.id);
      navigate(-1);
  }
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "assignments", props.match.params.id),
      (doc) => {
        const data = doc.data();
        setTitle(doc.data().title);
        setDes(data.des);
        setList(data.files);
        if (data.dueTime !== "") {
          setTime(data.dueTime);
          setChecked(true);
        } else {
          setTime(new Date().getTime());
        }
      }
    );
    checkAccept();
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
              onClick={() => navigate(-1)}
              aria-label="close"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Assignment
            </Typography>
            <Button disabled={accept} color="inherit" onClick={handleAssign}>
              Update
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
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                  required
                  id="outlined-required"
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <TextField
                  color="success"
                  id="outlined-required"
                  label="Description"
                  multiline
                  fullWidth
                  rows={6}
                  variant="filled"
                  onChange={(e) => setDes(e.target.value)}
                  value={des}
                />
              </div>

              <List dense={false}>
                {list.map((file) => (
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
                      }}
                    />
                  }
                  label="Due time"
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(params) => <TextField {...params} />}
                    label="Due time"
                    value={time}
                    onChange={(newValue) => {
                      setTime(newValue);
                    }}
                    minDateTime={new Date()}
                    disabled={!checked}
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
