import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  height: 64px;
  align-items: center;
  padding: 0 20px;
  background-color: #FFFFFF;
  z-index: 10;
  box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;


  position: fixed;
  width: 100vw;
  border-bottom: 1px solid #ccc;
  top: 0;

  .groupButtons{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
  }

  a{
    text-decoration: none;
    color: black;
    font-weight: 400;
    font-size: 1.5em;
  }

  a:hover{
    text-decoration: underline;
  }

  /* MEDIA QUERIES */

  @media (max-width: 450px)
  {
    .appBtn,
    .imgAvatar {
      display: none;
    }
  }

`;

export const HeaderButton = styled.button`
  margin-right: 20px;
  transition: all 0.2s;

  :hover{
    border-radius: 50%;
    background: #0000001a;
  }
`;

export const HeaderAvatar = styled.img`
   border-radius: 50%;
  max-width: 40px;
  max-height: 40px;
  margin-right: 20px;
  cursor: pointer;
`;
