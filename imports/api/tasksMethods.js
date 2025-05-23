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
  async 'tasks.count'(showCompleted, searchText) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    const situationFilter = showCompleted 
      ? {} 
      : { situation: { $in: ['Cadastrada', 'Em Andamento'] } };

    const searchFilter = searchText 
      ? { name: { $regex: searchText, $options: 'i' } }
      : {};

    return await TasksCollection.find({
      $or: [
        { isPersonal: false },
        { userId: this.userId },
      ],
      ...situationFilter,
      ...searchFilter
    }).countAsync();
  },
});