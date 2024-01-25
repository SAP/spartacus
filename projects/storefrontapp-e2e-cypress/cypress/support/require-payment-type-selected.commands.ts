/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Selects the default payment type for a cart.
       * Returns payment type object.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requirePaymentTypeSelected(auth, cartId);
        ```
       */
      requirePaymentTypeSelected: (
        auth: {},
        cartId?: string
      ) => Cypress.Chainable<{}>;
    }
  }
}

Cypress.Commands.add('requirePaymentTypeSelected', (auth, cartId) => {
  const cartCode = cartId || 'current';
  const payType = 'account';

  function setPaymentType() {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.env('API_URL')}${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/carts/${cartCode}/paymenttype?paymentType=${payType}`,
      form: false,
      headers: {
        Authorization: `bearer ${auth.access_token}`,
      },
    });
  }

  setPaymentType().then((resp) => cy.wrap(resp));
});
