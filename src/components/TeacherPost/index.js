/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";

// COMPONENTS
import Banner from "./components/Banner";
import Container from "./components/Container";
import DoubtButton from "../common/ButtonDoubt";
import { HeaderClass } from "../Header";
import { useAuth } from "../../contexts/AuthContext";
import { doc,  onSnapshot } from "firebase/firestore";

export default (props) => {
  const [currentClass, setCurrentClass] = useState({});
  const { db } = useAuth();
  async function fetchData() {
    await onSnapshot(doc(db, "classes", props.match.params.id), (doc) => {
      console.log(props.match.params.id);
      console.log(doc.data());
      setCurrentClass(doc.data());
    });
  }
  useEffect(() => {
    fetchData();
  });
  return (
    <>
      <HeaderClass />
      <div style={{width:"80%", maxWidth:"1000px",margin:"auto"}}>
      <Banner data={currentClass} id={props.match.params.id} />

      {/* PASSO ID NO CONTAINER PARA SABER A PAGINA DA TAREFA ATUAL */}
      <Container id={1} />
      <DoubtButton />
      </div>
    </>
  );
};
