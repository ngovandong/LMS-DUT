// eslint-disable-next-line import/no-anonymous-default-export
import React from "react";
import styled from "styled-components";
import { useAuth } from "../../../../contexts/AuthContext";
import { IoMdSend } from "react-icons/io";

const Wrapper = styled.div`
  border-top: 1px solid #ccc;
  margin: 15px;
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 100%;
  margin-top: 15px;
`;
const Input = styled.input`
  margin-left: 15px;
  margin-top: 15px;
  height: 45px;
  width: 100%;
  font-size: 0.95rem;
  padding: 10px;
  border-radius: 50px;
  border: 1px solid #ccc;

  :focus {
    border: 1px solid green;
  }
`;

const SendBT = styled.button`
  position: relative;
  right: 40px;
  top: 5px;
  padding:5px;
  transition: all 0.2s;
  :hover{
    border-radius: 50%;
    background: #0000001a;
  }
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { getPhoto } = useAuth();

  return (
    <Wrapper>
      <Avatar src={getPhoto()} />
      <Input placeholder="Add class comment..." />
      <SendBT>
        <IoMdSend size={25} />
      </SendBT>
    </Wrapper>
  );
};
