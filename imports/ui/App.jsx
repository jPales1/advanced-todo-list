import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from "meteor/react-meteor-data";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import UserDrawer from './components/common/Drawer';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ResetPassword } from './pages/auth/ResetPassword';
import { UserProfile } from './pages/profile/UserProfile';
import { EditTask } from './pages/tasks/EditTask';
import { TaskList } from './pages/tasks/TaskList';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <div className='main'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <UserDrawer />
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/tasks/edit/:taskId" element={<EditTask />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
};