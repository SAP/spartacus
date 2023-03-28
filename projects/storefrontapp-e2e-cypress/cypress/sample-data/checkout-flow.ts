/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { generateMail, randomString } from '../helpers/user';

export interface SampleUser {
  titleCode?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  password?: string;
  email?: string;
  phone?: string;
  cellphone?: string;
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
    lastName: 'Customer',
    fullName: 'Cypress Customer',
    password: 'Password123.',
    email: generateMail(randomString(), true),
    phone: '555 555 555',
    cellphone: '123 456 7899',
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
        year: '2027',
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

export const b2cCheckoutDetailsStub = {
  type: 'cartWsDTO',
  deliveryAddress: {
    cellphone: '',
    country: {
      isocode: 'US',
      name: 'United States',
    },
    defaultAddress: false,
    firstName: 'Cypress',
    formattedAddress:
      '1111 S Figueroa St, US-CA, California, Los Angeles, 90015',
    id: 'xxxxxxxxxxxxx',
    lastName: 'Customer',
    line1: '1111 S Figueroa St',
    line2: 'US-CA',
    phone: '555 555 555',
    postalCode: '90015',
    region: {
      countryIso: 'US',
      isocode: 'US-CA',
      isocodeShort: 'CA',
      name: 'California',
    },
    shippingAddress: true,
    title: 'Mr.',
    titleCode: 'mr',
    town: 'Los Angeles',
    visibleInAddressBook: true,
  },
  deliveryMode: {
    code: 'standard-gross',
    deliveryCost: {
      currencyIso: 'USD',
      formattedValue: '$11.99',
      priceType: 'BUY',
      value: 11.99,
    },
    description: '3-5 business days',
    name: 'Standard Delivery',
  },
  paymentInfo: {
    accountHolderName: 'Cypress Customer',
    billingAddress: {
      country: {
        isocode: 'US',
        name: 'United States',
      },
      defaultAddress: false,
      email: 'cypress_user@sapcx.com',
      firstName: 'Cypress',
      formattedAddress:
        '1111 S Figueroa St US-CA, US-CA, California, Los Angeles, 90015',
      id: 'xxxxxxxxxxxxx',
      lastName: 'Customer',
      line1: '1111 S Figueroa St US-CA',
      line2: 'US-CA',
      phone: '555 555 555',
      postalCode: '90015',
      region: {
        countryIso: 'US',
        isocode: 'US-CA',
        isocodeShort: 'CA',
        name: 'California',
      },
      shippingAddress: false,
      town: 'Los Angeles',
      visibleInAddressBook: true,
    },
    cardNumber: '************1111',
    cardType: {
      code: 'visa',
      name: 'Visa',
    },
    defaultPayment: false,
    expiryMonth: '12',
    expiryYear: '2027',
    id: 'xxxxxxxxxxxxx',
    saved: true,
    subscriptionId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  },
};

export const b2cCheckoutDetailsStub2 = {
  type: 'cartWsDTO',
  deliveryAddress: {
    cellphone: '',
    country: {
      isocode: 'US',
      name: 'United States',
    },
    defaultAddress: false,
    firstName: 'Cypress',
    formattedAddress:
      '1111 S Figueroa St, US-CA, California, Los Angeles, 90015',
    id: '8796325904407',
    lastName: 'Customer',
    line1: '1111 S Figueroa St',
    line2: 'US-CA',
    phone: '555 555 555',
    postalCode: '90015',
    region: {
      countryIso: 'US',
      isocode: 'US-CA',
      isocodeShort: 'CA',
      name: 'California',
    },
    shippingAddress: true,
    title: 'Mr.',
    titleCode: 'mr',
    town: 'Los Angeles',
    visibleInAddressBook: true,
  },
  deliveryMode: {
    code: 'standard-gross',
    deliveryCost: {
      currencyIso: 'USD',
      formattedValue: '$11.99',
      priceType: 'BUY',
      value: 11.99,
    },
    description: '3-5 business days',
    name: 'Standard Delivery',
  },
  paymentInfo: {
    accountHolderName: 'Cypress Customer',
    billingAddress: {
      country: {
        isocode: 'CA',
        name: 'Canada',
      },
      defaultAddress: false,
      email: 'cypress_user_uka8s3e9k_144485133990@sapcx.com',
      firstName: 'Cypress',
      formattedAddress:
        '111 Boulevard Robert-Bourassa , US-CA, Quebec, Montreal, 9000',
      id: '8796325969943',
      lastName: 'Customer',
      line1: '111 Boulevard Robert-Bourassa ',
      line2: 'US-CA',
      phone: '555 555 555',
      postalCode: '9000',
      region: {
        countryIso: 'CA',
        isocode: 'CA-QC',
        isocodeShort: 'QC',
        name: 'Quebec',
      },
      shippingAddress: false,
      town: 'Montreal',
      visibleInAddressBook: true,
    },
    cardNumber: '************1111',
    cardType: {
      code: 'visa',
      name: 'Visa',
    },
    defaultPayment: false,
    expiryMonth: '12',
    expiryYear: '2027',
    id: '8796160032810',
    saved: true,
    subscriptionId: '19b0be93-c38e-4a18-9b7f-2e4e887249a7',
  },
};
