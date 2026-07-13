import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { MUI_DIALOG_PAPER_SX } from "./modalTheme";

export default function ShowCode(props) {
  const handleCopy = () => {
    navigator.clipboard.writeText(props.code);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="join-code-dialog-title"
      aria-describedby="join-code-dialog-description"
      PaperProps={{ sx: MUI_DIALOG_PAPER_SX }}
    >
      <DialogTitle
        id="join-code-dialog-title"
        sx={{
          background: "linear-gradient(135deg, var(--brand-50) 0%, var(--surface) 100%)",
          fontWeight: 700,
          color: "var(--text-primary)",
        }}
      >
        Class invite code
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <DialogContentText
          component="p"
          id="join-code-dialog-description"
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem" },
            fontWeight: 800,
            letterSpacing: "0.12em",
            textAlign: "center",
            color: "var(--brand-700)",
            py: 2,
            fontFamily: "inherit",
          }}
        >
          {props.code}
        </DialogContentText>
        <Box
          component="p"
          sx={{
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.9rem",
            m: 0,
          }}
        >
          Share this code so students can join your class.
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button onClick={props.handleClose} aria-label="Close invite code dialog">
          Close
        </Button>
        <Button
          onClick={handleCopy}
          variant="contained"
          autoFocus
          aria-label="Copy invite code to clipboard"
          sx={{
            background: "var(--brand-600)",
            boxShadow: "var(--shadow-brand)",
            "&:hover": { background: "var(--brand-700)" },
          }}
        >
          Copy code
        </Button>
      </DialogActions>
    </Dialog>
  );
}
