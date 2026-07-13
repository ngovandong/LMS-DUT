import styled from "styled-components";
import { Card } from "../../styles/shared";

export const Wrapper = styled(Card)`
  min-width: 0;
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem clamp(0.9rem, 3vw, 1.25rem) 0.5rem;
`;

export const Avatar = styled.img`
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--brand-100);
`;

export const Informations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
`;

export const PostOwner = styled.span`
  font-weight: 700;
  font-size: 0.92rem;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DateOfPost = styled.time`
  font-size: 0.78rem;
  color: var(--text-muted);
`;

export const Description = styled.p`
  padding: 0.35rem clamp(0.9rem, 3vw, 1.25rem) 1rem;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--text-secondary);
  word-break: break-word;
  border-bottom: 1px solid var(--surface-border);
`;

export const CommentsSection = styled.div`
  padding: 0.25rem 0;
`;

export const ShowCommentsButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0.35rem clamp(0.9rem, 3vw, 1.25rem);
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--brand-700);
  background: var(--brand-50);
  transition: background 0.18s ease;

  &:hover {
    background: var(--brand-100);
  }
`;

export const CommentCount = styled.span`
  min-width: 1.35rem;
  height: 1.35rem;
  padding: 0 0.35rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 800;
  color: #fff;
  background: var(--brand-500);
`;
