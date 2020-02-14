import { generateMail, randomString } from '../helpers/user';

export const user = {
  firstName: 'User',
  lastName: 'Test',
  fullName: 'User Test',
  password: 'Password@123456.',
  email: generateMail(randomString(), true),
  phone: '44 7911 123456',
  address: {
    city: 'London',
    line1: 'Buckingham Street 5',
    line2: '1A',
    country: 'United Kingdom',
    postal: 'MA8902',
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

export const variantProduct = {
  name: 'Beacon Jacket glacier M',
  code: '300441355',
};

export const styleVariantProduct = {
  name: 'Beacon Jacket lime M',
  code: '300441360',
};

export const productWithoutVariants = {
  name: 'Wrappers Delight Tote Women fire red Uni',
  code: '300611156',
};
