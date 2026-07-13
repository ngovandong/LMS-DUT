import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../../contexts/AuthContext";
import { IoMdSend } from "react-icons/io";
import { errorDialogAtom, errorMessage } from "../../../../utils/atoms";
import { useRecoilState } from "recoil";

const Composer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem clamp(0.9rem, 3vw, 1.25rem) 1rem;
  border-top: 1px solid var(--surface-border);
  min-width: 0;
`;

const Avatar = styled.img`
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid var(--brand-100);
`;

const InputWrap = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.35rem 0.35rem 0.85rem;
  border-radius: 999px;
  border: 1.5px solid var(--surface-border);
  background: var(--surface-soft);
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:focus-within {
    border-color: var(--brand-500);
    box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.12);
  }
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  font-size: 0.88rem;
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-muted);
  }
`;

const SendButton = styled.button`
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active }) => ($active ? "var(--brand-600)" : "var(--text-muted)")};
  background: ${({ $active }) => ($active ? "var(--brand-50)" : "transparent")};
  transition: background 0.18s ease, color 0.18s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

export default function InputComment({ announceID }) {
  const { getPhoto, createComment } = useAuth();
  const messageRef = useRef(null);
  const [canSend, setCanSend] = useState(false);
  const [, setShow] = useRecoilState(errorDialogAtom);
  const [, setError] = useRecoilState(errorMessage);

  function handleSend() {
    if (!canSend || !messageRef.current) return;
    try {
      createComment(messageRef.current.value, announceID);
      messageRef.current.value = "";
      setCanSend(false);
    } catch (e) {
      setError(e.message);
      setShow(true);
    }
  }

  function handleChange() {
    setCanSend(Boolean(messageRef.current?.value.trim()));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <Composer aria-label="Add a comment">
      <Avatar src={getPhoto()} alt="" aria-hidden="true" />
      <InputWrap>
        <Input
          ref={messageRef}
          type="text"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          placeholder="Add a class comment..."
          aria-label="Comment text"
        />
        <SendButton
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          $active={canSend}
          aria-label="Send comment"
        >
          <IoMdSend size={18} aria-hidden="true" />
        </SendButton>
      </InputWrap>
    </Composer>
  );
}
