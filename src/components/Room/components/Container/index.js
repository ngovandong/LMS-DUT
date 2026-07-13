import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FiInbox } from "react-icons/fi";

import CardPost from "../CardPost";
import NextTask from "../NextTask";
import Announcement from "../Announcement";

import { useAuth } from "../../../../contexts/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {
  Card,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  PrimaryButton,
} from "../../styles/shared";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  min-width: 0;

  @media (min-width: 900px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 1.5rem;
  }
`;

const Sidebar = styled.aside`
  flex-shrink: 0;
  width: 100%;
  min-width: 0;

  @media (min-width: 900px) {
    width: min(16rem, 24%);
    position: sticky;
    top: calc(var(--header-height) + 1rem);
  }
`;

const Feed = styled.section`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LoadMoreWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 0.5rem;
`;

export default function Container({ classID }) {
  const { db } = useAuth();
  const [hasMore, setHasMore] = useState(false);
  const [listDisplay, setListDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numPage, setNumPage] = useState(5);

  function handleClick() {
    setNumPage((prev) => prev + 5);
  }

  useEffect(() => {
    const q = query(
      collection(db, "announces"),
      where("classID", "==", classID)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const listdata = querySnapshot.docs.sort(
        (a, b) => b.data().date - a.data().date
      );

      if (listdata.length > numPage) {
        setHasMore(true);
        setListDisplay(listdata.slice(0, numPage));
      } else {
        setHasMore(false);
        setListDisplay(listdata);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [classID, db, numPage]);

  return (
    <Layout>
      <Sidebar aria-label="Upcoming work">
        <NextTask classID={classID} />
      </Sidebar>

      <Feed aria-label="Class announcements and posts">
        <Announcement classID={classID} />

        {!loading && listDisplay.length === 0 && (
          <Card>
            <EmptyState role="status">
              <EmptyIcon aria-hidden="true">
                <FiInbox />
              </EmptyIcon>
              <EmptyTitle>No posts yet</EmptyTitle>
              <EmptyText>
                Announcements and updates from your teacher will show up here.
              </EmptyText>
            </EmptyState>
          </Card>
        )}

        {listDisplay.map((item) => (
          <CardPost
            key={item.id}
            announceID={item.id}
            data={item.data()}
          />
        ))}

        {hasMore && (
          <LoadMoreWrap>
            <PrimaryButton
              type="button"
              onClick={handleClick}
              aria-label="Load more announcements"
            >
              <ExpandMoreIcon fontSize="small" aria-hidden="true" />
              View more
            </PrimaryButton>
          </LoadMoreWrap>
        )}
      </Feed>
    </Layout>
  );
}
