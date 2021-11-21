import { useRef, useState } from "react";
import { ListGroup, Overlay, Popover } from "react-bootstrap";
import { HeaderButton } from "./styles";
import { IoMdAdd } from "react-icons/io";
import "./style.css";
import {createDialogAtom,joinDialogAtom} from '../../utils/atoms'
import {useRecoilState} from 'recoil'
export default function ClassGroup() {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [createOpened, setCreateOpened] = useRecoilState(createDialogAtom);
  const [joinOpened, setJoinOpened] = useRecoilState(joinDialogAtom);

  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  async function handleCreate() {
    setCreateOpened(true);
    setShow(false);
  }
  async function handleJoin() {
    setJoinOpened(true);
    setShow(false);
  }

  return (
    <div ref={ref}>
      <HeaderButton className="addBtn" onClick={handleClick}  >
      {/* onBlur={()=>setShow(false)} */}
        <IoMdAdd size={25} color="rgb(77, 72, 72)" />
      </HeaderButton>
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
              <ListGroup.Item className="sub" onClick={handleJoin} >
                Join class
              </ListGroup.Item>
              <ListGroup.Item className="sub" onClick={handleCreate}>
                Create class
              </ListGroup.Item>
            </ListGroup>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}
