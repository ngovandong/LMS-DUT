import styled from "styled-components";
import { IoIosAdd } from "react-icons/io";
import { HiDocumentText } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { addDoc } from "../../../utils/atoms";
import AddDoc from "../../Modal/AddDoc";
import { useRecoilState } from "recoil";
import { useAuth } from "../../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { doc, onSnapshot, query, where, collection } from "firebase/firestore";

export const Containter = styled.div`
  padding: 1.5rem;
  margin: 0 auto;
  max-width: 47.5rem;
`;
export const Section = styled.div`
  margin-bottom: 2rem;
`;
export const Header = styled.div` 
  border-bottom: 1px solid #129eaf;
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
`;
export const AddBT = styled.button`
  width: 42px;
  heigth: 42px;
  transition: all 0.1s;
  :hover {
    border-radius: 50%;
    background: #0000001a;
  }
`;
export const Row = styled.div`
  display: flex;
  padding: 8px 8px 8px 15px;
  height: 42px;
  box-sizing: content-box !important;
  justify-content: space-between;
  border-bottom: 0.0625rem solid #e0e0e0;
  border-radius: 7px;
  :hover {
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%),
      0 2px 6px 2px rgb(60 64 67 / 15%);
    background-color: transparent;
  }
`;
export const Circle = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 100%;
  margin: auto 5px;
  background: #129eaf;
  display: flex;
  justify-content: center;
  padding-top: 7px;
`;

function Doc(props) {
  const { deleteDocument } = useAuth();
  function handleClick(e) {
    e.preventDefault();
    const path = "documents/" + props.classID + "/" + props.name;
    deleteDocument(path, props.link);
  }
  return (
    <a
      style={{ display: "block", textDecoration: "none" }}
      target="_blank"
      rel="noreferrer"
      href={props.link}
    >
      <Row>
        <div style={{ display: "flex" }}>
          <Circle>
            <HiDocumentText size={25} color="#fff" />
          </Circle>
          <span
            style={{
              margin: "auto 0.5rem",
              fontFamily: "Arial,sans-serif",
              fontWeight: "500",
              fontSize: "0.9rem",
              color: "#000",
            }}
          >
            {props.name}
          </span>
        </div>
        {props.isAuthor && (
          <AddBT onClick={handleClick}>
            <AiFillDelete size={20} color="#007b83" />
          </AddBT>
        )}
      </Row>
    </a>
  );
}

export const CreateBT = styled.button`
  width: 125px;
  height: 48px;
  padding-top: 10px;
  margin-bottom: 20px;
  background: #007b83;
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-seft: center;
  :hover {
    box-shadow: 0 2px 3px 0 rgb(0 123 131 / 30%),
      0 6px 10px 4px rgb(0 123 131 / 15%);
  }
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const { db } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [add, setAdd] = useRecoilState(addDoc);
  async function fetchData() {
    const q = query(
      collection(db, "documents"),
      where("classID", "==", props.classID)
    );
    onSnapshot(q, async (querySnapshot) => {
      const listDocs = querySnapshot.docs.map((ele) => ele.data());
      setDocuments(listDocs);
    });
  }

  useEffect(() => {
    const promise = fetchData();
    return promise;
  }, [props.classID]);
  function handleAdd() {
    setAdd(true);
  }
  return (
    <Containter>
      {documents.length === 0 && <NoDoc />}
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
        {documents.map((ele) => (
          <Doc
            isAuthor={props.isAuthor}
            name={ele.name}
            classID={props.classID}
            key={ele.linkDownload}
            link={ele.linkDownload}
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
        There are no documents available!
      </h4>
    </div>
  );
}
