/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { b2bUser } from '../../sample-data/b2b-checkout';
import { getSampleUser } from '../../sample-data/checkout-flow';
import { myCompanyAdminUser } from '../../sample-data/shared-users';
import { login } from '../../support/utils/login';
import { visitHomePage } from '../checkout-flow';
import { addB2bUser, setB2bPassword } from './b2b-checkout';
import { product1 } from '../../sample-data/b2b-order-history';

export function createPunchoutUser(user) {
  let adminToken;
  // let user = getSampleUser();
  let stateAuth;
  return login(
    myCompanyAdminUser.registrationData.email,
    myCompanyAdminUser.registrationData.password
  )
    .then((result) => {
      expect(result.status).to.eq(200);
      adminToken = result?.body?.access_token;
      return addB2bUser(adminToken, user, ['PunchOut Organization']);
    })
    .then((result) => {
      expect(result.status).to.eq(201);
      return setB2bPassword(result.body.customerId, user.password, adminToken);
    })
    .then((result: any) => {
      expect(result.status).to.eq(204);
      b2bUser.registrationData.email = user.email;
      b2bUser.registrationData.password = user.password;

      return cy.requireLoggedIn(b2bUser);
    })
    .then(() => {
      visitHomePage();
      cy.get('.cx-login-greet').should('contain', user.fullName);
      return cy.window();
    })
    .then((win) => JSON.parse(win.localStorage.getItem('spartacus⚿⚿auth')))
    .then(({ token }) => {
      stateAuth = token;
      return cy.requireProductAddedToCart(stateAuth, product1);
    })
    .then((cart) => {
      user, cart, stateAuth;
    });
}

export function createPunchoutSession(
  mockResponse = {},
  alias = 'createPunchoutSession'
) {
  cy.intercept(
    {
      method: 'GET',
      pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/punchout/session/*`,
    },
    mockResponse
  ).as(alias);
}

export const punchoutSessionResponse = {
  customerId: 'punchout.customer@punchoutorg.com',
  cartId: '00002159',
  punchOutLevel: 'STORE',
  punchOutOperation: 'CREATE',
  selectedItem: '300000029',
  token: {
    accessToken: '1uEhL4lj58n1zX9R0aICC7-ng2c',
    tokenType: 'bearer',
  },
};

export const createPunchoutSessionResponse = (user) => ({
  customerId: user.email,
  cartId: localStorage.getItem('spartacus⚿powertools-spa⚿cart'),
  punchOutLevel: 'STORE',
  punchOutOperation: 'CREATE',
  selectedItem: '300000029',
  token: {
    accessToken: JSON.parse(localStorage.getItem('spartacus⚿⚿auth'))?.token
      .access_token,
    tokenType: 'bearer',
  },
});
