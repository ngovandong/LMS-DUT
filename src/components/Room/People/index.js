import styled from "styled-components";
import { IoMdPersonAdd } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { useAuth } from "../../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import ShowCode from "../../Modal/showCode";
import {
  RoomPage,
  PageSection,
  SectionHeader,
  SectionTitle,
  Card,
  ListRow,
  RowMain,
  RowTitle,
  IconActionButton,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
} from "../styles/shared";

const Container = styled(RoomPage)``;

const Section = styled(PageSection)``;

const Header = styled(SectionHeader)``;

const AddBT = styled(IconActionButton)``;

const Row = styled(ListRow)``;

const Avatar = styled.img`
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--brand-100);
`;

const RoleBadge = styled.span`
  flex-shrink: 0;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--brand-700);
  background: var(--brand-50);
`;

function Member({ Uid, classID, name, photo, isAuthor }) {
  const { deleteMember } = useAuth();

  async function handleDelete() {
    deleteMember(Uid, classID);
  }

  return (
    <Row>
      <RowMain>
        <Avatar src={photo} alt="" aria-hidden="true" />
        <RowTitle>{name}</RowTitle>
      </RowMain>
      {isAuthor && (
        <AddBT
          type="button"
          onClick={handleDelete}
          $danger
          aria-label={`Remove ${name} from class`}
        >
          <AiFillDelete size={18} aria-hidden="true" />
        </AddBT>
      )}
    </Row>
  );
}

function Teacher({ name, photo }) {
  return (
    <Row>
      <RowMain>
        <Avatar src={photo} alt="" aria-hidden="true" />
        <RowTitle>{name}</RowTitle>
      </RowMain>
      <RoleBadge>Teacher</RoleBadge>
    </Row>
  );
}

export default function People() {
  const [people, setPeople] = useState([]);
  const [teacher, setTeacher] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { db, isAuthor } = useAuth();
  const [is, setIs] = useState(false);

  useEffect(() => {
    let unsub;
    async function fetchData() {
      const result = await isAuthor(id);
      setIs(result);
      const docRef = doc(db, "classes", id);
      unsub = onSnapshot(docRef, (resultDoc) => {
        const classData = resultDoc.data() || {};
        setPeople(classData.users || []);
        setTeacher({
          name: classData.creatorName,
          photo: classData.creatorPhoto,
          uid: classData.creatorUid,
        });
        setLoading(false);
      });
    }
    fetchData();
    return () => unsub?.();
  }, [db, id, isAuthor]);

  function handleToggleInvite() {
    setShow((prev) => !prev);
  }

  const students = people.filter((person) => person.uid !== teacher.uid);

  return (
    <Container aria-label="Class people">
      <ShowCode code={id} handleClose={handleToggleInvite} open={show} />

      <Section aria-label="Teachers">
        <Header>
          <SectionTitle>Teachers</SectionTitle>
        </Header>
        <Card>
          {teacher.name ? (
            <Teacher name={teacher.name} photo={teacher.photo} />
          ) : (
            !loading && (
              <EmptyState role="status">
                <EmptyText>Teacher information is unavailable.</EmptyText>
              </EmptyState>
            )
          )}
        </Card>
      </Section>

      <Section aria-label="Students">
        <Header>
          <SectionTitle>Students</SectionTitle>
          <AddBT
            type="button"
            onClick={handleToggleInvite}
            aria-label="Invite students with class code"
          >
            <IoMdPersonAdd size={20} aria-hidden="true" />
          </AddBT>
        </Header>

        {!loading && students.length === 0 && (
          <EmptyState role="status">
            <EmptyIcon aria-hidden="true">
              <FiUsers />
            </EmptyIcon>
            <EmptyTitle>No students yet</EmptyTitle>
            <EmptyText>
              Share the class join code to invite students.
            </EmptyText>
          </EmptyState>
        )}

        {students.length > 0 && (
          <Card aria-label="Student list">
            {students.map((person) => (
              <Member
                key={person.uid}
                isAuthor={is}
                classID={id}
                Uid={person.uid}
                name={person.name}
                photo={person.photo}
              />
            ))}
          </Card>
        )}
      </Section>
    </Container>
  );
}
