/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import { HeaderClass } from "../Header";
import { useAuth } from "../../contexts/AuthContext";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { Outlet, useParams } from "react-router-dom";
import UpdateClass from "../Modal/UpdateClass";

export default function Room() {
  const { id } = useParams();
  const [is, setIs] = useState(false);
  const [currentClass, setCurrentClass] = useState({});
  const { db, currentUser } = useAuth();

  useEffect(() => {
    let unsub;
    const fetchData = async () => {
      const classSnap = await getDoc(doc(db, "classes", id));
      const data = classSnap.data();
      if (data.creatorUid === currentUser.uid) {
        setIs(true);
      } else {
        setIs(false);
      }
      unsub = onSnapshot(doc(db, "classes", id), async (doc) => {
        const data = await doc.data();
        setCurrentClass(data);
      });
    };
    fetchData();

    return () => unsub();
  }, [id]);
  return (
    <>
      <HeaderClass isAuthor={is} />
      <UpdateClass
        classID={id}
        credits={currentClass.credits}
        name={currentClass.name}
      />
      <Outlet />
    </>
  );
}
