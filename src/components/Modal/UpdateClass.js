import { useRecoilState } from "recoil";
import { updateClassDialog } from "../../utils/atoms";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import React, { useRef, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function UpdateClass(props) {
  const className = useRef();
  const credits = useRef();
  const { updateClass } = useAuth();
  const [show, setShow] = useRecoilState(updateClassDialog);
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
        await updateClass(props.classID,className.current.value, credits.current.value);
        setSuccess("Create class success!");
        className.current.value = "";
        credits.current.value = "";
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Wrong input!");
    }
  }
  useEffect(() => {
  }, [props.classID,props.className,props.credits]);
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
              <Form.Control defaultValue={props.name} type="text" ref={className} required />
            </Form.Group>
            <Form.Group id="credits">
              <Form.Label>Credits</Form.Label>
              <Form.Control defaultValue={props.credits} type="number" ref={credits} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
