import * as React from "react";
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

const actions = [
  { icon: <DriveFolderUploadIcon />, name: "Upload" },
  { icon: <InsertLinkIcon />, name: "Link" },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Assignment() {
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(new Date());
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", background: "#007b83" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Assignment
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Assign
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2}>
          <Grid item xs={9} sx={{ height: "calc(100vh - 64px)" }}>
            <div style={{ height: "100%", padding: "20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <TextField
                  autoFocus="true"
                  color="success"
                  fullWidth="true"
                  label="Title"
                  variant="filled"
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <TextField
                  color="success"
                  id="filled-multiline-static"
                  label="Description"
                  multiline
                  fullWidth="true"
                  rows={4}
                  variant="filled"
                  rows="6"
                />
              </div>
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                icon={<SpeedDialIcon />}
                direction="right"
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                  />
                ))}
              </SpeedDial>
              <List dense={false}>
                {generate(
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }
                    sx={{borderBottom:"1px #ccc solid"}}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Single-line item"
                      secondary={false ? "Secondary text" : null}
                    />
                  </ListItem>
                )}
              </List>
            </div>
          </Grid>
          <Grid item xs={3}>
          <div style={{borderLeft:"1px #ccc solid", padding:"20px",height:"calc(100vh - 64px)"}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Due time"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              /> 
            </LocalizationProvider>
            </div>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
