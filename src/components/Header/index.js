/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { HeaderButton, Container } from "./styles";
// MENUS
import HamburguerMenu from "../common/SideMenuBar";
import { HamburguerButton } from "./style-hamburguer-button";
import My from "./my";
import ClassGroup from "./classGroup";
import "./style.css";
import AddClass from "../Modal/AddClass";
import JoinClass from "../Modal/JoinClass";
import NavBar from "./NavBar";
import { updateClassDialog } from "../../utils/atoms";
import { useRecoilState } from "recoil";

function Header() {
  const [showHamburguer, setShowHamburguer] = useState(false);
  const onClickHamburguer = (e) => setShowHamburguer(!showHamburguer);

  return (
    <>
      <AddClass />
      <JoinClass />
      <Container>
        <div style={{ display: "flex", height: "100%", alignItems: "center" }}>
          <HamburguerButton
            style={{ lineHeight: "100%" }}
            show={showHamburguer}
            onClick={(e) => onClickHamburguer(e)}
            aria-label={showHamburguer ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={showHamburguer}
          >
            <div></div>
            <div></div>
            <div></div>
          </HamburguerButton>

          <Link
            className="brand-name"
            to="/"
            style={{
              margin: "0 15px",
              textDecoration: "none",
              fontSize: "1.375rem",
              fontWeight: "800",
              lineHeight: "1.75rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.04em",
            }}
          >
            LMS<span style={{ color: "var(--brand-500)" }}>·DUT</span>
          </Link>
        </div>
        <div className="groupButtons">
          <ClassGroup />
          <My />
        </div>
      </Container>

      <HamburguerMenu
        hide={showHamburguer}
        handleClick={(e) => onClickHamburguer(e)}
      />
    </>
  );
}

export default Header;

export function HeaderClass(props) {
  const [showHamburguer, setShowHamburguer] = useState(false);
  const onClickHamburguer = (e) => setShowHamburguer(!showHamburguer);
  const [show, setShow] = useRecoilState(updateClassDialog);
  function handleUpdate() {
    setShow(true);
  }
  return (
    <>
      <Container>
        <div style={{ display: "flex", height: "100%", alignItems: "center" }}>
          <HamburguerButton
            style={{ lineHeight: "100%" }}
            show={showHamburguer}
            onClick={(e) => onClickHamburguer(e)}
            aria-label={showHamburguer ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={showHamburguer}
          >
            <div></div>
            <div></div>
            <div></div>
          </HamburguerButton>

          <Link
            className="brand-name"
            to="/"
            style={{
              margin: "0 15px",
              textDecoration: "none",
              fontSize: "1.375rem",
              fontWeight: "800",
              lineHeight: "1.75rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.04em",
            }}
          >
            LMS<span style={{ color: "var(--brand-500)" }}>·DUT</span>
          </Link>
        </div>

        <NavBar  />

        <div style={{ display: "flex", height: "100%", alignItems: "center" }}>
          {props.isAuthor && (
            <HeaderButton className="addBtn" onClick={handleUpdate} aria-label="Class settings">
              <IoMdSettings size={25} color="rgb(77, 72, 72)" />
            </HeaderButton>
          )}
          <My />
        </div>
      </Container>

      <HamburguerMenu
        hide={showHamburguer}
        handleClick={(e) => onClickHamburguer(e)}
      />
    </>
  );
}
