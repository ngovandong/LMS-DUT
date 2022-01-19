import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./components/start/Signup";
import Login from "./components/start/Login";
import PrivateRoute from "./components/start/PrivateRoute";
import ForgotPassword from "./components/start/ForgotPassword";
import UpdateProfile from "./components/start/updateProfile";
import Classes from './components/Classes';
import Room from './components/Room';
import ViewAssignment from "./components/Modal/ViewAssignment";
import UpdateAssignment from "./components/Modal/UpdateAssignment";
import ViewWork from "./components/Modal/ViewWork";

export default function Navigate() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute exact path="/class/:id/:tab?" component={Room} />
            <PrivateRoute exact path="/assignments/:id" component={ViewAssignment} />
            <PrivateRoute exact path="/updateAssigment/:id" component={UpdateAssignment} />
            <PrivateRoute exact path="/viewWork/:id" component={ViewWork} />
            <PrivateRoute path="/" component={Classes} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
