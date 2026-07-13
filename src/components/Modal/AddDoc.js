import { useRecoilState } from "recoil";
import { addDoc } from "../../utils/atoms";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { bootstrapModalProps, ensureModalStyles } from "./modalTheme";

export default function AddDoc(props) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const { uploadDoc } = useAuth();
  const [show, setShow] = useRecoilState(addDoc);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  ensureModalStyles();

  const handleClose = () => {
    setSuccess("");
    setError("");
    setFile(null);
    setName("");
    setShow(false);
  };

  async function handleSubmit() {
    setSuccess("");
    setError("");
    if (file) {
      try {
        await uploadDoc(file, name, props.classID);
        setSuccess("Document uploaded successfully!");
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Please choose a file to upload.");
    }
  }

  function handleChange(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setName(e.target.files[0].name);
    }
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="upload-doc-title"
      {...bootstrapModalProps}
    >
      <Modal.Header closeButton closeLabel="Close upload document dialog">
        <Modal.Title id="upload-doc-title">Upload a document</Modal.Title>
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
          <Form.Group controlId="fileName">
            <Form.Label>Choose file</Form.Label>
            <Form.Control
              type="file"
              onChange={handleChange}
              aria-describedby="fileUploadHelp"
              required
            />
            <Form.Text id="fileUploadHelp" muted>
              {name ? `Selected: ${name}` : "PDFs, slides, and other course files are welcome."}
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} aria-label="Cancel document upload">
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} aria-label="Upload selected document">
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
