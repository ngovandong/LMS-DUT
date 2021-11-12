import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { BsGoogle } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../img/logo1.png";


export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef=useRef();
  const passwordConfirmRef = useRef();
  const { signup, signInWithGoogle } = useAuth();
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
      await signup(emailRef.current.value, passwordRef.current.value,usernameRef.current.value);
      history.push("/login");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }
  async function googleLogin(e) {
    e.preventDefault();
    try {
      await signInWithGoogle();
      history.push("/");
    } catch (error) {
      window.alert("Fail to log in!");
    }
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
              <h2 className=" text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="usernameRef">
                  <Form.Label>User name</Form.Label>
                  <Form.Control type="text" ref={usernameRef} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Passwrod Confirmation</Form.Label>
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
                  Sign Up
                </Button>
                <br />
                <br />
                <Button
                  className="w-100 text-uppercase fw-bold"
                  style={{ backgroundColor: "#ea4335", border: "0" }}
                  onClick={googleLogin}
                >
                  <BsGoogle style={{ margin: "0 8px 4px" }} /> Log in with
                  Google
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already has an account?
            <Link
              to="/login"
              style={{ textDecoration: "none", marginLeft: "5px" }}
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
