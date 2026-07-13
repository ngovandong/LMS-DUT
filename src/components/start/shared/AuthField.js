import React from "react";
import { FieldGroup, FieldLabel, FieldInput } from "./authStyles";

export default function AuthField({
  id,
  label,
  type = "text",
  inputRef,
  required = false,
  readOnly = false,
  defaultValue,
  autoComplete,
  placeholder,
}) {
  return (
    <FieldGroup>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <FieldInput
        id={id}
        name={id}
        type={type}
        ref={inputRef}
        required={required}
        readOnly={readOnly}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-required={required}
      />
    </FieldGroup>
  );
}
