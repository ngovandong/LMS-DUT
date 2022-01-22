/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
// COMPONENTS
import { HeaderClass } from "../Header";
import { useAuth } from "../../contexts/AuthContext";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import {Outlet,useParams} from 'react-router-dom';
import UpdateClass from "../Modal/UpdateClass";

export default function Room() {
  const {id}=useParams();
  const [is, setIs] = useState(false);
  const [currentClass, setCurrentClass] = useState({});
  const { db, currentUser } = useAuth();
  

  async function fetchData() {
    const classSnap = await getDoc(doc(db, "classes", id));
    const data = classSnap.data();
    if (data.creatorUid === currentUser.uid) {
      setIs(true);
    } else {
      setIs(false);
    }
    await onSnapshot(doc(db, "classes", id), async (doc) => {
      const data = await doc.data();
      setCurrentClass(data);
    });
  }
  useEffect(() => {
    const promise = fetchData();
    return promise;
  }, [id]);
  return (
    <>
      <HeaderClass isAuthor={is} />
      <UpdateClass classID={id} credits={currentClass.credits} name={currentClass.name} />
      <Outlet/>
    </>
  );
}

