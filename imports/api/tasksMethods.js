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
  async 'tasks.remove'(taskId) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    const task = await TasksCollection.findOneAsync(taskId);
    if (task.userId !== this.userId){
      throw new Meteor.Error('Not authorized to delete this task!')
    }

    await TasksCollection.removeAsync(taskId);
  },
  async 'tasks.update'(taskId, { name, description, situation, isPersonal }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    const task = await TasksCollection.findOneAsync(taskId);
    if (task.userId !== this.userId){
      throw new Meteor.Error('Not authorized to edit this task!')
    }

    await TasksCollection.updateAsync(
      taskId,
      { $set: { name, description, situation, isPersonal } }
    );
  },
});