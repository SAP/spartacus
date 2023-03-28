/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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

export const b2cApparelCheckoutDetailsStub = {
  type: 'cartWsDTO',
  deliveryAddress: {
    cellphone: '',
    country: {
      isocode: 'GB',
      name: 'United Kingdom',
    },
    defaultAddress: false,
    firstName: 'Cypress',
    formattedAddress: 'Buckingham Street 5, 1A, London, MA8902, United Kingdom',
    id: 'xxxxxxxxxxxxx',
    lastName: 'Customer',
    line1: 'Buckingham Street 5',
    line2: '1A',
    phone: '44 7911 123456',
    postalCode: 'MA8902',
    shippingAddress: true,
    title: 'Mr.',
    titleCode: 'mr',
    town: 'London',
    visibleInAddressBook: true,
  },
  deliveryMode: {
    code: 'standard-gross',
    deliveryCost: {
      currencyIso: 'GBP',
      formattedValue: '£5.99',
      priceType: 'BUY',
      value: 5.99,
    },
    description: '3-5 business days',
    name: 'Standard Delivery',
  },
  paymentInfo: {
    accountHolderName: 'Cypress Customer',
    billingAddress: {
      country: {
        isocode: 'GB',
        name: 'United Kingdom',
      },
      defaultAddress: false,
      email: 'cypress_user_jc7ikrhii_144428219416@sapcx.com',
      firstName: 'Cypress',
      formattedAddress:
        'Buckingham Street 5 1A, 1A, London, MA8902, United Kingdom',
      id: 'xxxxxxxxxxxxx',
      lastName: 'Customer',
      line1: 'Buckingham Street 5 1A',
      line2: '1A',
      phone: '44 7911 123456',
      postalCode: 'MA8902',
      shippingAddress: false,
      town: 'London',
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
