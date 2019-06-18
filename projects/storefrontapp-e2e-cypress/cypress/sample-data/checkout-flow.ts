import { generateMail, randomString } from '../helpers/user';

export const user = {
  firstName: 'Winston',
  lastName: 'Rumfoord',
  fullName: 'Winston Rumfoord',
  password: 'Password123.',
  email: generateMail(randomString(), true),
  phone: '555 555 555',
  address: {
    city: 'Tralfamadore',
    line1: 'Chrono-Synclastic Infundibulum',
    line2: 'Betelgeuse',
    country: 'United States',
    state: 'Connecticut',
    postal: '06247',
  },
  payment: {
    card: 'Visa',
    number: '4111111111111111',
    expires: {
      month: '07',
      year: '2022',
    },
    cvv: '123',
  },
};

export const product = {
  name: 'Alpha 350',
  code: '1446509',
};

export const cart = {
  total: '$2,623.08',
};

export const cartTotalAndShipping = '$2,635.07'; // $2,623.08 + $11.99

export const delivery = {
  mode: 'standard-gross',
};
