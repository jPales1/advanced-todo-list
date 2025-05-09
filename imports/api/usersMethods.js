import { Meteor } from 'meteor/meteor';

Meteor.methods({
  async 'userProfile.get'() {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    const user = await Meteor.users.findOneAsync(this.userId);
    return user.profile || {};
  },
  async 'userProfile.update'(profileData) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    await Meteor.users.updateAsync(this.userId, {
      $set: { profile: profileData },
    });
  },
});