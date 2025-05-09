import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from "meteor/react-meteor-data";
import { LoginForm } from './LoginForm';
import { Welcome } from './pages/Welcome';
import { TaskList } from './pages/TaskList';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { EditTask } from './pages/EditTask';
import { UserProfile } from './pages/UserProfile';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className='main'>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/edit/:taskId" element={<EditTask />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
};