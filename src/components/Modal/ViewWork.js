import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useAuth } from "../../contexts/AuthContext";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { useNavigate, useParams } from "react-router";
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
import { APP_BAR_SX, SIDE_PANEL_SX } from "./modalTheme";

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
  const { db, updateGrade } = useAuth();
  const [rows, setRows] = useState([]);
  const [listFile, setListFile] = useState([]);
  const [listTurned, setListTurned] = useState({});
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const { asignmentid } = useParams();

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "assignments", asignmentid),
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
        setLoading(false);
      }
    );
    return () => unsub();
  }, [asignmentid, db]);

  function handleRowClick(object) {
    const row = object.row;
    if (row.turned) {
      setListFile(row.files);
    } else {
      setListFile([]);
    }
  }

  function handleSave() {
    updateGrade(listTurned, asignmentid);
  }

  function handleChangeValue(model) {
    for (const key in model) {
      if (Object.hasOwnProperty.call(model[key], "grade")) {
        listTurned[key].grade = model[key].grade.value;
      }
      if (Object.hasOwnProperty.call(model[key], "note")) {
        listTurned[key].note = model[key].note.value;
      }
    }
    setListTurned(listTurned);
  }

  return (
    <Dialog fullScreen open={true} TransitionComponent={Transition}>
      <AppBar sx={APP_BAR_SX}>
        <Toolbar sx={{ gap: 1, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(-1)}
            aria-label="Go back to classwork"
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ ml: { xs: 0, sm: 2 }, flex: 1, minWidth: 0 }}>
            <Typography variant="h6" component="h1" noWrap>
              Submissions
            </Typography>
            <Typography
              variant="body2"
              component="p"
              noWrap
              sx={{ opacity: 0.9 }}
              aria-label={`Assignment: ${title}`}
            >
              {title}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Grid container spacing={{ xs: 0, md: 2 }}>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            borderRight: { xs: "none", md: "1px solid var(--surface-border)" },
            borderBottom: { xs: "1px solid var(--surface-border)", md: "none" },
            padding: { xs: 2, sm: 2.5, md: 3 },
            height: { xs: "auto", md: "calc(100vh - var(--header-height))" },
            minHeight: { xs: 360, md: "calc(100vh - var(--header-height))" },
          }}
        >
          <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 2,
              }}
            >
              <Button
                onClick={handleSave}
                variant="contained"
                aria-label="Save grades and notes"
                sx={{
                  background: "var(--brand-600)",
                  boxShadow: "var(--shadow-brand)",
                  "&:hover": { background: "var(--brand-700)" },
                }}
              >
                Save grades
              </Button>
            </Box>
            <Box
              sx={{
                flex: 1,
                width: "100%",
                minHeight: { xs: 280, md: 0 },
                "& .MuiDataGrid-root": {
                  border: "1px solid var(--surface-border)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--surface)",
                },
              }}
            >
              <DataGrid
                id="submissions-table"
                rows={rows}
                columns={columns}
                components={{
                  Toolbar: CustomToolbar,
                  LoadingOverlay: CustomLoadingOverlay,
                }}
                loading={loading}
                onRowClick={handleRowClick}
                onEditRowsModelChange={handleChangeValue}
                isCellEditable={(params) => params.row.turned}
                autoHeight={false}
                sx={{
                  height: "100%",
                  minHeight: 280,
                  "& .MuiDataGrid-columnHeaders": {
                    background: "var(--surface-soft)",
                    color: "var(--text-primary)",
                    fontWeight: 600,
                  },
                  "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                    outline: "none",
                  },
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ ...SIDE_PANEL_SX, height: { xs: "auto", md: "calc(100vh - var(--header-height))" } }}>
            <Box
              sx={{
                textAlign: "center",
                fontSize: "1.05rem",
                fontWeight: 700,
                background: "var(--brand-50)",
                color: "var(--brand-700)",
                width: "100%",
                padding: "0.9rem 1rem",
                borderRadius: "var(--radius-sm)",
                mb: 1,
              }}
            >
              Student files
            </Box>
            <Box aria-label="Selected student files">
              {listFile.length === 0 ? (
                <Typography sx={{ color: "var(--text-muted)", fontSize: "0.9rem", py: 2 }}>
                  Select a student who has turned in work to view their files.
                </Typography>
              ) : (
                listFile.map((ele) => (
                  <ListDoc
                    key={ele.name}
                    name={ele.name}
                    linkDownload={ele.linkDownload}
                  />
                ))
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
}

const columns = [
  { field: "name", headerName: "Student", flex: 1, minWidth: 160, editable: false },
  {
    field: "turned",
    headerName: "Turned in",
    type: "boolean",
    width: 110,
    editable: false,
  },
  {
    field: "numOfFiles",
    headerName: "Files",
    width: 80,
    type: "number",
    editable: false,
  },
  {
    field: "time",
    headerName: "Submitted",
    type: "dateTime",
    flex: 1,
    minWidth: 160,
    editable: false,
  },
  {
    field: "grade",
    headerName: "Grade",
    type: "number",
    width: 90,
    editable: true,
  },
  {
    field: "note",
    headerName: "Note",
    flex: 1,
    minWidth: 140,
    editable: true,
  },
];

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <Box sx={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress
          color="success"
          aria-label="Loading submissions"
        />
      </Box>
    </GridOverlay>
  );
}
