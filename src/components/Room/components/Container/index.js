import React, { useState, useEffect } from "react";
import styled from "styled-components";

// COMPONENTS
import CardPost from "../CardPost";
import NextTask from "../NextTask";

import { useAuth } from "../../../../contexts/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Announcement from "../Announcement";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const { db } = useAuth();
  const [announce, setAnnounce] = useState([]);
  async function fetchData() {
    const q = query(
      collection(db, "announces"),
      where("classID", "==", props.classID)
    );
    onSnapshot(q, async (querySnapshot) => {
      setAnnounce(
        querySnapshot.docs.sort((a, b) => b.data().date - a.data().date)
      );
    });
  }

  useEffect(() => {
    const promise = fetchData();
    return promise;
  }, [props.classID]);

  return (
    <>
      <Wrapper>
        <NextTask classID={props.classID} />
        <div style={{ width: "75%" }}>
          <Announcement classID={props.classID} />
          {announce.map((item) => (
            <CardPost key={item.id} announceID={item.id} data={item.data()} />
          ))}
        </div>
      </Wrapper>
    </>
  );
};
