import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../img/Logodhbk.jpg";
import {
  AuthPage,
  AuthShell,
  AuthBrand,
  AuthLogo,
  AuthBrandTitle,
  AuthBrandTagline,
  AuthCard,
  AuthCardTitle,
  AuthCardSubtitle,
  AuthFooter,
  AuthLink,
} from "./authStyles";

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
}) {
  return (
    <AuthPage>
      <AuthShell>
        <AuthBrand>
          <AuthLogo src={logo} alt="Da Nang University of Technology logo" />
          <AuthBrandTitle>
            LMS<span>·DUT</span>
          </AuthBrandTitle>
          <AuthBrandTagline>Learn together, grow together.</AuthBrandTagline>
        </AuthBrand>

        <AuthCard>
          <AuthCardTitle>{title}</AuthCardTitle>
          {subtitle && <AuthCardSubtitle>{subtitle}</AuthCardSubtitle>}
          {children}
        </AuthCard>

        {footerLinkTo ? (
          <AuthFooter>
            {footerText}{" "}
            <AuthLink as={Link} to={footerLinkTo}>
              {footerLinkText}
            </AuthLink>
          </AuthFooter>
        ) : null}
      </AuthShell>
    </AuthPage>
  );
}
