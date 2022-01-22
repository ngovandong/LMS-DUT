import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import { useAuth } from "../../contexts/AuthContext";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LinearProgress from "@mui/material/LinearProgress";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridOverlay,
} from "@mui/x-data-grid";

import { ListDoc } from "./ViewAssignment";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ViewWork(props) {
  const navigate = useNavigate();
  const { db,updateGrade } = useAuth();
  const [rows, setRows] = useState([]);
  const [listFile, setListFile] = useState([]);
  const [listTurned, setListTurned] = useState({});
  const [title, setTitle] = useState("");
  async function fetchData() {
    onSnapshot(
      doc(db, "assignments", props.match.params.id),
      async (result) => {
        const data = result.data();
        setListTurned(data.turnIns);
        setTitle(data.title);
        const classID = data.classID;
        const docRef = await doc(db, "classes", classID);
        const classSnap = await getDoc(docRef);
        const classData = classSnap.data();
        const users = classData.users;
        const list = [];
        const listTurned = data.turnIns;
        for (const key in listTurned) {
          list.push({
            id: key,
            files: listTurned[key].files,
            name: listTurned[key].name,
            time: new Date(parseInt(listTurned[key].time)),
            turned: true,
            numOfFiles: listTurned[key].files.length,
            grade: listTurned[key].grade,
            note: listTurned[key].note,
          });
        }
        users.forEach((ele) => {
          if (listTurned[ele.uid]) {
          } else if (ele.uid !== data.authorID) {
            list.push({
              id: ele.uid,
              name: ele.name,
              turned: false,
            });
          }
        });
        setRows(list);
      }
    );
  }
  useEffect(() => {
    const unsub = fetchData();
    return unsub;
  }, [props.match.params.id]);

  function handleRowClick(object) {
    const row = object.row;
    if (row.turned) {
      setListFile(row.files);
    } else {
      setListFile([]);
    }
  }

  function handleSave() {
      updateGrade(listTurned,props.match.params.id);
  }

  function handleChangeValue(model) {
    for (const key in model) {
      if (
        Object.hasOwnProperty.call(model[key], "grade") 
      ) {
        listTurned[key].grade = model[key].grade.value;
      }
      if (
        Object.hasOwnProperty.call(model[key], "note")
      ) {
        listTurned[key].note = model[key].note.value;
      }
    }
    setListTurned(listTurned);
  }

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
              Class Work
            </Typography>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container spacing={2}>
          <Grid
            style={{ borderRight: "#ccc 5px solid", padding: "40px" }}
            item
            xs={8}
            sx={{ height: "calc(100vh - 64px)" }}
          >
            <div style={{ width: "100%", height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  marginBottom: "20px",
                }}
              >
                <Button
                  onClick={handleSave}
                  style={{ background: "#007b83" }}
                  variant="contained"
                >
                  Save
                </Button>
              </div>
              <div style={{ height: "95%", width: "100%" }}>
                <DataGrid
                  id="table"
                  rows={rows}
                  columns={columns}
                  components={{
                    Toolbar: CustomToolbar,
                    LoadingOverlay: CustomLoadingOverlay,
                  }}
                  loading
                  onRowClick={handleRowClick}
                  onEditRowsModelChange={handleChangeValue}
                  isCellEditable={(params) => params.row.turned}
                />
              </div>
            </div>
          </Grid>
          <Grid style={{ padding: "40px", height: " 100%" }} item xs={4}>
            <div
              style={{
                textAlign: "center",
                fontSize: "1.25rem",
                background: "#e4f7fb",
                width: "100%",
                padding: "15px",
              }}
            >
              Files
            </div>
            <div>
              {listFile.map((ele) => (
                <ListDoc
                  key={ele.name}
                  name={ele.name}
                  linkDownload={ele.linkDownload}
                />
              ))}
            </div>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

const columns = [
  { field: "name", headerName: "Name", width: 300, editable: false },
  {
    field: "turned",
    headerName: "Turned In",
    type: "boolean",
    editable: false,
  },
  {
    field: "numOfFiles",
    headerName: "Files",
    width: 100,
    type: "number",
    editable: false,
  },
  {
    field: "time",
    headerName: "Time",
    type: "dateTime",
    width: 220,
    editable: false,
  },
  {
    field: "grade",
    headerName: "Grade",
    type: "number",
    width: 100,
    editable: true,
  },
  {
    field: "note",
    headerName: "Note",
    width: 200,
    editable: true,
  },
];

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress color="success" />
      </div>
    </GridOverlay>
  );
}
