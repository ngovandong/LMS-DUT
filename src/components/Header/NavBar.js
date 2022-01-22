import styled from "styled-components";
import { useParams, NavLink } from "react-router-dom";
const Tab = styled.div`
  letter-spacing: 0.01785714em;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem !important;
  font-weight: 600;
  line-height: 1.25rem;
  color: #3c4043;
  text-transform: none;
  box-sizing: border-box;
  height: 100%;
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

const menu = [{path:"stream",name:"Stream"}, {path:"classwork",name:"Classwork"}, {path:"material",name:"Material"}, {path:"people",name:"People"}];
export default function NavBar(props) {
  const { id } = useParams();
  return (
    <Container>
      {menu.map((ele) => (
        <NavLink
          style={{display:"block",textDecoration:"none",height:"100%"}}
          to={`/${id}/${ele.path}`}
          children={({ isActive }) => {
            return isActive ? <TabUnder name={ele.name} /> : <Tab>{ele.name}</Tab>;
          }}
          key={ele.path}
        ></NavLink>
      ))}
      
    </Container>
  );
}

function TabUnder(props) {
  return (
    <Tab>
      {props.name}
      <Under />
    </Tab>
  );
}
