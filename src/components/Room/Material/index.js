import styled from "styled-components";
import { IoIosAdd } from "react-icons/io";
import { HiDocumentText } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { FiFolder } from "react-icons/fi";
import { addDoc } from "../../../utils/atoms";
import AddDoc from "../../Modal/AddDoc";
import { useRecoilState } from "recoil";
import { useAuth } from "../../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import {
  RoomPage,
  PageSection,
  SectionHeader,
  SectionTitle,
  Card,
  ListRow,
  RowMain,
  RowTitle,
  IconCircle,
  IconActionButton,
  CreateButton,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
} from "../styles/shared";

export const Container = styled(RoomPage)``;

/** @deprecated Use Container — kept for existing imports */
export const Containter = Container;

export {
  SectionTitle,
  Card,
  ListRow,
  RowMain,
  RowMeta,
  RowTitle,
  IconCircle,
  IconActionButton,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
} from "../styles/shared";

export const Section = styled(PageSection)``;

export const Header = styled(SectionHeader)``;

export const AddBT = styled(IconActionButton)``;

export const Row = styled(ListRow)``;

export const Circle = styled(IconCircle)``;

export const CreateBT = styled(CreateButton)``;

const ListCard = styled(Card)`
  overflow: hidden;
`;

function Doc({ name, link, classID, isAuthor }) {
  const { deleteDocument } = useAuth();

  function handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    const path = `documents/${classID}/${name}`;
    deleteDocument(path, link);
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
      aria-label={`Open document ${name}`}
    >
      <Row $clickable>
        <RowMain>
          <Circle aria-hidden="true">
            <HiDocumentText size={20} color="#fff" />
          </Circle>
          <RowTitle>{name}</RowTitle>
        </RowMain>
        {isAuthor && (
          <AddBT
            type="button"
            onClick={handleDelete}
            $danger
            aria-label={`Delete ${name}`}
          >
            <AiFillDelete size={18} aria-hidden="true" />
          </AddBT>
        )}
      </Row>
    </a>
  );
}

export default function Material() {
  const { db, isAuthor } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [, setAdd] = useRecoilState(addDoc);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [is, setIs] = useState(false);

  useEffect(() => {
    let unsub;
    async function fetchData() {
      const result = await isAuthor(id);
      setIs(result);
      const q = query(
        collection(db, "documents"),
        where("classID", "==", id)
      );
      unsub = onSnapshot(q, (querySnapshot) => {
        const listDocs = querySnapshot.docs.map((ele) => ele.data());
        setDocuments(listDocs);
        setEmpty(listDocs.length === 0);
        setLoading(false);
      });
    }
    fetchData();
    return () => unsub?.();
  }, [db, id, isAuthor]);

  function handleAdd() {
    setAdd(true);
  }

  return (
    <Container aria-label="Class materials">
      <AddDoc classID={id} />
      <Section>
        <Header>
          <SectionTitle>Materials</SectionTitle>
          {is && (
            <CreateBT type="button" onClick={handleAdd} aria-label="Add material">
              <IoIosAdd size={22} aria-hidden="true" />
              Add
            </CreateBT>
          )}
        </Header>

        {!loading && empty && (
          <EmptyState role="status">
            <EmptyIcon aria-hidden="true">
              <FiFolder />
            </EmptyIcon>
            <EmptyTitle>No materials yet</EmptyTitle>
            <EmptyText>
              {is
                ? "Upload documents and resources for your students."
                : "Your teacher has not shared any materials yet."}
            </EmptyText>
          </EmptyState>
        )}

        {!empty && (
          <ListCard aria-label="Material list">
            {documents.map((ele) => (
              <Doc
                isAuthor={is}
                name={ele.name}
                classID={id}
                key={ele.linkDownload}
                link={ele.linkDownload}
              />
            ))}
          </ListCard>
        )}
      </Section>
    </Container>
  );
}
