import { IoIosAdd } from "react-icons/io";
import AddDoc from "../../Modal/AddDoc";
import { useAuth } from "../../../contexts/AuthContext";
import { useState, useEffect } from "react";
import CreateAssignment from "../../Modal/CreateAssignment";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { CreateBT, Containter, Section, Header } from "../Material/index";
import ListAssign from "./ListAssign";
import getTime from "../../../funtions/getRelativeTime";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const { db, currentUser } = useAuth();
  const [asssignments, setAsssignments] = useState([]);
  const [open, setOpen] = useState(false);
  const [empty, setEmpty] = useState(false);
  async function fetchData() {
    const q = query(
      collection(db, "assignments"),
      where("classID", "==", props.classID)
    );
    onSnapshot(q, async (querySnapshot) => {
      const listDocs = querySnapshot.docs.map((ele) => {
        const data = ele.data();
        const id = ele.id;
        const isSubmit = data.turnIns[currentUser.uid] ? true : false;
        const isTimeOut =
          data.dueTime === "" ? false : data.dueTime < new Date().getTime();
        return {
          data: data,
          id: id,
          isSubmit: isSubmit,
          isTimeOut: isTimeOut,
        };
      });
      setAsssignments(listDocs);
      if (listDocs.length === 0) setEmpty(true);
    });
  }

  useEffect(() => {
    const promise = fetchData();
    return promise;
  }, [props.classID]);

  function handleAdd() {
    setOpen(!open);
  }
  return (
    <Containter>
      {empty && <NoDoc />}
      <CreateAssignment
        handleClick={handleAdd}
        open={open}
        classID={props.classID}
      />
      <AddDoc classID={props.classID} />
      <Section>
        {props.isAuthor && (
          <Header>
            <CreateBT onClick={handleAdd}>
              <IoIosAdd color="#fff" size={30} />
              <span
                style={{ color: "#fff", display: "block", paddingTop: "3px" }}
              >
                Create
              </span>
            </CreateBT>
          </Header>
        )}
        {asssignments.map((ele) => (
          <ListAssign
            isAuthor={props.isAuthor}
            dueTime={
              ele.isSubmit
                ? "Turned in"
                : ele.data.dueTime === ""
                ? ""
                : ele.isTimeOut
                ? "Time out"
                : getTime(ele.data.dueTime)
            }
            name={ele.data.title}
            assignID={ele.id}
            key={ele.id}
            isSilver={ele.isSubmit || ele.isTimeOut || ele.data.isClose}
          />
        ))}
      </Section>
    </Containter>
  );
};

function NoDoc(props) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h4 style={{ color: "#007b83", textAlign: "center" }}>
        There are no assignment available!
      </h4>
    </div>
  );
}
