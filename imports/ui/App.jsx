import { Meteor } from 'meteor/meteor';
import React, { Fragment } from 'react';
import { useTracker } from "meteor/react-meteor-data";
import { LoginForm } from './LoginForm';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <div className='main'>
      {user ? (
        <Fragment>
          <h1>Seja bem-vindo ao Advanced ToDo List!</h1>
        </Fragment>
      ) : (
        <LoginForm />
      )}
    </div>
  )
};