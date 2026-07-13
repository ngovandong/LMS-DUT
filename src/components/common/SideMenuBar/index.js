import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

// ICONS
import { IoMdHome } from "react-icons/io";

// STYLES
import { Backdrop, Menu, WrapperMenu } from "./styles";

// API
import { useAuth } from "../../../contexts/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ hide, handleClick }) => {
  const [classes, setClasses] = useState([]);
  const { currentUser, db } = useAuth();
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", currentUser.uid)
    );
    const unsub = onSnapshot(q, async (querySnapshot) => {
      const profile = querySnapshot.docs[0]?.data();
      setClasses(profile?.enrolledClassrooms || []);
    });
    return () => unsub();
  }, [currentUser, db]);
  function handle() {
    handleClick();
  }
  return (
    <>
      <Backdrop show={hide} onClick={handle} aria-label="Close navigation menu" />
      <Menu show={hide} aria-hidden={!hide}>
        <WrapperMenu>
          <Link to="/" onClick={handle}>
            <IoMdHome size={26} color="var(--brand-600)" />
            Home
          </Link>
          {classes.map((menuLine) => (
            <Link to={`/${menuLine.id}`} key={menuLine.id} onClick={handle}>
              <img src={menuLine.creatorPhoto} alt="" />
              <span>{menuLine.name}</span>
            </Link>
          ))}
        </WrapperMenu>
      </Menu>
    </>
  );
};
