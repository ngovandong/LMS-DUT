import { IoIosAdd } from "react-icons/io";
import { FiBookOpen } from "react-icons/fi";
import AddDoc from "../../Modal/AddDoc";
import { useAuth } from "../../../contexts/AuthContext";
import { useState, useEffect } from "react";
import CreateAssignment from "../../Modal/CreateAssignment";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { CreateBT, Container, Section, Header } from "../Material/index";
import {
  SectionTitle,
  Card,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
} from "../styles/shared";
import ListAssign from "./ListAssign";
import getTime from "../../../funtions/getRelativeTime";
import { useParams } from "react-router-dom";

export default function ClassWork() {
  const { id } = useParams();
  const { db, currentUser, isAuthor } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [open, setOpen] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [is, setIs] = useState(false);

  useEffect(() => {
    let unsub;
    async function fetchData() {
      const result = await isAuthor(id);
      setIs(result);
      const q = query(
        collection(db, "assignments"),
        where("classID", "==", id)
      );
      unsub = onSnapshot(q, (querySnapshot) => {
        const listDocs = querySnapshot.docs.map((ele) => {
          const data = ele.data();
          const assignId = ele.id;
          const isSubmit = Boolean(data.turnIns[currentUser.uid]);
          const isTimeOut =
            data.dueTime !== "" && data.dueTime < new Date().getTime();
          return {
            data,
            id: assignId,
            isSubmit,
            isTimeOut,
          };
        });
        setAssignments(listDocs);
        setEmpty(listDocs.length === 0);
        setLoading(false);
      });
    }
    fetchData();
    return () => unsub?.();
  }, [currentUser.uid, db, id, isAuthor]);

  function handleAdd() {
    setOpen((prev) => !prev);
  }

  return (
    <Container aria-label="Classwork">
      <CreateAssignment handleClick={handleAdd} open={open} classID={id} />
      <AddDoc classID={id} />
      <Section>
        <Header>
          <SectionTitle>Classwork</SectionTitle>
          {is && (
            <CreateBT type="button" onClick={handleAdd} aria-label="Create assignment">
              <IoIosAdd size={22} aria-hidden="true" />
              Create
            </CreateBT>
          )}
        </Header>

        {!loading && empty && (
          <EmptyState role="status">
            <EmptyIcon aria-hidden="true">
              <FiBookOpen />
            </EmptyIcon>
            <EmptyTitle>No assignments yet</EmptyTitle>
            <EmptyText>
              {is
                ? "Create your first assignment to get students started."
                : "No assignments have been posted yet."}
            </EmptyText>
          </EmptyState>
        )}

        {!empty && (
          <Card aria-label="Assignment list">
            {assignments.map((ele) => (
              <ListAssign
                isAuthor={is}
                dueTime={
                  ele.isSubmit
                    ? "Turned in"
                    : ele.data.dueTime === ""
                    ? "No due date"
                    : ele.isTimeOut
                    ? "Past due"
                    : getTime(ele.data.dueTime)
                }
                name={ele.data.title}
                assignID={ele.id}
                key={ele.id}
                isSilver={ele.isSubmit || ele.isTimeOut || ele.data.isClose}
              />
            ))}
          </Card>
        )}
      </Section>
    </Container>
  );
}
