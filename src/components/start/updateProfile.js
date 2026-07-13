import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./shared/AuthLayout";
import AuthField from "./shared/AuthField";
import {
  AuthForm,
  AuthAlert,
  PrimaryButton,
  InlineLinkRow,
  AuthLink,
} from "./shared/authStyles";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateProfile } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.");
    }
    try {
      setError("");
      setLoading(true);
      await updateProfile(passwordRef.current.value);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Failed to update your account. Please try again.");
    }
    setLoading(false);
  }

  return (
    <AuthLayout
      title="Update profile"
      subtitle="Change your password while keeping the same email."
    >
      {error && (
        <AuthAlert $variant="danger" role="alert">
          {error}
        </AuthAlert>
      )}

      <AuthForm onSubmit={handleSubmit} noValidate>
        <AuthField
          id="profile-email"
          label="Email"
          type="email"
          inputRef={emailRef}
          readOnly
          defaultValue={currentUser?.email}
          autoComplete="email"
        />
        <AuthField
          id="profile-password"
          label="New password"
          type="password"
          inputRef={passwordRef}
          required
          autoComplete="new-password"
          placeholder="Enter a new password"
        />
        <AuthField
          id="profile-password-confirm"
          label="Confirm password"
          type="password"
          inputRef={passwordConfirmRef}
          required
          autoComplete="new-password"
          placeholder="Re-enter your new password"
        />

        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Saving…" : "Save changes"}
        </PrimaryButton>

        <InlineLinkRow>
          <AuthLink as={Link} to="/">
            Back to dashboard
          </AuthLink>
        </InlineLinkRow>
      </AuthForm>
    </AuthLayout>
  );
}
