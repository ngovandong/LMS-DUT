import { Button, Modal } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { errorDialogAtom, errorMessage } from "../../utils/atoms";

// eslint-disable-next-line import/no-anonymous-default-export
export default function ErrorDialog() {
  const [show, setShow] = useRecoilState(errorDialogAtom);
  const [message, setMessage] = useRecoilState(errorMessage);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
