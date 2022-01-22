/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { useAuth } from "../../../../contexts/AuthContext";
import {useNavigate} from 'react-router-dom';
// STYLES
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  max-width: 250px;
  height: max-content;

  border: 1px solid #ccc;
  padding: 25px;
  border-radius: 8px;

  @media (max-width: 780px) {
    display: none;
  }
`;

const Title = styled.p`
  color: #242424;
  font-size: 1.2rem;
`;

const Informations = styled.p`
  margin-top: 20px;
  color: #4e4e4e;
  font-size: 0.8rem;
  line-height: 20px;
`;

const SeeAllTasks = styled.a`
  text-decoration: none;
  color: #3b3838;
  font-weight: 600;
  position: relative;

  text-align: end;
  font-size: 0.9rem;
  margin-top: 20px;

  :hover {
    text-decoration: underline;
  }
`;

export default (props) => {
  const navigate=useNavigate();
  const [num, setNum] = useState(0);
  const { db, currentUser } = useAuth();

  async function fetch() {
    const q = query(
      collection(db, "assignments"),
      where("classID", "==", props.classID)
    );
    onSnapshot(q, async (querySnapshot) => {
      let i = 0;
      querySnapshot.docs.forEach((ele) => {
        const data = ele.data();
        const isSubmit = data.turnIns[currentUser.uid] ? true : false;
        if (!(data.isClose || isSubmit)) {
          i++;
        }
      });
      setNum(i);
    });
  }

  useEffect(() => {
    const unSub = fetch();
    return unSub;
  }, [props.classID]);

  return (
    <Wrapper>
      <Title>Up coming</Title>
      <Informations>
        {num ? `Has ${num} work sue soon! ` : "Woohoo, no work due soon!"}
      </Informations>
      <SeeAllTasks onClick={() => navigate("../classwork")}>
        See all tasks
      </SeeAllTasks>
    </Wrapper>
  );
};
