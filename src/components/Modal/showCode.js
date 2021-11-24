import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ShowCode(props) {
  const hanldeCopy = () => {
    navigator.clipboard.writeText(props.code);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Join code</DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ fontSize: "40px", fontWeight: "bold" }}
            id="alert-dialog-description"
          >
            {props.code}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Close</Button>
          <Button onClick={hanldeCopy} autoFocus>
            Copy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
