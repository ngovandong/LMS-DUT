import React, { useState, useEffect } from "react";

// COMPONENTS
import Card from "../Card/index";

import { ContainerStyle } from "./styles";
import { useAuth } from "../../../../contexts/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function Container() {
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
  }, []);

  return (
    <ContainerStyle>
      {classes.map((item) => (
        <Card key={item.id} data={item} />
      ))}
    </ContainerStyle>
  );
}
