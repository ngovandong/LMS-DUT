import { useRef, useState } from "react";
import { ListGroup, Overlay, Popover } from "react-bootstrap";
import { HeaderAvatar } from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import "./style.css";
export default function My() {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const { logout, getPhoto } = useAuth();
  const history = useHistory();

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  async function handleLogout(e) {
    e.preventDefault();

    try {
      await logout();
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      history.push("/update-profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div ref={ref}>
      <HeaderAvatar
        className="imgAvatar"
        src={getPhoto()}
        alt="Unknown"
        onClick={handleClick}
      />
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={0}
      >
        <Popover id="popover-contained">
          <Popover.Body className="p-1">
            <ListGroup>
              <ListGroup.Item className="sub" onClick={handleUpdate} >Update infor</ListGroup.Item>
              <ListGroup.Item className="sub" style={{borderRadius:"5px"}}  onClick={handleLogout} variant="primary">Log Out</ListGroup.Item>
            </ListGroup>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}
