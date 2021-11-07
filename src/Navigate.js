import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./components/start/Signup";
import Login from "./components/start/Login";
import PrivateRoute from "./components/start/PrivateRoute";
import ForgotPassword from "./components/start/ForgotPassword";
import UpdateProfile from "./components/start/updateProfile";
import Subjects from './components/Subjects';
import TeacherPost from './components/TeacherPost';

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
            <PrivateRoute path="/tasks/:id"  component={TeacherPost} />
            <PrivateRoute path="/" component={Subjects} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
