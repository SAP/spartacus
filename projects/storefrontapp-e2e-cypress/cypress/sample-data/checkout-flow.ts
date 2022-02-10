import { generateMail, randomString } from '../helpers/user';

export interface SampleUser {
  titleCode?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  password?: string;
  email?: string;
  phone?: string;
  address?: {
    city?: string;
    line1?: string;
    line2?: string;
    country?: string;
    state?: string;
    postal?: string;
  };
  payment?: {
    card?: string;
    number?: string;
    expires?: {
      month?: string;
      year?: string;
    };
    cvv?: string;
  };
}

export interface SampleProduct {
  name: string;
  code: string;
}

export interface SampleNonPurchasableProduct extends SampleProduct {
  multidimensional: boolean;
}

export interface SampleCartProduct {
  estimatedShipping: string;
  total: string;
  totalAndShipping: string;
}

export const user = getSampleUser();

export function getSampleUser() {
  return {
    titleCode: 'Mr',
    firstName: 'Cypress',
    lastName: 'customer',
    fullName: 'Cypress customer',
    password: 'Password123.',
    email: generateMail(randomString(), true),
    phone: '555 555 555',
    address: {
      city: 'Los Angeles',
      line1: '1111 S Figueroa St',
      line2: 'US-CA',
      country: 'United States',
      state: 'California',
      postal: '90015',
    },
    payment: {
      card: 'Visa',
      number: '4111111111111111',
      expires: {
        month: '12',
        year: '2025',
      },
      cvv: '123',
    },
  };
}

export const product: SampleProduct = {
  name: 'Alpha 350',
  code: '1446509',
};

export const cheapProduct: SampleProduct = {
  name: 'Web Camera (100KpixelM CMOS, 640X480, USB 1.1) Black',
  code: '280916',
};

// usa shipping cost
export const cart: SampleCartProduct = {
  estimatedShipping: '$11.99',
  total: '$2,623.08',
  totalAndShipping: '$2,635.07', // $2,623.08 + $9.99
};

export const cartWithCheapProduct: SampleCartProduct = {
  estimatedShipping: '$11.99',
  total: '$8.20',
  totalAndShipping: '$20.19',
};
