import { Button, Modal } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { errorDialogAtom, errorMessage } from "../../utils/atoms";
import { bootstrapModalProps, ensureModalStyles } from "./modalTheme";

export default function ErrorDialog() {
  const [show, setShow] = useRecoilState(errorDialogAtom);
  const [message] = useRecoilState(errorMessage);

  ensureModalStyles();

  const handleClose = () => setShow(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
      style={{ zIndex: 93043 }}
      {...bootstrapModalProps}
    >
      <Modal.Header closeButton closeLabel="Dismiss error dialog">
        <Modal.Title id="error-dialog-title">Something went wrong</Modal.Title>
      </Modal.Header>
      <Modal.Body id="error-dialog-description">{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose} aria-label="Close error dialog">
          Got it
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
