import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

// ICONS
import { IoMdHome } from "react-icons/io";

// STYLES
import { Menu, WrapperMenu } from "./styles";

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
      setClasses(querySnapshot.docs[0].data().enrolledClassrooms);
    });
    return () => unsub();
  }, [currentUser]);
  function handle() {
    handleClick();
  }
  return (
    <Menu show={hide}>
      <WrapperMenu>
        <Link to="/">
          <IoMdHome size={30} color="#4d4848" />
          Home
        </Link>
        {classes.map((menuLine) => (
          <Link to={`/${menuLine.id}`} key={menuLine.id} onClick={handle}>
            <img src={menuLine.creatorPhoto} alt={menuLine.creatorName}></img>
            <span>{menuLine.name}</span>
          </Link>
        ))}
      </WrapperMenu>
    </Menu>
  );
};
