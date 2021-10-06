import { AccountData } from '../support/require-logged-in.commands';

export const standardUser: AccountData = {
  user: 'standard',
  registrationData: {
    firstName: 'Cypress',
    lastName: 'User',
    password: 'Password123.',
    titleCode: 'mr',
  },
};

export const myCompanyAdminUser: AccountData = {
  user: 'linda.wolf@rustic-hw.com',
  registrationData: {
    firstName: 'Linda',
    lastName: 'Wolf',
    titleCode: '',
    password: 'pw4all',
    email: 'linda.wolf@rustic-hw.com',
  },
};
