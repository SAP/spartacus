const testUserId = Date.now() - 1535535333333;
export const user = {
  firstName: 'Winston',
  lastName: 'Rumfoord',
  fullName: 'Winston Rumfoord',
  password: 'Password123.',
  email: `user${testUserId}@ydev.hybris.com`,
  phone: '555 555 555',
  address: {
    city: 'Tralfamadore',
    line1: 'Chrono-Synclastic Infundibulum',
    line2: 'Betelgeuse',
    country: 'United States',
    state: 'Connecticut',
    postal: '06247'
  },
  payment: {
    card: 'Visa',
    number: '4111111111111111',
    expires: {
      month: '07',
      year: '2022'
    },
    cvv: '123'
  }
};

export const product = {
  name: 'Alpha 350',
  code: '1446509'
};

export const cart = {
  total: '$2,635.07'
};
