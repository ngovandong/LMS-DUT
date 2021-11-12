import { useRecoilState } from "recoil";
import { joinDialogAtom } from "../../../utils/atoms";
import { Form, Button, Modal,Alert } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

export default function JoinClass() {
  const classCode = useRef();
  const { joinClass } = useAuth();
  const [show, setShow] = useRecoilState(joinDialogAtom);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleClose = () => {
    setSuccess("");
    setError("");
    setShow(false);
  };
  async function handleSubmit() {
    setSuccess("");
    setError("");
    if(classCode.current.value!==""){
      try {
        await joinClass(classCode.current.value);
        setSuccess("Join class success!");
        classCode.current.value="";
      } catch (err) {
        setError(err.message);
      }
    }else{
      setError("Empty input!");
    }
    
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Join class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form>
            <Form.Group id="classCode">
              <Form.Label>Enter class code</Form.Label>
              <Form.Control type="text" ref={classCode} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Join
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
