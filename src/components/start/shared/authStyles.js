import styled, { css } from "styled-components";

export const AuthPage = styled.div`
  min-height: calc(100vh - var(--header-height));
  margin-top: calc(-1 * var(--header-height));
  padding: clamp(1rem, 4vw, 2.5rem) clamp(0.75rem, 3vw, 1.5rem)
    clamp(1.5rem, 5vw, 3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }

  &::before {
    width: clamp(10rem, 28vw, 18rem);
    height: clamp(10rem, 28vw, 18rem);
    top: 6%;
    left: -4%;
    background: radial-gradient(
      circle,
      rgba(8, 145, 178, 0.14) 0%,
      transparent 70%
    );
  }

  &::after {
    width: clamp(8rem, 22vw, 14rem);
    height: clamp(8rem, 22vw, 14rem);
    bottom: 8%;
    right: -2%;
    background: radial-gradient(
      circle,
      rgba(251, 113, 133, 0.12) 0%,
      transparent 70%
    );
  }
`;

export const AuthShell = styled.div`
  width: min(100%, 26rem);
  position: relative;
  z-index: 1;
`;

export const AuthBrand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: clamp(1.25rem, 4vw, 2rem);
`;

export const AuthLogo = styled.img`
  width: auto;
  height: clamp(3.5rem, 12vw, 5rem);
  max-width: 100%;
  object-fit: contain;
  margin-bottom: 0.75rem;
  filter: drop-shadow(var(--shadow-sm));
`;

export const AuthBrandTitle = styled.h1`
  font-size: clamp(1.125rem, 3.5vw, 1.375rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  line-height: 1.2;

  span {
    color: var(--brand-500);
  }
`;

export const AuthBrandTagline = styled.p`
  margin-top: 0.35rem;
  font-size: 0.875rem;
  color: var(--text-muted);
  max-width: 18rem;
`;

export const AuthCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: clamp(1.25rem, 4vw, 2rem);
`;

export const AuthCardTitle = styled.h2`
  font-size: clamp(1.375rem, 4vw, 1.625rem);
  font-weight: 700;
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
  letter-spacing: -0.02em;
`;

export const AuthCardSubtitle = styled.p`
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
  line-height: 1.5;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const FieldLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
`;

export const FieldInput = styled.input`
  width: 100%;
  min-height: 2.75rem;
  padding: 0.65rem 0.85rem;
  border: 1.5px solid var(--surface-border);
  border-radius: var(--radius-sm);
  background: var(--surface-soft);
  color: var(--text-primary);
  transition: border-color 0.2s ease, box-shadow 0.2s ease,
    background-color 0.2s ease;

  &::placeholder {
    color: var(--text-muted);
  }

  &:hover:not(:disabled):not([readonly]) {
    border-color: var(--brand-100);
  }

  &:focus {
    outline: none;
    border-color: var(--brand-500);
    background: var(--surface);
    box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.15);
  }

  &:disabled,
  &[readonly] {
    cursor: not-allowed;
    opacity: 0.72;
    background: var(--surface-soft);
  }
`;

const buttonBase = css`
  width: 100%;
  min-height: 2.75rem;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 0.9375rem;
  letter-spacing: 0.01em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.15s ease, box-shadow 0.2s ease,
    background-color 0.2s ease, opacity 0.2s ease;

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const PrimaryButton = styled.button`
  ${buttonBase}
  background: var(--brand-500);
  color: #fff;
  box-shadow: var(--shadow-brand);

  &:hover:not(:disabled) {
    background: var(--brand-600);
  }

  &:focus-visible {
    outline: 3px solid rgba(8, 145, 178, 0.35);
    outline-offset: 3px;
  }
`;

export const GoogleButton = styled.button`
  ${buttonBase}
  background: var(--surface);
  color: var(--text-primary);
  border: 1.5px solid var(--surface-border);

  &:hover:not(:disabled) {
    background: var(--surface-soft);
    border-color: var(--brand-100);
    box-shadow: var(--shadow-sm);
  }
`;

export const AuthDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-muted);
  font-size: 0.8125rem;
  font-weight: 500;
  margin: 0.15rem 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--surface-border);
  }
`;

export const AuthAlert = styled.div`
  padding: 0.75rem 0.9rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  line-height: 1.45;
  margin-bottom: 0.25rem;
  border: 1px solid transparent;

  ${(props) =>
    props.$variant === "danger" &&
    css`
      background: rgba(220, 38, 38, 0.08);
      color: var(--danger);
      border-color: rgba(220, 38, 38, 0.2);
    `}

  ${(props) =>
    props.$variant === "success" &&
    css`
      background: rgba(8, 145, 178, 0.08);
      color: var(--brand-700);
      border-color: rgba(8, 145, 178, 0.2);
    `}
`;

export const AuthFooter = styled.p`
  text-align: center;
  margin-top: 1.25rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
`;

export const AuthLink = styled.a`
  color: var(--brand-600);
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: var(--brand-700);
    text-decoration: underline;
  }
`;

export const InlineLinkRow = styled.div`
  text-align: center;
  margin-top: 0.25rem;
`;
