/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { generateMail, randomString } from './user';
import { products } from './cart';
import { standardUser } from '../sample-data/shared-users';

/**
 * Interface for creating a test user with complete setup
 */
export interface TestUserSetup {
  user?: {
    titleCode?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
  };
  address?: {
    country?: string;
    line1?: string;
    line2?: string;
    town?: string;
    state?: string;
    postalCode?: string;
    defaultAddress?: boolean;
  };
  payment?: {
    accountHolderName?: string;
    cardNumber?: string;
    cardType?: string;
    expiryMonth?: string;
    expiryYear?: string;
    cvv?: string;
    defaultPayment?: boolean;
    saved?: boolean;
  };
  items?: Array<{
    code: string;
    quantity?: number;
  }>;
}

/**
 * Default configuration for test setup
 */
export const defaultTestSetup = {
  user: {
    titleCode: 'mr',
    firstName: 'Cypress',
    lastName: 'Tester',
    email: generateMail(randomString(), true),
    password: 'Password123.',
    phone: '9876543210',
  },
  address: {
    country: 'US',
    line1: '100 Fifth Avenue',
    line2: 'Apt 123',
    town: 'New York',
    state: 'NY',
    postalCode: '10001',
    defaultAddress: true,
  },
  payment: {
    accountHolderName: 'Cypress Tester',
    cardNumber: '4111111111111111',
    cardType: 'visa',
    expiryMonth: '12',
    expiryYear: '2027',
    cvv: '123',
    defaultPayment: true,
    saved: true,
  },
  items: [
    { code: products[0].code, quantity: 1 },
    { code: products[1].code, quantity: 2 },
  ],
};

/**
 * Sets up a user account with everything needed for checkout: registration, login,
 * shipping address, payment method, and items in cart
 * @param config Configuration for test user setup (optional)
 * @returns Promise with user credentials and setup information
 */
export function setupUserAccountForCheckout(config: TestUserSetup = {}) {
  const setup = {
    user: { ...defaultTestSetup.user, ...config.user },
    address: { ...defaultTestSetup.address, ...config.address },
    payment: { ...defaultTestSetup.payment, ...config.payment },
    items: config.items || defaultTestSetup.items,
  };

  cy.clearCookies();
  cy.clearLocalStorage();
  cy.clearAllSessionStorage();

  return cy.requireLoggedIn(standardUser).then(({ username, password }) => {
    return cy.window().then((win) => {
      const authData = JSON.parse(win.localStorage.getItem('spartacus⚿⚿auth'));
      const authToken = authData.token.access_token;

      return cy
        .request({
          method: 'POST',
          url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/users/current/addresses?lang=en&curr=USD`,
          headers: {
            Authorization: `bearer ${authToken}`,
          },
          body: {
            defaultAddress: setup.address.defaultAddress,
            titleCode: setup.user.titleCode,
            firstName: setup.user.firstName,
            lastName: setup.user.lastName,
            line1: setup.address.line1,
            line2: setup.address.line2 || '',
            town: setup.address.town,
            region: {
              isocode: `${setup.address.country}-${setup.address.state}`,
            },
            country: { isocode: setup.address.country },
            postalCode: setup.address.postalCode,
            phone: setup.user.phone,
          },
        })
        .then((addressResponse) => {
          expect(addressResponse.status).to.eq(201);
          const addressData = addressResponse.body;

          return cy
            .request({
              method: 'POST',
              url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
                'BASE_SITE'
              )}/users/current/carts`,
              headers: {
                Authorization: `bearer ${authToken}`,
              },
            })
            .then((cartResponse) => {
              expect(cartResponse.status).to.eq(201);
              const cartId = cartResponse.body.code;

              const itemPromises = setup.items.map((item) => {
                return cy
                  .request({
                    method: 'POST',
                    url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
                      'BASE_SITE'
                    )}/users/current/carts/${cartId}/entries`,
                    headers: {
                      Authorization: `bearer ${authToken}`,
                    },
                    body: {
                      product: { code: item.code },
                      quantity: item.quantity || 1,
                    },
                  })
                  .then((entryResponse) => {
                    expect(entryResponse.status).to.eq(200);
                    return entryResponse;
                  });
              });

              return cy.wrap(Promise.all(itemPromises)).then(() => {
                return cy
                  .request({
                    method: 'POST',
                    url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
                      'BASE_SITE'
                    )}/users/current/carts/${cartId}/paymentdetails`,
                    headers: {
                      Authorization: `bearer ${authToken}`,
                    },
                    body: {
                      accountHolderName: setup.payment.accountHolderName,
                      cardNumber: setup.payment.cardNumber,
                      cardType: { code: setup.payment.cardType },
                      expiryMonth: setup.payment.expiryMonth,
                      expiryYear: setup.payment.expiryYear,
                      cvn: setup.payment.cvv,
                      defaultPayment: setup.payment.defaultPayment,
                      saved: setup.payment.saved,
                      billingAddress: {
                        firstName: setup.user.firstName,
                        lastName: setup.user.lastName,
                        titleCode: setup.user.titleCode,
                        line1: setup.address.line1,
                        line2: setup.address.line2 || '',
                        town: setup.address.town,
                        postalCode: setup.address.postalCode,
                        country: { isocode: setup.address.country },
                      },
                    },
                  })
                  .then((paymentResponse) => {
                    expect(paymentResponse.status).to.eq(201);
                    const paymentData = paymentResponse.body;

                    const setupResult = {
                      user: {
                        email: username,
                        password: password,
                        firstName: standardUser.registrationData.firstName,
                        lastName: standardUser.registrationData.lastName,
                        token: authToken,
                      },
                      address: addressData,
                      payment: paymentData,
                      cart: cartId,
                    };

                    return setupResult;
                  });
              });
            });
        });
    });
  });
}
