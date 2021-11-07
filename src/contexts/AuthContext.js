import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  sendSignInLinkToEmail,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  async function signup(email, password) {
    await sendSignInLinkToEmail(email)
    return createUserWithEmailAndPassword(auth, email, password);
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
  function signInWithGoogle() {
    var provider = new GoogleAuthProvider();
    return signInWithPopup(auth,provider);
  }
  function getPhoto(){
    if(currentUser.photoURL){
      return currentUser.photoURL;
    }
    return "https://www.seekpng.com/png/detail/46-462959_unknown-person-icon-png-download-single-people-logo.png";
  }
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateProfile,
    signInWithGoogle,
    getPhoto
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
