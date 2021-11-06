import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../img/logo1.png";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateProfile } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }
    try {
      setError("");
      setLoading(true);
      await updateProfile(passwordRef.current.value);
      history.push("/");
    } catch (error) {
      console.log(error);
      setError("Fail to update an account!");
    }
    setLoading(false);
  }
  return (
    <div style={{ height: "100vh", marginTop: "-5.7rem" }}>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "20%" }}
      >
        <img src={logo} style={{ width: "auto", height: "100%" }} alt="" />
      </div>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "80%" }}
      >
        <div>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <Card.Body>
              <h2 className=" text-center mb-4">Update profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    readOnly="true"
                    defaultValue={currentUser.email}
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <br />
                <Button
                  disabled={loading}
                  className="w-100 text-uppercase fw-bold"
                  type="submit"
                >
                  Update
                </Button>
                <br />
                <br />
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/" style={{ textDecoration: "none", marginLeft: "5px" }}>
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
