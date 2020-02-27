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

export const cheapProduct = {
  name: 'Web Camera (100KpixelM CMOS, 640X480, USB 1.1) Black',
  code: '280916',
};

// usa shipping cost
export const cart = {
  estimatedShipping: '$11.99',
  total: '$2,623.08',
  totalAndShipping: '$2,633.07', // $2,623.08 + $9.99
};

export const cartWithCheapProduct = {
  estimatedShipping: '$9.99',
  total: '$8.20',
  totalAndShipping: '$18.19',
};

export const delivery = {
  mode: 'standard-net',
};
