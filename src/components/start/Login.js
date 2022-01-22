import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/Logodhbk.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Fail to log in!");
    }
    setLoading(false);
  }

  async function googleLogin(e) {
    e.preventDefault();
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      window.alert("Fail to log in!");
    }
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
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <br />
                <Button
                  disabled={loading}
                  className="w-100 text-uppercase fw-bold"
                  type="submit"
                >
                  Log In
                </Button>
                <br />
                <br />
                <Button
                  onClick={googleLogin}
                  className="w-100 text-uppercase fw-bold"
                  style={{ backgroundColor: "#ea4335", border: "0" }}
                >
                  <BsGoogle style={{ margin: "0 8px 4px" }} /> Log in with
                  Google
                </Button>
                <div className="w-100 text-center mt-3">
                  <Link
                    to="/forgot-password"
                    style={{ textDecoration: "none" }}
                  >
                    Forget password
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
