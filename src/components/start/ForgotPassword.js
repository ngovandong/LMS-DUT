import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import AuthLayout from "./shared/AuthLayout";
import AuthField from "./shared/AuthField";
import {
  AuthForm,
  AuthAlert,
  PrimaryButton,
  InlineLinkRow,
  AuthLink,
} from "./shared/authStyles";

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
      setMessage("Check your inbox for further instructions.");
    } catch (error) {
      console.log(error);
      setError("Failed to reset password. Please try again.");
    }
    setLoading(false);
  }

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Enter your email and we will send you a reset link."
      footerText="Need an account?"
      footerLinkText="Sign up"
      footerLinkTo="/signup"
    >
      {error && (
        <AuthAlert $variant="danger" role="alert">
          {error}
        </AuthAlert>
      )}
      {message && (
        <AuthAlert $variant="success" role="status">
          {message}
        </AuthAlert>
      )}

      <AuthForm onSubmit={handleSubmit} noValidate>
        <AuthField
          id="forgot-email"
          label="Email"
          type="email"
          inputRef={emailRef}
          required
          autoComplete="email"
          placeholder="you@university.edu"
        />

        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Sending link…" : "Reset password"}
        </PrimaryButton>

        <InlineLinkRow>
          <AuthLink as={Link} to="/login">
            Back to log in
          </AuthLink>
        </InlineLinkRow>
      </AuthForm>
    </AuthLayout>
  );
}
