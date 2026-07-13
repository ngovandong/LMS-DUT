import React from "react";
import styled from "styled-components";
import getTime from "../../../../funtions/getRelativeTime";

const Comment = styled.article`
  display: flex;
  gap: 0.65rem;
  padding: 0.75rem clamp(0.9rem, 3vw, 1.25rem);
  min-width: 0;
`;

const Avatar = styled.img`
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid var(--surface-border);
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem;
  margin-bottom: 0.2rem;
`;

const Name = styled.span`
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-primary);
  text-transform: capitalize;
`;

const Date = styled.time`
  font-size: 0.74rem;
  color: var(--text-muted);
`;

const CommentText = styled.p`
  font-size: 0.86rem;
  line-height: 1.55;
  color: var(--text-secondary);
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export default function Comments({ data }) {
  return (
    <Comment aria-label={`Comment by ${data.name}`}>
      <Avatar src={data.photo} alt="" aria-hidden="true" />
      <Body>
        <Meta>
          <Name>{data.name}</Name>
          <Date dateTime={new Date(data.date).toISOString()}>
            {getTime(data.date)}
          </Date>
        </Meta>
        <CommentText>{data.message}</CommentText>
      </Body>
    </Comment>
  );
}
