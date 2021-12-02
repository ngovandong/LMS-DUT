import { useRecoilState } from "recoil";
import { addDoc } from "../../utils/atoms";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import React, {  useState,useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function AddDoc(props) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const { uploadDoc } = useAuth();
  const [show, setShow] = useRecoilState(addDoc);
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
    if (file) {
      try {
        await uploadDoc(file, name, props.classID);
        setSuccess("Create document success!");
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Wrong input!");
    }
  }
  function handleChange(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setName(e.target.files[0].name);
    }
  }

  useEffect(() => {
    
  }, [])
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form>
            <Form.Group id="fileName">
              <Form.Label>Choose file</Form.Label>
              <Form.Control type="file" onChange={handleChange} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
