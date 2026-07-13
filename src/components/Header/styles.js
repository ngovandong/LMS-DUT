import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: var(--header-height);
  align-items: center;
  padding: 0 clamp(12px, 3vw, 36px);
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  z-index: 100;
  box-shadow: var(--shadow-sm);
  position: fixed;
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
  top: 0;
  left: 0;

  .groupButtons{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
  }

  a{
    text-decoration: none;
    color: var(--text-primary);
    font-weight: 700;
    font-size: 1.5em;
  }

  a:hover{
    color: var(--brand-600);
  }

  @media (max-width: 767px) {
    padding-inline: 10px;

    .brand-name {
      margin-inline: 8px !important;
      font-size: 1.05rem !important;
    }
  }
`;

export const HeaderButton = styled.button`
  width: 42px;
  height: 42px;
  margin-right: 12px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  transition: all 0.2s;

  :hover{
    color: var(--brand-700);
    background: var(--brand-50);
  }
`;

export const HeaderAvatar = styled.img`
  width: 42px;
  height: 42px;
  object-fit: cover;
  padding: 2px;
  border: 2px solid var(--brand-100);
  border-radius: 50%;
  margin-right: 4px;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;

  :hover {
    transform: translateY(-1px);
    border-color: var(--brand-500);
  }
`;
