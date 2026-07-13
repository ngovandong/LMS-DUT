import React, { useState, useEffect } from "react";

import ContainerCard from "./components/Container";
import Header from "../Header";
import {
  DashboardPage,
  DashboardHeader,
  DashboardTitle,
  DashboardSubtitle,
  ClassCount,
} from "./shared/dashboardStyles";
import { useAuth } from "../../contexts/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";

function Classes() {
  const [classes, setClasses] = useState([]);
  const { currentUser, db } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", currentUser.uid)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      setClasses(querySnapshot.docs[0]?.data()?.enrolledClassrooms || []);
    });
    return () => unsub();
  }, [currentUser.uid, db]);

  return (
    <>
      <Header />
      <DashboardPage>
        <DashboardHeader>
          <DashboardTitle>Your classes</DashboardTitle>
          <DashboardSubtitle>
            Jump back into coursework, materials, and classmates in one place.
          </DashboardSubtitle>
          {classes.length > 0 && (
            <ClassCount aria-live="polite">
              {classes.length} {classes.length === 1 ? "class" : "classes"}
            </ClassCount>
          )}
        </DashboardHeader>
        <ContainerCard classes={classes} />
      </DashboardPage>
    </>
  );
}

export default Classes;
