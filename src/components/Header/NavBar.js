import styled from "styled-components";
import { useParams, NavLink } from "react-router-dom";
import { FiBookOpen, FiFolder, FiMessageSquare, FiUsers } from "react-icons/fi";

const Tab = styled.div`
  gap: 7px;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.25rem;
  color: var(--text-secondary);
  height: 100%;
  padding: 0 1.15rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;

  svg {
    display: none;
  }

  :hover {
    color: var(--brand-700);
    background-color: var(--brand-50);
  }

  @media (max-width: 767px) {
    min-width: 70px;
    padding: 7px 8px 5px;
    flex-direction: column;
    gap: 2px;
    font-size: 0.68rem;
    line-height: 1rem;
    border-radius: 10px;

    svg {
      display: block;
      font-size: 1.25rem;
    }
  }
`;
const Under = styled.span`
  background: var(--brand-500);
  border-radius: 999px;
  bottom: 0;
  content: "";
  height: 3px;
  left: 14px;
  position: absolute;
  right: 14px;

  @media (max-width: 767px) {
    top: 2px;
    bottom: auto;
    left: 20px;
    right: 20px;
  }
`;
const Container = styled.div`
  display: flex;
  height: 100%;

  @media (max-width: 767px) {
    position: fixed;
    z-index: 99;
    left: 10px;
    right: 10px;
    bottom: max(10px, env(safe-area-inset-bottom));
    height: 60px;
    justify-content: space-around;
    padding: 4px;
    border: 1px solid var(--surface-border);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.94);
    box-shadow: 0 14px 40px rgba(15, 23, 42, 0.2);
    backdrop-filter: blur(16px);
  }
`;

const menu = [
  { path: "stream", name: "Stream", icon: FiMessageSquare },
  { path: "classwork", name: "Classwork", icon: FiBookOpen },
  { path: "material", name: "Materials", icon: FiFolder },
  { path: "people", name: "People", icon: FiUsers },
];
export default function NavBar(props) {
  const { id } = useParams();
  return (
    <Container>
      {menu.map((ele) => (
        <NavLink
          style={{display:"block",textDecoration:"none",height:"100%"}}
          to={`/${id}/${ele.path}`}
          children={({ isActive }) => {
            const Icon = ele.icon;
            return isActive ? (
              <TabUnder name={ele.name} icon={<Icon />} />
            ) : (
              <Tab><Icon />{ele.name}</Tab>
            );
          }}
          key={ele.path}
        ></NavLink>
      ))}
      
    </Container>
  );
}

function TabUnder(props) {
  return (
    <Tab style={{ color: "var(--brand-700)", background: "var(--brand-50)" }}>
      {props.icon}
      {props.name}
      <Under />
    </Tab>
  );
}
