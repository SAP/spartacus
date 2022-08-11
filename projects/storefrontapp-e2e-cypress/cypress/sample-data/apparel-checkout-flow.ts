import { generateMail, randomString } from '../helpers/user';
import { SampleCartProduct, SampleProduct, SampleUser } from './checkout-flow';

export const variantUser: SampleUser = getApparelCheckoutUser();

export function getApparelCheckoutUser() {
  return {
    firstName: 'Cypress',
    lastName: 'Customer',
    fullName: 'Cypress Customer',
    password: 'Pw4all.',
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
        month: '12',
        year: '2027',
      },
      cvv: '123',
    },
  };
}

// base product with variants
export const product: SampleProduct = {
  name: 'Alpha 350',
  code: '1446509',
};

export const variantProduct: SampleProduct = {
  name: 'Maguro Pu Belt plaid LXL',
  code: '300785814',
};

// variant style of base product
export const styleVariantProduct: SampleProduct = {
  name: 'Maguro Pu Belt print LXL',
  code: '300608277',
};

export const productWithoutVariants: SampleProduct = {
  name: 'Wrappers Delight Tote Women fire red Uni',
  code: '300611156',
};

export const products: SampleProduct[] = [
  {
    ...variantProduct,
  },
  {
    ...styleVariantProduct,
  },
  {
    ...productWithoutVariants,
  },
];

export const cartWithSingleVariantProduct: SampleCartProduct = {
  estimatedShipping: '£5.99',
  total: '£24.26',
  totalAndShipping: '£30.25',
};

export const cartWithTotalVariantProduct: SampleCartProduct = {
  estimatedShipping: '£5.99',
  total: '£137.54',
  totalAndShipping: '£143.53',
};
