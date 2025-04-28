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
      description: '',
      situation: 'Cadastrada'
    });
  },
  'tasks.remove'(taskId) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    TasksCollection.removeAsync(taskId);
  },
  'tasks.update'(taskId, { name, description, situation }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    TasksCollection.updateAsync(
      taskId,
      { $set: { name, description, situation } }
    );
  },
});