/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { b2bUser } from '../../sample-data/b2b-checkout';
import { myCompanyAdminUser } from '../../sample-data/shared-users';
import { login } from '../../support/utils/login';
import { visitHomePage } from '../checkout-flow';
import { addB2bUser, setB2bPassword } from './b2b-checkout';
import { product1 } from '../../sample-data/b2b-order-history';
import { clearAllStorage } from '../../support/utils/clear-all-storage';
import { removeProductFromCart } from '../wish-list';

export function createPunchoutUser(user) {
  let adminToken;
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
      )}/punchout/sessions/*`,
    },
    mockResponse
  ).as(alias);
}

export const createPunchoutSessionResponse = ({
  user,
  cart,
  stateAuth,
  punchOutLevel,
  punchOutOperation,
  selectedItem,
}) => ({
  customerId: user.email,
  cartId: cart.cartId,
  punchOutLevel,
  punchOutOperation,
  selectedItem,
  token: {
    accessToken: stateAuth.access_token,
    tokenType: 'bearer',
  },
});

export const preparePunchoutSession = ({
  user,
  cart,
  stateAuth,
  punchoutConfig,
}) => {
  const mockResponse = createPunchoutSessionResponse({
    user,
    cart,
    stateAuth,
    ...punchoutConfig,
  });
  removeProductFromCart();
  console.log('mockResponse', mockResponse);
  createPunchoutSession(mockResponse);
  clearAllStorage();
  cy.visit(`/punchout/cxml/session?sid=mySessionId`);
  cy.get('cx-login .cx-login-greet').contains(
    `Hi, ${user.firstName} ${user.lastName}`
  );
  cy.get('cx-navigation-ui.accNavComponent').should(
    'not.contain.text',
    'My Account'
  );
};
