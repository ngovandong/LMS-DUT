import { useRecoilState } from "recoil";
import { updateClassDialog } from "../../utils/atoms";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { bootstrapModalProps, ensureModalStyles } from "./modalTheme";

export default function UpdateClass(props) {
  const className = useRef();
  const credits = useRef();
  const { updateClass } = useAuth();
  const [show, setShow] = useRecoilState(updateClassDialog);
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
    if (className.current.value !== "" && credits.current.value > 0) {
      try {
        await updateClass(props.classID, className.current.value, credits.current.value);
        setSuccess("Class updated successfully!");
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Please enter a class name and a credit value greater than zero.");
    }
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="update-class-title"
      {...bootstrapModalProps}
    >
      <Modal.Header closeButton closeLabel="Close update class dialog">
        <Modal.Title id="update-class-title">Edit class details</Modal.Title>
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
          <Form.Group className="mb-3" controlId="className">
            <Form.Label>Class name</Form.Label>
            <Form.Control
              defaultValue={props.name}
              type="text"
              ref={className}
              required
            />
          </Form.Group>
          <Form.Group controlId="credits">
            <Form.Label>Credits</Form.Label>
            <Form.Control
              defaultValue={props.credits}
              type="number"
              ref={credits}
              min="1"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} aria-label="Cancel editing class">
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} aria-label="Save class changes">
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
