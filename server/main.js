import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/api/TasksCollection';
import '../imports/api/tasksMethods';
import '../imports/api/usersMethods';

Meteor.publish('tasks', function publishTasks(showCompleted) {
  if (!this.userId) {
    return this.ready();
  }

  const situationFilter = showCompleted 
    ? {} 
    : { situation: { $in: ['Cadastrada', 'Em Andamento'] } };

  return TasksCollection.find({
    $or: [
      { isPersonal: false },
      { userId: this.userId },
    ],
    ...situationFilter
  });
});

Meteor.publish('userData', function publishUserData() {
  if (!this.userId) {
    return this.ready();
  }

  return Meteor.users.find(
    { _id: this.userId },
    { fields: { profile: 1 } }
  );
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