import { useRecoilState } from "recoil";
import { joinDialogAtom } from "../../utils/atoms";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { bootstrapModalProps, ensureModalStyles } from "./modalTheme";

export default function JoinClass() {
  const classCode = useRef();
  const { joinClass } = useAuth();
  const [show, setShow] = useRecoilState(joinDialogAtom);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  ensureModalStyles();

  const handleClose = () => {
    setSuccess("");
    setError("");
    setShow(false);
  };

  async function handleSubmit() {
    setSuccess("");
    setError("");
    if (classCode.current.value !== "") {
      try {
        await joinClass(classCode.current.value);
        setSuccess("You joined the class successfully!");
        classCode.current.value = "";
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Please enter a class code.");
    }
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="join-class-title"
      {...bootstrapModalProps}
    >
      <Modal.Header closeButton closeLabel="Close join class dialog">
        <Modal.Title id="join-class-title">Join a class</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger" role="alert">
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" role="status">
            {success}
          </Alert>
        )}
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group controlId="classCode">
            <Form.Label>Class code</Form.Label>
            <Form.Control
              type="text"
              ref={classCode}
              placeholder="Enter your invite code"
              aria-describedby="classCodeHelp"
              required
            />
            <Form.Text id="classCodeHelp" muted>
              Ask your instructor for the code shared with the class.
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} aria-label="Cancel joining class">
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} aria-label="Join class with entered code">
          Join class
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
