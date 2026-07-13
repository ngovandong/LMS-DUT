import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { BsGoogle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./shared/AuthLayout";
import AuthField from "./shared/AuthField";
import {
  AuthForm,
  AuthAlert,
  PrimaryButton,
  GoogleButton,
  AuthDivider,
} from "./shared/authStyles";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.");
    }
    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value
      );
      navigate("/login");
    } catch (error) {
      setError(error.message);
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
      title="Create account"
      subtitle="Join your classes and start learning in minutes."
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkTo="/login"
    >
      {error && (
        <AuthAlert $variant="danger" role="alert">
          {error}
        </AuthAlert>
      )}

      <AuthForm onSubmit={handleSubmit} noValidate>
        <AuthField
          id="signup-username"
          label="Display name"
          type="text"
          inputRef={usernameRef}
          required
          autoComplete="name"
          placeholder="How should we call you?"
        />
        <AuthField
          id="signup-email"
          label="Email"
          type="email"
          inputRef={emailRef}
          required
          autoComplete="email"
          placeholder="you@university.edu"
        />
        <AuthField
          id="signup-password"
          label="Password"
          type="password"
          inputRef={passwordRef}
          required
          autoComplete="new-password"
          placeholder="Create a strong password"
        />
        <AuthField
          id="signup-password-confirm"
          label="Confirm password"
          type="password"
          inputRef={passwordConfirmRef}
          required
          autoComplete="new-password"
          placeholder="Re-enter your password"
        />

        <PrimaryButton type="submit" disabled={loading || googleLoading}>
          {loading ? "Creating account…" : "Sign up"}
        </PrimaryButton>

        <AuthDivider>or</AuthDivider>

        <GoogleButton
          type="button"
          onClick={googleLogin}
          disabled={loading || googleLoading}
          aria-label="Sign up with Google"
        >
          <BsGoogle aria-hidden="true" />
          {googleLoading ? "Connecting…" : "Continue with Google"}
        </GoogleButton>
      </AuthForm>
    </AuthLayout>
  );
}
