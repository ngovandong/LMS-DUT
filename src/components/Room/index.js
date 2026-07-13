import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HeaderClass } from "../Header";
import { useAuth } from "../../contexts/AuthContext";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { Outlet, useParams } from "react-router-dom";
import UpdateClass from "../Modal/UpdateClass";

const Content = styled.div`
  min-width: 0;

  @media (max-width: 767px) {
    padding-bottom: calc(88px + env(safe-area-inset-bottom, 0px));
  }
`;

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
      if (data?.creatorUid === currentUser.uid) {
        setIs(true);
      } else {
        setIs(false);
      }
      unsub = onSnapshot(doc(db, "classes", id), (classDoc) => {
        setCurrentClass(classDoc.data() || {});
      });
    };
    fetchData();

    return () => unsub?.();
  }, [currentUser.uid, db, id]);

  return (
    <>
      <HeaderClass isAuthor={is} />
      <UpdateClass
        classID={id}
        credits={currentClass.credits}
        name={currentClass.name}
      />
      <Content>
        <Outlet />
      </Content>
    </>
  );
}
