import React from "react";
import { useNavigate } from "react-router-dom";
// STYLE
import { CardContainer } from "./styles";
import { Link } from "react-router-dom";
import { IoIosFolderOpen, IoMdPerson, IoMdMore } from "react-icons/io";

export default function Card(item) {
<<<<<<< HEAD
  const navigate = useNavigate();
=======
  const history = useHistory();
>>>>>>> b4eed50909e876d569a54e1e0ee862202e45d9d7
  function handleClick() {
    navigate(`/class/${item.data.id}`);
  }
  function handleOpenFile(e) {
    e.stopPropagation();
<<<<<<< HEAD
    navigate(`/class/${item.data.id}/material`);
  }
  function handleOpenPeople(e) {
    e.stopPropagation();
    navigate(`/class/${item.data.id}/people`);
=======
    history.push(`/class/${item.data.id}/material`);
  }
  function handleOpenPeople(e) {
    e.stopPropagation();
    history.push(`/class/${item.data.id}/people`);
>>>>>>> b4eed50909e876d569a54e1e0ee862202e45d9d7
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
