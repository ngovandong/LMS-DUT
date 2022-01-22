import Banner from "../components/Banner";
import Container from "../components/Container";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { doc, onSnapshot, getDoc } from "firebase/firestore";

export default function Stream(props) {
  const { id } = useParams();
  const [currentClass, setCurrentClass] = useState({});
  const { db } = useAuth();
  async function fetchData() {
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
    <div style={{ width: "80%", maxWidth: "1000px", margin: "auto" }}>
      <Banner data={currentClass} />
      <Container classID={id} />
    </div>
  );
}
