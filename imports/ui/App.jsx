import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from "meteor/react-meteor-data";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import UserDrawer from './components/common/Drawer';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { UserProfile } from './pages/profile/UserProfile';
import { EditTask } from './pages/tasks/EditTask';
import { TaskList } from './pages/tasks/TaskList';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <div className='main'>
      <Router>
        {!user ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        ) : (
          <>
            <UserDrawer />
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/tasks/edit/:taskId" element={<EditTask />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
};