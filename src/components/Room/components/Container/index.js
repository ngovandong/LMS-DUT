import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// COMPONENTS
import CardPost from "../CardPost";
import NextTask from "../NextTask";

import { useAuth } from "../../../../contexts/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Announcement from "../Announcement";
import { Button } from "@mui/material";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const { db } = useAuth();
  const [hasMore, setHasmore] = useState(false);
  const [listDisplay, setListDisplay] = useState([]);
  const [announce, setAnnounce] = useState([]);
  const [numPage, setNumPage] = useState(5);

  function handleClick() {
    setNumPage(numPage + 5);
  }
  async function fetchData() {
    const q = query(
      collection(db, "announces"),
      where("classID", "==", props.classID)
    );
    onSnapshot(q, async (querySnapshot) => {
      const listdata = await querySnapshot.docs.sort(
        (a, b) => b.data().date - a.data().date
      );
      setAnnounce(listdata);
      if (listdata.length > numPage) {
        setHasmore(true);
        const list = [];
        for (let i = 0; i < numPage; i++) {
          list.push(listdata[i]);
        }
        setListDisplay(list);
      } else {
        setHasmore(false);
        setListDisplay(listdata);
      }
      console.log(1);
    });
  }

  useEffect(() => {
    const promise = fetchData();

    return promise;
  }, [props.classID, numPage]);

  return (
    <>
      <Wrapper>
        <NextTask updateNav={props.updateNav} classID={props.classID} />
        <div style={{ width: "75%" }}>
          <Announcement classID={props.classID} />
          {listDisplay.map((item) => (
            <CardPost key={item.id} announceID={item.id} data={item.data()} />
          ))}
          {hasMore && (
            <Button
              onClick={handleClick}
              style={{ marginBottom: "20px" }}
              variant="outlined"
              startIcon={<ExpandMoreIcon />}
            >
              View more
            </Button>
          )}
        </div>
      </Wrapper>
    </>
  );
};
