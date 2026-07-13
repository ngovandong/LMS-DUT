import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./shared/AuthLayout";
import AuthField from "./shared/AuthField";
import {
  AuthForm,
  AuthAlert,
  PrimaryButton,
  GoogleButton,
  AuthDivider,
  InlineLinkRow,
  AuthLink,
} from "./shared/authStyles";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
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
      setError("Failed to log in. Please check your email and password.");
    }
    setLoading(false);
  }

  async function googleLogin(e) {
    e.preventDefault();
    try {
      setError("");
      setGoogleLoading(true);
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      setError("Failed to sign in with Google. Please try again.");
    }
    setGoogleLoading(false);
  }

  return (
    <AuthLayout
      title="Log in"
      subtitle="Welcome back. Pick up right where you left off."
      footerText="Need an account?"
      footerLinkText="Sign up"
      footerLinkTo="/signup"
    >
      {error && (
        <AuthAlert $variant="danger" role="alert">
          {error}
        </AuthAlert>
      )}

      <AuthForm onSubmit={handleSubmit} noValidate>
        <AuthField
          id="login-email"
          label="Email"
          type="email"
          inputRef={emailRef}
          required
          autoComplete="email"
          placeholder="you@university.edu"
        />
        <AuthField
          id="login-password"
          label="Password"
          type="password"
          inputRef={passwordRef}
          required
          autoComplete="current-password"
          placeholder="Enter your password"
        />

        <PrimaryButton type="submit" disabled={loading || googleLoading}>
          {loading ? "Logging in…" : "Log in"}
        </PrimaryButton>

        <AuthDivider>or</AuthDivider>

        <GoogleButton
          type="button"
          onClick={googleLogin}
          disabled={loading || googleLoading}
          aria-label="Log in with Google"
        >
          <BsGoogle aria-hidden="true" />
          {googleLoading ? "Connecting…" : "Continue with Google"}
        </GoogleButton>

        <InlineLinkRow>
          <AuthLink as={Link} to="/forgot-password">
            Forgot password?
          </AuthLink>
        </InlineLinkRow>
      </AuthForm>
    </AuthLayout>
  );
}
