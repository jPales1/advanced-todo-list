import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './TasksCollection';

Meteor.methods({
  'tasks.insert'(task) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    TasksCollection.insertAsync({
      ...task,
      userId: this.userId,
      createdAt: new Date(),
    });
  },
});