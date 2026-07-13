import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { FiCalendar, FiChevronRight } from "react-icons/fi";
import { Card } from "../../styles/shared";

const Widget = styled(Card)`
  padding: 1.1rem clamp(0.9rem, 3vw, 1.25rem);
  background: linear-gradient(
    145deg,
    rgba(236, 254, 255, 0.9) 0%,
    var(--surface) 55%,
    rgba(255, 251, 235, 0.55) 100%
  );
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.65rem;
`;

const IconBadge = styled.span`
  width: 2rem;
  height: 2rem;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--brand-100);
  color: var(--brand-700);
  font-size: 1rem;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 800;
  color: var(--brand-700);
  letter-spacing: -0.02em;
`;

const Message = styled.p`
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--text-secondary);

  strong {
    color: var(--accent-coral);
    font-weight: 800;
  }
`;

const SeeAllLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.85rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--brand-600);
  transition: color 0.18s ease, gap 0.18s ease;

  &:hover {
    color: var(--brand-700);
    gap: 0.4rem;
  }
`;

export default function NextTask({ classID }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [num, setNum] = useState(null);
  const { db, currentUser } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, "assignments"),
      where("classID", "==", classID)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let count = 0;
      querySnapshot.docs.forEach((ele) => {
        const data = ele.data();
        const isSubmit = Boolean(data.turnIns[currentUser.uid]);
        if (!(data.isClose || isSubmit)) {
          count++;
        }
      });
      setNum(count);
    });
    return () => unsub();
  }, [classID, currentUser.uid, db]);

  const isLoading = num === null;

  return (
    <Widget aria-label="Upcoming assignments" aria-busy={isLoading}>
      <Header>
        <IconBadge aria-hidden="true">
          <FiCalendar />
        </IconBadge>
        <Title>Upcoming</Title>
      </Header>

      <Message role="status">
        {isLoading ? (
          "Checking your assignments..."
        ) : num > 0 ? (
          <>
            You have <strong>{num}</strong>{" "}
            {num === 1 ? "assignment" : "assignments"} due soon!
          </>
        ) : (
          "Woohoo — no work due soon!"
        )}
      </Message>

      <SeeAllLink
        type="button"
        onClick={() => navigate(`/${id}/classwork`)}
        aria-label="See all classwork assignments"
      >
        See all tasks
        <FiChevronRight aria-hidden="true" />
      </SeeAllLink>
    </Widget>
  );
}
