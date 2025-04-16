import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

const SEED_USERNAME = 'usuario123';
const SEED_PASSWORD = 'senha123';

Meteor.startup(async () => {
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});