/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { login, setSessionData } from '../../../../support/utils/login';
import { isolateTests } from '../../../../support/utils/test-isolation';

describe('B2B Punchout', () => {
  isolateTests();
  // let user: any;
  // let cart: any;
  // let stateAuth: any;

  // before(() => {
  //   // clearAllStorage();
  //   // Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  // });

  // beforeEach(() => {});

  // describe('Punchout Create', () => {
  it('should open session', () => {
    const mockPunchoutSession = {
      customerId: 'punchout.customer@punchoutorg.com',
      cartId: '',
      punchOutLevel: 'STORE',
      punchOutOperation: 'CREATE',
      selectedItem: '3880500',
      token: {
        accessToken: '',
        tokenType: 'bearer',
      },
    };

    login('punchout.customer@punchoutorg.com', 'pw4all')
      .then((result) => {
        expect(result.status).to.eq(200);
        cy.log('Logged in as Punchout user', JSON.stringify(result.body));
        setSessionData(result.body);
        mockPunchoutSession.token.accessToken = result.body.access_token;
        // create a cart for punchout user
        return cy.request({
          method: 'POST',
          url: `${Cypress.env('API_URL')}/${Cypress.env(
            'OCC_PREFIX'
          )}/${Cypress.env('BASE_SITE')}/users/current/carts`,
          body: {
            fields: 'DEFAULT',
          },
          form: true,
          headers: {
            Authorization: `bearer ${result.body.access_token}`,
          },
        });
      })
      .then((cart) => {
        cy.log('Cart created', JSON.stringify(cart));
        mockPunchoutSession.cartId = (cart as any).body.code;

        cy.intercept(
          {
            method: 'GET',
            pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
              'BASE_SITE'
            )}/punchout/sessions/*`,
          },
          mockPunchoutSession
        ).as('punchoutSessionAlias');

        // login with any other b2b user to avoid revoking token of punchout user
        return login('carla.torres@rustic-hw.com', 'pw4all');
      })
      .then((result) => {
        expect(result.status).to.eq(200);
        cy.log('Logged in as Maria Torres', JSON.stringify(result.body));
        setSessionData(result.body);

        cy.visit(`/punchout/cxml/session?sid=abcd123`);
        cy.get('cx-punchout-close-session').should('be.visible');
      });
  });
  //});
});
