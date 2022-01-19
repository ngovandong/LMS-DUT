import styled from "styled-components";

const Tab = styled.div`
  letter-spacing: 0.01785714em;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem !important;
  font-weight: 500;
  line-height: 1.25rem;
  color: #3c4043;
  text-transform: none;
  box-sizing: border-box;
  padding: 0.125rem 1.5rem 0 1.5rem;
  position: relative !important;
  text-decoration: none !important;
  display: flex;
  border-bottom: solid 0.125rem transparent;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #e4f7fb;
  }
`;
const Under = styled.span`
  border-color: #007b83;
  border-top-width: 0.25rem;
  border-top-style: solid;
  -webkit-border-radius: 0.25rem 0.25rem 0 0;
  border-radius: 0.25rem 0.25rem 0 0;
  bottom: -0.125rem;
  content: "";
  height: 0;
  left: 0;
  position: absolute;
  right: 0;
`;
const Container = styled.div`
  display: flex;
  height: 100%;
`;

export default function NavBar(props) {
  function handleClick(e) {
    const state = [false, false, false,false];
    if (e.target.id === "1") {
      state[0] = true;
    } else if (e.target.id === "2") {
      state[1] = true;
    } else if (e.target.id === "3") {
      state[2] = true;
    } else {
      state[3] = true;
    }
    props.updateNav(state);
  }
  return (
    <Container>
      <Tab key="1" id="1" onClick={handleClick}>
        Stream
        {props.nav[0] && <Under></Under>}
      </Tab>

      <Tab key="2" id="2" onClick={handleClick}>
        Classwork
        {props.nav[1] && <Under></Under>}
      </Tab>
      <Tab key="3" id="3" onClick={handleClick}>
        Material
        {props.nav[2] && <Under></Under>}
      </Tab>

      <Tab key="4" id="4" onClick={handleClick}>
        People
        {props.nav[3] && <Under></Under>}
      </Tab>
    </Container>
  );
}
