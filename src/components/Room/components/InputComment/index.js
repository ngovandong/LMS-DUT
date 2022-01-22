// eslint-disable-next-line import/no-anonymous-default-export
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../../contexts/AuthContext";
import { IoMdSend } from "react-icons/io";
import { errorDialogAtom, errorMessage } from "../../../../utils/atoms";
import { useRecoilState } from "recoil";

const Wrapper = styled.div`
  border-top: 1px solid #ccc;
  margin: 15px;
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 100%;
  margin-top: 15px;
`;
const Input = styled.input`
  width: 90%;
  border: none;
`;

export const SendBT = styled.button`
  height: 35px;
  width: 35px;
  position: relative;
  bottom: 5px;
  transition: all 0.2s;
  :hover {
    border-radius: 50%;
    background: #0000001a;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 15px;
  margin-top: 15px;
  height: 45px;
  width: 100%;
  font-size: 0.95rem;
  padding: 10px;
  border-radius: 50px;
  border: 1px solid #ccc;

  :focus {
    border: 1px solid #007b83;
  }
`;
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const { getPhoto, createComment } = useAuth();
  const messageRef = useRef("");
  const [send, setSend] = useState(false);
  const [, setShow] = useRecoilState(errorDialogAtom);
  const [, setError] = useRecoilState(errorMessage);
  function handleSend() {
    if (send) {
      try {
        createComment(messageRef.current.value, props.announceID);
        messageRef.current.value = "";
        setSend(false);
      } catch (e) {
        setError(e.message);
        setShow(true);
      }
    }
  }

  function hanldeChange() {
    if (messageRef.current.value !== "") {
      setSend(true);
    } else {
      setSend(false);
    }
  }
  function enter(e) {
    if (e.keyCode === 13) {
      handleSend();
    }
  }
  return (
    <Wrapper>
      <Avatar src={getPhoto()} />
      <Container>
        <Input
          onKeyDown={enter}
          ref={messageRef}
          placeholder="Add class comment..."
          onChange={hanldeChange}
        />
        <SendBT onClick={handleSend}>
          <IoMdSend size={25} color={send ? "#007b83" : "#9aa0a6"} />
        </SendBT>
      </Container>
    </Wrapper>
  );
};
