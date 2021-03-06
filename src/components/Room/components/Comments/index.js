import React from "react";
import styled from "styled-components";
import getTime from "../../../../funtions/getRelativeTime";

const Wrapper = styled.div`
  position: relative;
  padding: 20px;

  :hover button {
    visibility: visible;
  }
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 100%;
`;

const Name = styled.span`
  display: flex;
  align-items: center;
  position: absolute;
  top: 30px;
  left: 70px;
  text-transform: uppercase;
  font-size: 0.9rem;
`;

const Date = styled.span`
  text-transform: lowercase;
  margin-left: 5px;
  color: #4e4e4e;
  font-size: 0.8rem;
`;

const CommentText = styled.p`
  position: relative;
  margin-left: 50px;
  margin-top: -5px;
  font-size: 0.85rem;
  color: #4e4e4e;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`;

// const ReplyButton = styled.button`
//   visibility: hidden;
//   position: absolute;
//   right: 5px;
//   top: 30px;
// `;

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ data }) => {
  return (
    <Wrapper>
      <Avatar src={data.photo} />
      <Name>
        {data.name} <Date>{getTime(data.date)}</Date>{" "}
      </Name>
      <CommentText>{data.message}</CommentText>

      {/* <ReplyButton>
      <IoIosUndo size={20} color="#4e4e4e"/>
    </ReplyButton> */}
    </Wrapper>
  );
};
