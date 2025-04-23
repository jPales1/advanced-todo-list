import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/api/TasksCollection';
import '../imports/api/tasksMethods';

Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find();
});

const SEED_USERNAME = 'usuario1234';
const SEED_PASSWORD = 'senha1234';

Meteor.startup(async () => {
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});