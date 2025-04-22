import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from "meteor/react-meteor-data";
import { LoginForm } from './LoginForm';
import { Welcome } from './Welcome';
import { TaskList } from './TaskList';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};