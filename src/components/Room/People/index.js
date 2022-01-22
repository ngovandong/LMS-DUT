import styled from "styled-components";
import { IoMdPersonAdd } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { useAuth } from "../../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import ShowCode from "../../Modal/showCode";
const Containter = styled.div`
  padding: 1.5rem;
  margin: 0 auto;
  max-width: 47.5rem;
`;
const Section = styled.div`
  margin-bottom: 2rem;
`;
const Header = styled.div`
  border-bottom: 1px solid #129eaf;
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
`;
const AddBT = styled.button`
  width: 42px;
  heigth: 42px;
  transition: all 0.1s;
  :hover {
    border-radius: 50%;
    background: #0000001a;
  }
`;
const Row = styled.div`
  display: flex;
  padding: 8px 8px 8px 15px;
  height: 42px;
  box-sizing: content-box !important;
  justify-content: space-between;
  border-bottom: 0.0625rem solid #e0e0e0;
  border-radius: 5px;
  :hover {
    border-color: transparent;
    background-color: #e4f7fb;
  }
`;
const Avatar = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 100%;
  margin: auto 5px;
`;

function Member(props) {
  const { deleteMember } = useAuth();
  async function handleDelete() {
    deleteMember(props.Uid, props.classID);
  }
  return (
    <Row>
      <div style={{ display: "flex" }}>
        <Avatar src={props.photo} />
        <span
          style={{
            margin: "auto 0.5rem",
            fontFamily: "Arial,sans-serif",
            fontWeight: "500",
            fontSize: "0.9rem",
          }}
        >
          {props.name}
        </span>
      </div>
      {props.isAuthor && (
        <AddBT onClick={handleDelete}>
          <AiFillDelete size={20} color="#8B0000" />
        </AddBT>
      )}
    </Row>
  );
}
function Teacher(props) {
  return (
    <Row>
      <div style={{ display: "flex" }}>
        <Avatar src={props.photo} />
        <span
          style={{
            margin: "auto 0.5rem",
            fontFamily: "Arial,sans-serif",
            fontWeight: "500",
            fontSize: "0.9rem",
          }}
        >
          {props.name}
        </span>
      </div>
      {/* <AddBT>
        <BsThreeDotsVertical size={20} />
      </AddBT> */}
    </Row>
  );
}
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const [peoples, setPeoples] = useState([]);
  const [teacher, setTeacher] = useState({});
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const { db, isAuthor } = useAuth();
  const [is, setIs] = useState(false);
  async function fetchData() {
    const result=await isAuthor(id);
    setIs(result);
    const docRef = doc(db, "classes", id);
    onSnapshot(docRef, async (result) => {
      const classData = result.data();
      setPeoples(classData.users);
      setTeacher({
        name: classData.creatorName,
        photo: classData.creatorPhoto,
        uid: classData.creatorUid,
      });
    });
  }

  useEffect(() => {
    const promise = fetchData();
    return promise;
  }, [id]);

  function handleClose() {
    setShow(!show);
  }
  return (
    <Containter>
      <ShowCode code={id} handleClose={handleClose} open={show} />
      <Section>
        <Header>
          <h2 style={{ color: "#007b83" }}>Teachers</h2>
        </Header>
        <Teacher name={teacher.name} photo={teacher.photo} />
      </Section>
      <Section>
        <Header>
          <h2 style={{ color: "#007b83" }}>Students</h2>
          <AddBT onClick={handleClose}>
            <IoMdPersonAdd size={20} color="#007b83" />
          </AddBT>
        </Header>
        {peoples.map((ele) => {
          if (ele.uid !== teacher.uid) {
            return (
              <Member
                key={ele.uid}
                isAuthor={is}
                classID={id}
                Uid={ele.uid}
                name={ele.name}
                photo={ele.photo}
              />
            );
          }
        })}
      </Section>
    </Containter>
  );
};
