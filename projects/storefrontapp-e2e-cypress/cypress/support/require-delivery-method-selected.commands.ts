/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getDefaultDeliveryModeCode } from './utils/delivery-modes';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Selects a default delivery method for a cart.
       * Returns delivery method object.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requireDeliveryMethodSelected(token, cartId);
        ```
       */
      requireDeliveryMethodSelected: (
        auth: {},
        cartId?: string
      ) => Cypress.Chainable<{}>;
    }
  }
}

Cypress.Commands.add('requireDeliveryMethodSelected', (token, cartId) => {
  const cartCode = cartId || 'current';

  function setDeliveryMethod(deliveryMode) {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.env('API_URL')}${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/carts/${cartCode}/deliverymode?deliveryModeId=${deliveryMode}`,
      form: false,
      headers: {
        Authorization: `bearer ${token.access_token}`,
      },
    });
  }

  getDefaultDeliveryModeCode(token.access_token, cartId).then((code) =>
    setDeliveryMethod(code).then((resp) => cy.wrap(resp))
  );
});
