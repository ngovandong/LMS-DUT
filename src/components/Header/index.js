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
          >
            <div></div>
            <div></div>
            <div></div>
          </HamburguerButton>

          <Link
            to="/"
            style={{
              margin: "0 15px",
              textDecoration: "none",
              fontSize: "1.375rem",
              fontWeight: "400",
              lineHeight: "1.75rem",
              color: "#3c4043",
            }}
          >
            LMS-DUT
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
          >
            <div></div>
            <div></div>
            <div></div>
          </HamburguerButton>

          <Link
            to="/"
            style={{
              margin: "0 15px",
              textDecoration: "none",
              fontSize: "1.375rem",
              fontWeight: "400",
              lineHeight: "1.75rem",
              color: "#3c4043",
            }}
          >
            LMS-DUT
          </Link>
        </div>

        <NavBar id={props.id} />

        <div style={{ display: "flex", height: "100%", alignItems: "center" }}>
          {props.isAuthor && (
            <HeaderButton className="addBtn" onClick={handleUpdate}>
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
