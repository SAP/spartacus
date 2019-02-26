import { AccountData } from '../support/require-logged-in.commands';

export const standardUser: AccountData = {
  user: 'standard',
  registrationData: {
    firstName: 'Winston',
    lastName: 'Rumfoord',
    password: 'Password123.',
    titleCode: 'mr'
  }
};
