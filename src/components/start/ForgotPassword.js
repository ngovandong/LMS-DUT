import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../img/Logodhbk.jpg";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      console.log(error);
      setError("Fail to reset password!");
    }
    setLoading(false);
  }
  return (
    <div style={{ height: "100vh", marginTop: "-5.7rem" }}>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "20%", flexDirection: "column" }}
      >
        <img
          src={logo}
          style={{
            width: "auto",
            height: "70%",
            margin: "20px",
            paddingTop: "20px",
          }}
          alt=""
        />
        <h4>LMS-DUT</h4>
      </div>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "80%" }}
      >
        <div>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <Card.Body>
              <h2 className=" text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <br />
                <Button
                  disabled={loading}
                  className="w-100 text-uppercase fw-bold"
                  type="submit"
                >
                  Reset Password
                </Button>
                <div className="w-100 text-center mt-3">
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Log In
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account?
            <Link
              to="/signup"
              style={{ textDecoration: "none", marginLeft: "5px" }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
