import { useRecoilState } from "recoil";
import { createDialogAtom } from "../../utils/atoms";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { bootstrapModalProps, ensureModalStyles } from "./modalTheme";

export default function AddClass() {
  const className = useRef();
  const credits = useRef();
  const { createClass } = useAuth();
  const [show, setShow] = useRecoilState(createDialogAtom);
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
        await createClass(className.current.value, credits.current.value);
        setSuccess("Class created successfully!");
        className.current.value = "";
        credits.current.value = "";
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
      aria-labelledby="create-class-title"
      {...bootstrapModalProps}
    >
      <Modal.Header closeButton closeLabel="Close create class dialog">
        <Modal.Title id="create-class-title">Create a class</Modal.Title>
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
              type="text"
              ref={className}
              placeholder="e.g. Introduction to Programming"
              required
            />
          </Form.Group>
          <Form.Group controlId="credits">
            <Form.Label>Credits</Form.Label>
            <Form.Control
              type="number"
              ref={credits}
              min="1"
              placeholder="3"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} aria-label="Cancel creating class">
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} aria-label="Create new class">
          Create class
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
