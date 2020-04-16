declare namespace Cypress {
  interface Chainable {
    /**
       * Make sure you have placed the order. Returns new order data.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requirePlacedOrder(auth, address);
        ```
       */
    requirePlacedOrder: (token: {}, cartId: {}) => Cypress.Chainable<{}>;
  }
}

Cypress.Commands.add('requirePlacedOrder', (auth, cartId) => {
  function placeOrder() {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env(
        'BASE_ENDPOINT'
      )}/users/current/orders?cartId=${cartId}`,
      form: false,
      headers: {
        Authorization: `bearer ${auth.userToken.token.access_token}`,
      },
    });
  }

  cy.server();
  placeOrder().then((resp) => cy.wrap(resp));
});
