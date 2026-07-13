import styled from 'styled-components';

export const Menu = styled.div`
  transform: ${({show}) => show ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.25s ease-in-out;
  z-index: 201;
  position: fixed;
  height: calc(100vh - var(--header-height));
  background: rgba(255, 255, 255, 0.98);
  max-width: 19rem;
  width: calc(100% - 52px);
  top: var(--header-height);
  left: 0;
  box-shadow: 16px 20px 50px rgba(15, 23, 42, 0.14);
  overflow-y: auto;
`;

export const Backdrop = styled.button`
  display: ${({show}) => show ? 'block' : 'none'};
  position: fixed;
  z-index: 200;
  inset: var(--header-height) 0 0;
  width: 100%;
  background: rgba(15, 23, 42, 0.36);
  backdrop-filter: blur(2px);
`;

export const WrapperMenu = styled.ul`
  min-height: 100%;
  padding: 18px 12px 32px;
  display: flex;
  flex-direction: column;


  a{
    display: flex;
    align-items: center;
    min-height: 52px;
    padding: 8px 14px;
    margin-bottom: 4px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--text-secondary);
    transition: background 0.2s ease, color 0.2s ease;
    }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 50px;
    white-space: nowrap;
  }

  svg{
    align-self: center;
    margin-right: 12px;
  }

  img{
    margin-right: 12px;
    width: 34px;
    border-radius: 50%;
    height: 34px;
    object-fit: cover;
    align-self: center;
  }

  a:hover{
    color: var(--brand-700);
    background-color: var(--brand-50);
  }

  p:nth-of-type(1){
    border-top: 1px solid var(--surface-border);
    border-bottom: 1px solid var(--surface-border);
    margin-bottom: 10px;
  }

`;


