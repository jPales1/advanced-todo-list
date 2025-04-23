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
  'tasks.remove'(taskId) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    TasksCollection.removeAsync(taskId);
  },
  'tasks.update'(taskId, { name }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    TasksCollection.updateAsync(
      taskId, { $set: { name } }
    );
  },
});