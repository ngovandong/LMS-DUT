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
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import uknown from "../img/unknownPeople.png";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function getBackground() {
  const a = Math.floor(Math.random() * 12);
  const b = a % 6;
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
    default:
      break;
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
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
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
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
      alert(err.message);
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
    const userRef = await getDocs(
      query(collection(db, "users"), where("uid", "==", currentUser.uid))
    );
    const userID = userRef.docs[0].id;
    const userData = userRef.docs[0].data();
    const background = getBackground();
    const newClass = await addDoc(collection(db, "classes"), {
      creatorUid: userData.uid,
      name: name,
      credits: credits,
      background: background,
      creatorName: userData.name,
      creatorPhoto: userData.photo,
      posts: [],
      users: [
        {
          uid: userData.uid,
          name: userData.name,
          photo: userData.photo,
        },
      ],
    });

    // add to current user's class list

    let userClasses = userData.enrolledClassrooms;
    userClasses.push({
      id: newClass.id,
      name: name,
      creatorName: userData.name,
      creatorPhoto: userData.photo,
      background: background,
    });
    const docRef = await doc(db, "users", userID);
    await updateDoc(docRef, {
      enrolledClassrooms: userClasses,
    });
  }
  async function joinClass(code) {
    const classRef = doc(db, "classes", code);
    const classSnap = await getDoc(classRef);
    const userRef = await getDocs(
      query(collection(db, "users"), where("uid", "==", currentUser.uid))
    );
    const userId = userRef.docs[0].id;
    const userData = userRef.docs[0].data();
    const userClassrooms = userData.enrolledClassrooms;
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
        const docRef = await doc(db, "users", userId);
        await updateDoc(docRef, {
          enrolledClassrooms: userClassrooms,
        });
        const users = classData.users;
        users.push({
          uid: userData.uid,
          name: userData.name,
          photo: userData.photo,
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
  };
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubcribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
