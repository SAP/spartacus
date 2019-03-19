// import { generateMail } from '../helpers/user';
import { product } from '../sample-data/big-happy-path';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Make sure you have placed the order. Returns order object.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requirePlacedOrder(); // default values
        cy.requirePlacedOrder(user, product, cart);
        ```
       */
      requireShippingMethodSelected: (auth: {}) => Cypress.Chainable<{}>;
    }
  }
}
Cypress.Commands.add('requireShippingMethodSelected', res => {
  console.log('sm', product);
  const apiUrl = Cypress.env('API_URL');
  // const email = res.email;
  function setShippingMethod() {
    return cy.request({
      method: 'PUT',
      url: `${apiUrl}/rest/v2/electronics/users/current/carts/current/deliverymode?deliveryModeId=standard-gross`,
      // body: {
      //   deliveryModeId: 'standard-gross'
      // },
      form: false,
      headers: {
        Authorization: `bearer ${res.userToken.token.access_token}`
      }
    });
  }

  cy.server();
  setShippingMethod().then(resp => cy.wrap(resp));
});
