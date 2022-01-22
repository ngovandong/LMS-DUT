import { useAuth } from "../../../../contexts/AuthContext";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import { errorDialogAtom, errorMessage } from "../../../../utils/atoms";
import { useRecoilState } from "recoil";
import {useState,useRef} from 'react'
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  height: 72px;
  margin-bottom: 20px;
  padding: 0;
`;
const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 100%;
  margin: 16px;
`;
const SendBT = styled.button`
  height: 72px;
  width: 72px;
  transition: all 0.2s;
  :hover {
    border-radius: 50%;
    background: #0000001a;
  }
`;
const InputAnnounce = styled.input`
  width: 100%;
  border: none;
  line-height: 100%;
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const [, setShow] = useRecoilState(errorDialogAtom);
  const [, setError] = useRecoilState(errorMessage);
  const { getPhoto, createAnnounce } = useAuth();
  const [send, setSend] = useState(false);
  const messageRef = useRef("");
  function handleSend() {
    if(send){
      try {
        createAnnounce(messageRef.current.value, props.classID);
        messageRef.current.value="";
        setSend(false);
      } catch (e) {
        setError(e.message);
        setShow(true);
      }
    }
  }
  function hanldeChange(){
    if(messageRef.current.value!==""){
      setSend(true);
    }else{
      setSend(false);
    }
  }
  function enter(e){
    if(e.keyCode===13){
      handleSend();
    }
    
  }
  return (
    <Wrapper>
      <div style={{ display: "flex", width: "90%" }}>
        <Avatar src={getPhoto()} />
        <div style={{ width: "100%", display: "flex" }}>
          <InputAnnounce
            onChange={hanldeChange}
            onKeyDown={enter}
            ref={messageRef}
            placeholder="Announce something to class"
          ></InputAnnounce>
        </div>
      </div>
      <SendBT onClick={handleSend}>
        <IoMdSend size={25} color={send?"#007b83":"#9aa0a6"} />
      </SendBT>
    </Wrapper>
  );
};
