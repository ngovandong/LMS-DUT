import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";

import { errorDialogAtom, errorMessage } from "../utils/atoms";

import uknown from "../img/unknownPeople.png";
import { useRecoilState } from "recoil";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function getBackground() {
  const a = Math.floor(Math.random() * 12);
  const b = a % 7;
  switch (b) {
    case 0:
      return "https://gstatic.com/classroom/themes/img_reachout.jpg";
    case 1:
      return "https://gstatic.com/classroom/themes/img_breakfast.jpg";
    case 2:
      return "https://gstatic.com/classroom/themes/img_bookclub.jpg";
    case 3:
      return "https://gstatic.com/classroom/themes/img_learnlanguage.jpg";
    case 4:
      return "https://gstatic.com/classroom/themes/img_code.jpg";
    case 5:
      return "https://gstatic.com/classroom/themes/img_read.jpg";
    case 7:
      return "https://gstatic.com/classroom/themes/img_backtoschool.jpg";
    default:
      break;
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const [show, setShow] = useRecoilState(errorDialogAtom);
  const [message, setMes] = useRecoilState(errorMessage);
  async function signup(email, password, name) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
      name: name,
      photo: uknown,
      enrolledClassrooms: [],
    });
  }
  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }
  function updateProfile(password) {
    return updatePassword(currentUser, password);
  }
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  function logout() {
    return signOut(auth);
  }
  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("uid", "==", user.uid))
      );
      if (querySnapshot.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          enrolledClassrooms: [],
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  function getPhoto() {
    if (currentUser.photoURL) {
      return currentUser.photoURL;
    }
    return uknown;
  }
  async function createClass(name, credits) {
    const background = getBackground();
    const docRef = await getDocs(
      query(collection(db, "users"), where("uid", "==", currentUser.uid))
    );
    const ID = docRef.docs[0].id;
    const userDB = docRef.docs[0].data();
    const newClass = await addDoc(collection(db, "classes"), {
      creatorUid: userDB.uid,
      name: name,
      credits: credits,
      background: background,
      creatorName: userDB.name,
      creatorPhoto: userDB.photo,
      users: [
        {
          uid: userDB.uid,
          name: userDB.name,
          photo: userDB.photo,
        },
      ],
    });

    // add to current user's class list

    let userClasses = userDB.enrolledClassrooms;
    userClasses.push({
      id: newClass.id,
      name: name,
      creatorName: userDB.name,
      creatorPhoto: userDB.photo,
      background: background,
    });
    const userRef = await doc(db, "users", ID);
    await updateDoc(userRef, {
      enrolledClassrooms: userClasses,
    });
  }
  async function joinClass(code) {
    const classRef = doc(db, "classes", code);
    const classSnap = await getDoc(classRef);
    const docRef = await getDocs(
      query(collection(db, "users"), where("uid", "==", currentUser.uid))
    );
    const ID = docRef.docs[0].id;
    const userDB = docRef.docs[0].data();
    const userClassrooms = userDB.enrolledClassrooms;
    const isalready = userClassrooms.some((ele) => ele.id === code);
    if (!isalready) {
      if (classSnap.exists()) {
        const classData = await classSnap.data();

        userClassrooms.push({
          id: code,
          name: classData.name,
          creatorName: classData.creatorName,
          creatorPhoto: classData.creatorPhoto,
          background: classData.background,
        });
        const docRef = await doc(db, "users", ID);
        await updateDoc(docRef, {
          enrolledClassrooms: userClassrooms,
        });
        const users = classData.users;
        users.push({
          uid: userDB.uid,
          name: userDB.name,
          photo: userDB.photo,
        });
        await updateDoc(classRef, {
          users: users,
        });
      } else {
        throw Error("Class don't exist");
      }
    } else {
      throw Error("Class already exist");
    }
  }
  async function deleteMember(Uid, classID) {
    const classRef = doc(db, "classes", classID);
    const classSnap = await getDoc(classRef);
    const classData = await classSnap.data();

    const newMembers = [];
    classData.users.forEach((ele) => {
      if (ele.uid !== Uid) {
        newMembers.push(ele);
      }
    });
    await updateDoc(classRef, {
      users: newMembers,
    });

    const docRef = await getDocs(
      query(collection(db, "users"), where("uid", "==", Uid))
    );
    const ID = docRef.docs[0].id;
    const userData = docRef.docs[0].data();
    const enrolled = userData.enrolledClassrooms;
    const newClasses = [];
    enrolled.forEach((ele) => {
      if (ele.id !== classID) {
        newClasses.push(ele);
      }
    });
    const userRef = doc(db, "users", ID);
    await updateDoc(userRef, {
      enrolledClassrooms: newClasses,
    });
  }

  async function createAnnounce(message, classID) {
    const docRef = await getDocs(
      query(collection(db, "users"), where("uid", "==", currentUser.uid))
    );
    const userDB = docRef.docs[0].data();
    await addDoc(collection(db, "announces"), {
      message: message,
      classID: classID,
      authorImg: getPhoto(),
      authorName: userDB.name,
      date: new Date().getTime(),
      comments: [],
    });
  }
  async function createComment(message, announceID) {
    const docRef = await getDocs(
      query(collection(db, "users"), where("uid", "==", currentUser.uid))
    );
    const userDB = docRef.docs[0].data();
    const annouceRef = doc(db, "announces", announceID);
    const announceSnap = await getDoc(annouceRef);
    const announce = announceSnap.data();
    const comments = announce.comments;
    comments.push({
      name: userDB.name,
      photo: userDB.photo,
      message: message,
      date: new Date().getTime(),
    });
    await updateDoc(annouceRef, {
      comments: comments,
    });
  }
  async function isInClass(id) {
    const docRef = await getDocs(
      query(collection(db, "users"), where("uid", "==", currentUser.uid))
    );
    const enrolled = docRef.docs[0].data().enrolledClassrooms;
    const result = enrolled.some((ele) => ele.id === id);
    return result;
  }

  async function uploadDoc(file, name, classID) {
    const storage = await getStorage();
    const storageRef = await ref(storage, `documents/${classID}/${name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const refer = snapshot.ref;
    const link = await getDownloadURL(refer);

    const docRef = await getDocs(
      query(collection(db, "documents"), where("name", "==", name))
    );

    if (docRef.docs.length > 0 && docRef.docs[0].data().classID === classID) {
      throw new Error("File already exists!");
    }
    await addDoc(collection(db, "documents"), {
      classID: classID,
      linkDownload: link,
      name: name,
    });
  }

  async function deleteDocument(path, link) {
    try {
      const storage = getStorage();
      // Create a reference to the file to delete
      const document = ref(storage, path);
      await deleteObject(document);
      const docRef = await getDocs(
        query(collection(db, "documents"), where("linkDownload", "==", link))
      );
      const ID = docRef.docs[0].id;
      await deleteDoc(doc(db, "documents", ID));
    } catch (error) {
      setMes(error.message);
      setShow(true);
    }
  }

  async function addAssign(assignment, files) {
    try {
      const storage = await getStorage();
      const assignRef = await addDoc(collection(db, "assignments"), assignment);
      const assignID = assignRef.id;
      const listFile = [];
      for (const file of files) {
        const storageRef = await ref(
          storage,
          `assignments/${assignID}/${file.name}`
        );
        const snapshot = await uploadBytes(storageRef, file);
        const refer = snapshot.ref;
        const link = await getDownloadURL(refer);
        listFile.push({ linkDownload: link, name: file.name });
      }
      await updateDoc(assignRef, {
        files: listFile,
      });
    } catch (error) {
      setMes(error);
      setShow(true);
    }
  }

  async function addWork(files, assignID) {
    try {
      const storage = await getStorage();
      const listFile = [];
      for (const file of files) {
        const storageRef = await ref(
          storage,
          `turnIns/${assignID}/${currentUser.uid}/${file.name}`
        );
        const snapshot = await uploadBytes(storageRef, file);
        const refer = snapshot.ref;
        const link = await getDownloadURL(refer);
        listFile.push({ linkDownload: link, name: file.name });
      }
      const docRef = await getDocs(
        query(collection(db, "users"), where("uid", "==", currentUser.uid))
      );
      const userDB = docRef.docs[0].data();

      const newTurnIn = {
        name: userDB.name,
        time: new Date().getTime().toString(),
        files: listFile,
        note: "",
        grade: "",
      };

      const assignRef = await doc(db, "assignments", assignID);
      const assignSnap = await getDoc(assignRef);
      const data = assignSnap.data();
      data.turnIns[currentUser.uid] = newTurnIn;
      await updateDoc(assignRef, {
        turnIns: data.turnIns,
      });
    } catch (error) {
      setMes(error.message);
      setShow(true);
    }
  }

  async function closeAssign(assignID) {
    try {
      const assignRef = await doc(db, "assignments", assignID);
      await updateDoc(assignRef, {
        isClose: true,
      });
    } catch (error) {
      setMes(error.message);
      setShow(true);
    }
  }
  async function deleteAssign(assignID) {
    try {
      const storage = getStorage();
      const assignRef = await doc(db, "assignments", assignID);
      const assignSnap = await getDoc(assignRef);
      const data = assignSnap.data();
      if (data.files.length !== 0) {
        const files = await ref(storage, `assignments/${assignID}`);
        const list = await listAll(files);
        list.items.forEach((ele) => deleteObject(ele));
      }
      if (data.turnIns.length !== 0) {
        for (const key in data.turnIns) {
          const files = await ref(storage, `turnIns/${assignID}/${key}`);
          const list = await listAll(files);
          list.items.forEach((ele) => deleteObject(ele));
        }
      }
      await deleteDoc(await doc(db, "assignments", assignID));
    } catch (error) {
      setMes(error.message);
      setShow(true);
    }
  }

  async function updateAssign(assignment, assignID) {
    try {
      const ref = await doc(db, "assignments", assignID);
      await updateDoc(ref, {
        title: assignment.title,
        des: assignment.des,
        dueTime: assignment.dueTime,
      });
    } catch (error) {
      setMes(error.message);
      setShow(true);
    }
  }
  async function updateClass(id, name, credits) {
    try {
      const docRef = doc(db, "classes", id);
      await updateDoc(docRef, {
        name: name,
        credits: credits,
      });
    } catch (error) {
      setMes(error.message);
      setShow(true);
    }
  }

  async function updateGrade(list, assignID) {
    try {
      console.log(list);
      const docRef = await doc(db, "assignments", assignID);
      await updateDoc(docRef, { turnIns: list });
    } catch (error) {
      setMes(error.message);
      setShow(true);
    }
  }

  const value = {
    db,
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateProfile,
    signInWithGoogle,
    getPhoto,
    createClass,
    joinClass,
    createAnnounce,
    createComment,
    deleteMember,
    isInClass,
    uploadDoc,
    deleteDocument,
    addAssign,
    addWork,
    closeAssign,
    deleteAssign,
    updateAssign,
    updateClass,
    updateGrade,
  };

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(currentUser);
    });
    return unsubcribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
