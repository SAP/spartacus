/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { login, setSessionData } from '../../support/utils/login';
import { visitHomePage } from '../checkout-flow';
import { removeProductFromCart } from '../wish-list';

//presteps
// login with punchout user,
// get its token from response
// create a cart (not sure if it is done by adding item?)
// no need to logout (session page )

export function createPunchoutUser() {
  // let adminToken;
  // let stateAuth;
  return login('punchout.customer@punchoutorg.com', 'pw4all').then((result) => {
    expect(result.status).to.eq(200);
    cy.log('Logged in as Punchout user', JSON.stringify(result.body));
    setSessionData(result.body);

    visitHomePage();
    //   adminToken = result?.body?.access_token;
    //   return addB2bUser(adminToken, user, ['PunchOutOrganization']);
    // })
    // .then((result) => {
    //   expect(result.status).to.eq(201);
    //   return setB2bPassword(result.body.customerId, user.password, adminToken);
    // })
    // .then((result: any) => {
    //   expect(result.status).to.eq(204);
    //   b2bUser.registrationData.email = user.email;
    //   b2bUser.registrationData.password = user.password;

    //   return cy.requireLoggedIn(b2bUser);
  });
  // .then(() => {
  //   visitHomePage();
  //   cy.get('.cx-login-greet').should('contain', user.fullName);
  //   return cy.window();
  // })
  // .then((win) => JSON.parse(win.localStorage.getItem('spartacus⚿⚿auth')))
  // .then(({ token }) => {
  //   stateAuth = token;
  //   return cy.requireProductAddedToCart(stateAuth, product1);
  // })
  // .then((cart) => {
  //   user, cart, stateAuth;
  // });
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
  // clearAllStorage();
  cy.visit(`/punchout/cxml/session?sid=mySessionId`);
  cy.get('cx-login .cx-login-greet').contains(
    `Hi, ${user.firstName} ${user.lastName}`
  );
  cy.get('cx-navigation-ui.accNavComponent').should(
    'not.contain.text',
    'My Account'
  );
};
