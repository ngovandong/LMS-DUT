import styled from "styled-components";

export const CardContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-md);
  background: var(--surface);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: var(--brand-100);
  }

  &:focus-within {
    outline: 3px solid rgba(8, 145, 178, 0.25);
    outline-offset: 2px;
  }

  header {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 7.5rem;
    padding: 1rem 1rem 2.75rem;
    background-image: linear-gradient(
        180deg,
        rgba(15, 23, 42, 0.08) 0%,
        rgba(15, 23, 42, 0.45) 100%
      ),
      url(${(props) => props.$background});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .class-link {
    color: #fff;
    text-decoration: none;
    font-weight: 700;
    font-size: clamp(1rem, 2.8vw, 1.125rem);
    line-height: 1.3;
    letter-spacing: -0.01em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-shadow: 0 1px 2px rgba(15, 23, 42, 0.35);

    &:hover {
      text-decoration: underline;
    }
  }

  .creator-name {
    margin-top: 0.35rem;
    color: rgba(255, 255, 255, 0.92);
    font-size: 0.8125rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .options-btn {
    position: absolute;
    top: 0.65rem;
    right: 0.65rem;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 999px;
    display: grid;
    place-items: center;
    color: #fff;
    background: rgba(15, 23, 42, 0.28);
    transition: background 0.2s ease;

    &:hover {
      background: rgba(15, 23, 42, 0.45);
    }
  }

  .card-body {
    position: relative;
    min-height: 4.5rem;
    padding: 0 1rem 0.75rem;
    display: flex;
    justify-content: flex-end;
  }

  .creator-avatar {
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 50%;
    border: 3px solid var(--surface);
    margin-top: -1.9rem;
    object-fit: cover;
    box-shadow: var(--shadow-sm);
    background: var(--surface-soft);
  }

  .footer-card {
    display: flex;
    justify-content: flex-end;
    gap: 0.25rem;
    border-top: 1px solid var(--surface-border);
    padding: 0.5rem 0.75rem;
    background: var(--surface-soft);
  }

  .footer-card button {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 999px;
    display: grid;
    place-items: center;
    color: var(--text-secondary);
    transition: background 0.2s ease, color 0.2s ease;

    &:hover {
      background: var(--brand-50);
      color: var(--brand-700);
    }
  }
`;
