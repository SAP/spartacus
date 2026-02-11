/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { generateMail, randomString } from '../helpers/user';

export interface SampleOrg {
  companyName?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

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
    lastName: 'customer',
    fullName: 'Cypress customer',
    password: 'Pas!sword123.',
    email: generateMail(randomString(), true),
    phone: '+919555555555',
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

export const organisation = getSampleOrg();

export function getSampleOrg() {
  return {
    companyName: randomString(),
    address: '1111 S Figueroa St',
    city: 'Los Angeles',
    state: 'California',
    zipCode: '90015',
    country: 'United States',
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

export function buildCheckoutDetailsAfterPaymentMock() {
  return {
    statusCode: 200,
    body: {
      type: 'cartWsDTO',
      deliveryAddress: {
        cellphone: '',
        country: { isocode: 'US', name: 'United States' },
        defaultAddress: false,
        firstName: 'Cypress',
        formattedAddress:
          '1111 S Figueroa St, US-CA, California, Los Angeles, 90015',
        id: '8798529028119',
        lastName: 'customer',
        line1: '1111 S Figueroa St',
        line2: 'US-CA',
        phone: '+919555555555',
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
        accountHolderName: 'Cypress customer',
        billingAddress: {
          country: { isocode: 'US', name: 'United States' },
          defaultAddress: false,
          email: 'cypress_user_lm2eyuogu_233653618136@sapcx.com',
          firstName: 'Cypress',
          formattedAddress:
            '1111 S Figueroa St US-CA, US-CA, California, Los Angeles, 90015',
          id: '8798529060887',
          lastName: 'customer',
          line1: '1111 S Figueroa St US-CA',
          line2: 'US-CA',
          phone: '+919555555555',
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
        cardType: { code: 'visa', name: 'Visa' },
        defaultPayment: false,
        expiryMonth: '12',
        expiryYear: '2027',
        id: '8797867933738',
        saved: true,
        subscriptionId: '669ff0cd-6f59-42bf-b655-0cf04653b23f',
      },
    },
  };
}
