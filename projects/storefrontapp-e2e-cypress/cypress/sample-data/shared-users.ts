import { AccountData } from '../support/require-logged-in.commands';

export const standardUser: AccountData = {
  user: 'standard',
  registrationData: {
    firstName: 'Winston',
    lastName: 'Rumfoord',
    password: 'Password123.',
    titleCode: 'mr',
  },
};

export const myCompanyAdminUser: AccountData = {
  user: 'powertools.admin@ydev.hybris.com',
  registrationData: {
    firstName: 'Powertools',
    lastName: 'Admin Test User',
    titleCode: '',
    password: 'Password123.',
    email: 'powertools.admin@ydev.hybris.com',
  },
};
