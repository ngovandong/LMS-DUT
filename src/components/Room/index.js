/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// COMPONENTS
import Banner from "./components/Banner";
import Container from "./components/Container";
import { HeaderClass } from "../Header";
import { useAuth } from "../../contexts/AuthContext";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import People from "./People";
import Material from "./Material";
import ClassWork from "./ClassWork";
import UpdateClass from "../Modal/UpdateClass";

export default function Room(props) {
  const [is, setIs] = useState(false);
  const [nav, setNav] = useState([true,false,false,false]);
  const [currentClass, setCurrentClass] = useState({});
  const { db, currentUser } = useAuth();
  const {tab}=useParams();
  useEffect(() => {
    if(tab){
      switch (tab) {
        case "tream":
          setNav([true,false,false,false]);
          break;
        case "classwork":
          setNav([false,true,false,false]);
          break;
        case "material":
          setNav([false,false,true,false]);
          break;
        case "people":
          setNav([false,false,false,true]);
          break;
        default:
          break;
      }
    }
  }, [])
  
  function updateNav(newNav){
    setNav(newNav);
  }

  async function fetchData() {
    const classSnap = await getDoc(doc(db, "classes", props.match.params.id));
    const data = classSnap.data();
    if (data.creatorUid === currentUser.uid) {
      setIs(true);
    } else {
      setIs(false);
    }
    await onSnapshot(doc(db, "classes", props.match.params.id), async (doc) => {
      const data = await doc.data();
      setCurrentClass(data);
    });
  }
  useEffect(() => {
    const promise = fetchData();
    return promise;
  }, [props.match.params.id]);
  return (
    <>
      <HeaderClass isAuthor={is} updateNav={updateNav} nav={nav} />
      <UpdateClass classID={props.match.params.id} credits={currentClass.credits} name={currentClass.name} />
      {nav[0] && (
        <Stream currentClass={currentClass} id={props.match.params.id} />
      )}
      {nav[1] && <ClassWork isAuthor={is} classID={props.match.params.id} />}
      {nav[2] && <Material isAuthor={is} classID={props.match.params.id} />}
      {nav[3] && <People isAuthor={is} classID={props.match.params.id} />}
    </>
  );
}

function Stream(props) {
  return (
    <div style={{ width: "80%", maxWidth: "1000px", margin: "auto" }}>
      <Banner data={props.currentClass} id={props.id} />
      <Container classID={props.id} />
    </div>
  );
}
