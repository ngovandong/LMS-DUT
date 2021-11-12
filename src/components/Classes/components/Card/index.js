import React from "react";
import { useHistory } from "react-router-dom";
// STYLE
import { CardContainer } from "./styles";
import {Link} from "react-router-dom";
// ICONS
import { IoIosFolderOpen, IoMdPerson, IoMdMore } from "react-icons/io";

export default function Card(item) {
  const history = useHistory();
  function handleClick() {
    history.push(`/class/${item.data.id}`);
  }
  return (
    <>
      <CardContainer background={item.data.background} onClick={handleClick}>
        <ul>
          <li>
            <header>
              <Link>{item.data.name}</Link>

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
                <IoIosFolderOpen size={25} color="rgb(77, 72, 72)" />
              </button>

              <button>
                <IoMdPerson size={25} color="rgb(77, 72, 72)" />
              </button>
            </div>
          </li>
        </ul>
      </CardContainer>
    </>
  );
}
