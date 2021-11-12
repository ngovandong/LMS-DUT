import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { HeaderButton, Container } from "./styles";
import { Navbar, Nav, Tabs, Tab } from "react-bootstrap";
// MENUS
import HamburguerMenu from "../common/SideMenuBar";

import { HamburguerButton } from "./style-hamburguer-button";
import My from "./my";
import ClassGroup from "./classGroup";
import "./style.css";
import AddClass from '../common/Class/addClass'
import JoinClass from '../common/Class/joinClass'
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
            className="fw-bold"
            style={{
              margin: "0 15px",
              textDecoration: "none",
              fontSize: "20px",
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

      <HamburguerMenu hide={showHamburguer} />
    </>
  );
}

export default Header;

export function HeaderClass() {
  const [showHamburguer, setShowHamburguer] = useState(false);
  const onClickHamburguer = (e) => setShowHamburguer(!showHamburguer);

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
            className="fw-bold"
            style={{
              margin: "0 15px",
              textDecoration: "none",
              fontSize: "20px",
            }}
          >
            LMS-DUT
          </Link>
        </div>

        <Nav variant="tabs" defaultActiveKey="/home"  className="fulH">
          <Nav.Item >
            <Nav.Link className="fulH" active={true}>Stream</Nav.Link>
          </Nav.Item>
          <Nav.Item >
            <Nav.Link className="fulH"  >ClassWork</Nav.Link>
          </Nav.Item>
          <Nav.Item >
            <Nav.Link className="fulH" >People</Nav.Link>
          </Nav.Item>
          <Nav.Item >
            <Nav.Link className="fulH" eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {/* <div className="fulH">
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className=" mt-3"
          >
            <Tab eventKey="home" title="Home"></Tab>
            <Tab eventKey="profile" title="Profile"></Tab>
            <Tab eventKey="contact" title="Contact" disabled></Tab>
          </Tabs>
        </div> */}
        <div style={{ display: "flex", height: "100%", alignItems: "center" }}>
          <HeaderButton className="addBtn">
            <IoMdSettings size={25} color="rgb(77, 72, 72)" />
          </HeaderButton>
          <My />
        </div>
      </Container>

      <HamburguerMenu hide={showHamburguer} />
    </>
  );
}
