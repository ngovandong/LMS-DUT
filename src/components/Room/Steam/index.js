import Banner from "../components/Banner";
import Container from "../components/Container";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";

export default function Stream(props) {
  const { id } = useParams();
  const [currentClass, setCurrentClass] = useState({});
  const { db } = useAuth();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "classes", id), async (doc) => {
      const data = await doc.data();
      setCurrentClass(data);
    });
    return () => unsub();
  }, [id]);
  return (
    <div style={{ width: "80%", maxWidth: "1000px", margin: "auto" }}>
      <Banner data={currentClass} />
      <Container classID={id} />
    </div>
  );
}
