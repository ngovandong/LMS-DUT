import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate as Nav,
} from "react-router-dom";
import Signup from "./components/start/Signup";
import Login from "./components/start/Login";
import ForgotPassword from "./components/start/ForgotPassword";
import UpdateProfile from "./components/start/updateProfile";
import Classes from "./components/Classes";
import Room from "./components/Room";
import ViewAssignment from "./components/Modal/ViewAssignment";
import UpdateAssignment from "./components/Modal/UpdateAssignment";
import ViewWork from "./components/Modal/ViewWork";
import RequireAuth from "./RequireAuth";
import PrivatePage from "./PrivatePage";
import People from "./components/Room/People";
import Material from "./components/Room/Material";
import ClassWork from "./components/Room/ClassWork";
import Stream from "./components/Room/Steam";

export default function Navigate() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <PrivatePage />
                </RequireAuth>
              }
            >
              <Route path="update-profile" element={<UpdateProfile />} />
              <Route path=":id" element={<Room />}>
                <Route path="people" element={<People />} />
                <Route path="material" element={<Material />} />
                <Route path="classwork" element={<ClassWork />} />
                <Route path="stream" element={<Stream />} />
                <Route path="assignments/:asignmentid" element={<ViewAssignment />} />
                <Route path="updateAssigment/:asignmentid" element={<UpdateAssignment />} />
                <Route path="viewWork/:asignmentid" element={<ViewWork />} />
                <Route index element={<Nav to="stream" />} />
              </Route>
              <Route index element={<Classes />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
