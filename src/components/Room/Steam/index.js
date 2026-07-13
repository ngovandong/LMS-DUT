import Banner from "../components/Banner";
import Container from "../components/Container";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { RoomPage } from "../styles/shared";

export default function Stream() {
  const { id } = useParams();
  const [currentClass, setCurrentClass] = useState({});
  const { db } = useAuth();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "classes", id), (classDoc) => {
      setCurrentClass(classDoc.data() || {});
    });
    return () => unsub();
  }, [db, id]);

  return (
    <RoomPage aria-label="Class stream">
      <Banner data={currentClass} id={id} />
      <Container classID={id} />
    </RoomPage>
  );
}
