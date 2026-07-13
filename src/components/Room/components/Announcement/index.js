import { useRef, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../../contexts/AuthContext";
import { IoMdSend } from "react-icons/io";
import { errorDialogAtom, errorMessage } from "../../../../utils/atoms";
import { useRecoilState } from "recoil";
import { Card } from "../../styles/shared";

const Composer = styled(Card)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem clamp(0.85rem, 3vw, 1.1rem);
  min-width: 0;
`;

const Avatar = styled.img`
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--brand-100);
`;

const InputWrap = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.45rem 0.45rem 1rem;
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
  font-size: 0.92rem;
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-muted);
  }
`;

const SendButton = styled.button`
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active }) => ($active ? "var(--brand-600)" : "var(--text-muted)")};
  background: ${({ $active }) => ($active ? "var(--brand-50)" : "transparent")};
  transition: background 0.18s ease, color 0.18s ease, transform 0.18s ease;

  &:hover {
    background: var(--brand-50);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

export default function Announcement({ classID }) {
  const [, setShow] = useRecoilState(errorDialogAtom);
  const [, setError] = useRecoilState(errorMessage);
  const { getPhoto, createAnnounce } = useAuth();
  const [canSend, setCanSend] = useState(false);
  const messageRef = useRef(null);

  function handleSend() {
    if (!canSend || !messageRef.current) return;
    try {
      createAnnounce(messageRef.current.value, classID);
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
    <Composer aria-label="Create class announcement">
      <Avatar src={getPhoto()} alt="" aria-hidden="true" />
      <InputWrap>
        <Input
          ref={messageRef}
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Announce something to your class..."
          aria-label="Announcement message"
        />
        <SendButton
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          $active={canSend}
          aria-label="Post announcement"
        >
          <IoMdSend size={20} aria-hidden="true" />
        </SendButton>
      </InputWrap>
    </Composer>
  );
}
