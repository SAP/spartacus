/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { login, setSessionData } from '../../support/utils/login';
import { createCart } from '../../support/utils/cart';

export const mockPunchoutSession = {
  customerId: 'punchout.customer@punchoutorg.com',
  password: 'pw4all',
  cartId: '',
  punchOutLevel: '',
  punchOutOperation: '',
  selectedItem: '',
  token: {
    accessToken: '',
    tokenType: 'bearer',
  },
};

export function createPunchoutSessionIntercept(
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

export function openPunchoutSession(punchoutSession) {
  return login(punchoutSession.customerId, punchoutSession.password)
    .then((result) => {
      expect(result.status).to.eq(200);
      cy.log('Logged in as Punchout user', JSON.stringify(result.body));
      setSessionData(result.body);
      punchoutSession.token.accessToken = result.body.access_token;
      createCart(result.body.access_token);
    })
    .then((cart) => {
      cy.log('Cart created', JSON.stringify(cart));
      punchoutSession.cartId = (cart as any).body.code;
      createPunchoutSessionIntercept(punchoutSession);
      return login('carla.torres@rustic-hw.com', 'pw4all');
    })
    .then((result) => {
      expect(result.status).to.eq(200);
      cy.log('Logged in as Maria Torres', JSON.stringify(result.body));
      setSessionData(result.body);
      cy.visit(`/punchout/cxml/session?sid=abcd123`);
    });
}
