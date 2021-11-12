import React, { useState,useEffect } from 'react';

import {Link} from 'react-router-dom'

// ICONS
import { IoMdHome } from 'react-icons/io'

// STYLES
import {
  Menu,
  WrapperMenu,
 } from './styles'

// API
import logo from "../../../img/logo1.png";
import { useAuth } from "../../../contexts/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";


// eslint-disable-next-line import/no-anonymous-default-export
export default ({hide}) => {
  const [classes, setClasses] = useState([]);
  const { currentUser, db } = useAuth();
  async function fetchData() {
    const q=query(collection(db, "users"), where("uid", "==", currentUser.uid))
      onSnapshot(q, async (querySnapshot) => {
      setClasses(querySnapshot.docs[0].data().enrolledClassrooms);
    });
  };
  useEffect(() => {
    fetchData();

  }, [])
  return (
  <Menu show={hide}>
    <WrapperMenu>

      <Link to="/">
        <IoMdHome size={30} color="#4d4848" />
        Home
      </Link>
      {
        classes.map( (menuLine) =>  (
          <Link to={`/class/${menuLine.id}`} key={menuLine.id}>
              <img src={menuLine.creatorPhoto} alt={menuLine.creatorName}></img>
              <span>{menuLine.name}</span>
          </Link>))
      }
    </WrapperMenu>
  </Menu>)
}
