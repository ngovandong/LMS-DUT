/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

// COMPONENTS
import Card from "../Card/index";
import { createDialogAtom, joinDialogAtom } from "../../../../utils/atoms";
import { useRecoilState } from "recoil";
import { ContainerStyle } from "./styles";
import { useAuth } from "../../../../contexts/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import styled from "styled-components";

export default function Container() {
  const [classes, setClasses] = useState([]);
  const { currentUser, db } = useAuth();
  async function fetchData() {
    const q = query(
      collection(db, "users"),
      where("uid", "==", currentUser.uid)
    );
    onSnapshot(q, async (querySnapshot) => {
      setClasses(querySnapshot.docs[0].data().enrolledClassrooms);
    });
  }

  useEffect(() => {
    const pro=fetchData();
    return pro;
  }, []);

  return (
    <ContainerStyle>
      {classes.length === 0 && <NoClass />}
      {classes.map((item) => (
        <Card key={item.id} data={item} />
      ))}
    </ContainerStyle>
  );
}

const CreateBT = styled.button`
  padding: 8px;
  color: #1a73e8;
  border-radius: 3px;
  transition: background 0.2s 0.1s;
  font-family: Roboto, Arial, sans-serif;
  margin: 5px 10px;
  :hover {
    background: #f7f9ff;
  }
`;
const JoinBT = styled.button`
  padding: 8px;
  background: #1a73e8;
  color: #fff;
  border-radius: 3px;
  transition: background 0.2s 0.1s;
  margin: 5px 10px;
  font-family: Roboto, Arial, sans-serif;
  :hover {
    background: #3663ec;
    box-shadow: 0 2px 1px -1px rgb(26 115 232 / 20%),
      0 1px 1px 0 rgb(26 115 232 / 14%), 0 1px 3px 0 rgb(26 115 232 / 12%);
  }
`;

function NoClass() {
  const [join, setJoin] = useRecoilState(joinDialogAtom);
  const [create, setCreate] = useRecoilState(createDialogAtom);
  function handleCreate() {
    setCreate(true);
  }
  function handleJoin() {
    setJoin(true);
  }
  return (
    <div style={{ margin: "200px auto" }}>
      <h2
        style={{
          fontSize: "1rem",
          textAlign: "center",
          fontWeight: "500",
          fontFamily: "Roboto,Arial,sans-serif",
        }}
      >
        Add class to get started
      </h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CreateBT onClick={handleCreate}>Create class</CreateBT>
        <JoinBT onClick={handleJoin}>Join class</JoinBT>
      </div>
    </div>
  );
}
