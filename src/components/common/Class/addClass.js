import { useRecoilState } from "recoil";
import { createDialogAtom } from "../../../utils/atoms";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";

export default function AddClass() {
  const className = useRef();
  const credits = useRef();
  const { createClass } = useAuth();
  const [show, setShow] = useRecoilState(createDialogAtom);
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
    if (className.current.value !== "" && credits.current.value > 0) {
      try {
        await createClass(className.current.value, credits.current.value);
        setSuccess("Create class success!");
        className.current.value="";
        credits.current.value="";
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Wrong input!");
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form>
            <Form.Group id="className">
              <Form.Label>Class name</Form.Label>
              <Form.Control type="text" ref={className} required />
            </Form.Group>
            <Form.Group id="credits">
              <Form.Label>Credits</Form.Label>
              <Form.Control type="number" ref={credits} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
