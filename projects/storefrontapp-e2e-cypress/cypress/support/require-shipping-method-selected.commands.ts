import { getDefaultDeliveryModeCode } from './utils/delivery-modes';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Make sure you have shipping method selected. Returns shipping method object.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requireShippingMethodSelected(auth);
        ```
       */
      requireShippingMethodSelected: (
        auth: {},
        cartId?: string
      ) => Cypress.Chainable<{}>;
    }
  }
}

Cypress.Commands.add('requireShippingMethodSelected', (auth, cartId) => {
  const cartQueryValue = cartId || 'current';

  function setShippingMethod(deliveryMode) {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.env('API_URL')}${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/carts/${cartQueryValue}/deliverymode?deliveryModeId=${deliveryMode}`,
      form: false,
      headers: {
        Authorization: `bearer ${auth.access_token}`,
      },
    });
  }

  cy.server();
  getDefaultDeliveryModeCode(auth.access_token, cartId).then((code) =>
    setShippingMethod(code).then((resp) => cy.wrap(resp))
  );
});
