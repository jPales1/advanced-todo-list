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

    const task = TasksCollection.findOne(taskId);
    if (task.userId !== this.userId){
      throw new Meteor.Error('Not authorized to delete this task!')
    }

    TasksCollection.removeAsync(taskId);
  },
  'tasks.update'(taskId, { name, description, situation }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    const task = TasksCollection.findOne(taskId);
    if (task.userId !== this.userId){
      throw new Meteor.Error('Not authorized to edit this task!')
    }

    TasksCollection.updateAsync(
      taskId,
      { $set: { name, description, situation } }
    );
  },
});