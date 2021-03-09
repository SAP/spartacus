import { delivery } from '../sample-data/checkout-flow';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Selects a default shipping method for the current cart of the current user.
       * Returns shipping method object.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requireShippingMethodSelected(token);
        ```
       */
      requireShippingMethodSelected: (token: {}) => Cypress.Chainable<{}>;
    }
  }
}
Cypress.Commands.add('requireShippingMethodSelected', (token) => {
  function setShippingMethod() {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.env('API_URL')}/${Cypress.env(
        'OCC_PREFIX'
      )}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/carts/current/deliverymode?deliveryModeId=${
        delivery.mode
      }`,
      form: false,
      headers: {
        Authorization: `bearer ${token.access_token}`,
      },
    });
  }

  setShippingMethod().then((resp) => cy.wrap(resp));
});
