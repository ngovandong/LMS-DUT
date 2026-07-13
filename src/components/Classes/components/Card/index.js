import React from "react";
import { useNavigate } from "react-router-dom";
import { CardContainer } from "./styles";
import { Link } from "react-router-dom";
import { IoIosFolderOpen, IoMdPerson, IoMdMore } from "react-icons/io";

export default function Card({ data }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`${data.id}`);
  }

  function handleOpenFile(e) {
    e.stopPropagation();
    navigate(`${data.id}/material`);
  }

  function handleOpenPeople(e) {
    e.stopPropagation();
    navigate(`${data.id}/people`);
  }

  const creatorLabel = data.creatorName || "Class instructor";

  return (
    <CardContainer
      $background={data.background}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open class ${data.name}`}
    >
      <header>
        <button
          type="button"
          className="options-btn"
          aria-label={`More options for ${data.name}`}
          onClick={(e) => e.stopPropagation()}
        >
          <IoMdMore size={22} aria-hidden="true" />
        </button>

        <Link
          className="class-link"
          to={`${data.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          {data.name}
        </Link>
        <p className="creator-name">{creatorLabel}</p>
      </header>

      <div className="card-body">
        <img
          className="creator-avatar"
          src={data.creatorPhoto}
          alt={creatorLabel}
        />
      </div>

      <div className="footer-card">
        <button
          type="button"
          aria-label={`Open materials for ${data.name}`}
          onClick={handleOpenFile}
        >
          <IoIosFolderOpen size={22} aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label={`View people in ${data.name}`}
          onClick={handleOpenPeople}
        >
          <IoMdPerson size={22} aria-hidden="true" />
        </button>
      </div>
    </CardContainer>
  );
}
