import React from "react";
import { useHistory } from "react-router-dom";
// STYLE
import { CardContainer } from "./styles";
import { Link } from "react-router-dom";
import { menu } from "../../../../utils/atoms";
import { useRecoilState } from "recoil";
import { IoIosFolderOpen, IoMdPerson, IoMdMore } from "react-icons/io";

export default function Card(item) {
  const history = useHistory();
  const [nav, setNav] = useRecoilState(menu);
  function handleClick() {
    history.push(`/class/${item.data.id}`);
  }
  function handleOpenFile(e) {
    e.stopPropagation();
    history.push(`/class/${item.data.id}`);
    setNav([false, false, true, false]);
  }
  function handleOpenPeople(e) {
    e.stopPropagation();
    history.push(`/class/${item.data.id}`);
    setNav([false, false, false, true]);
  }
  return (
    <>
      <CardContainer background={item.data.background} onClick={handleClick}>
        <ul>
          <li>
            <header>
              <Link to={`/class/${item.data.id}`}>{item.data.name}</Link>

              <button className="optionsCardBtn">
                <IoMdMore size={25} color="white" />
              </button>

              <p>{item.data.creatorName}</p>
            </header>

            <div className="whitespace">
              <img src={item.data.creatorPhoto} alt="Adorable!" />
            </div>

            <div className="footerCard">
              <button>
                <IoIosFolderOpen
                  size={25}
                  color="rgb(77, 72, 72)"
                  onClick={handleOpenFile}
                />
              </button>

              <button>
                <IoMdPerson
                  size={25}
                  color="rgb(77, 72, 72)"
                  onClick={handleOpenPeople}
                />
              </button>
            </div>
          </li>
        </ul>
      </CardContainer>
    </>
  );
}