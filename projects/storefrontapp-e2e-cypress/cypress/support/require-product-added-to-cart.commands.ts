import { product } from '../sample-data/checkout-flow';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Make sure you have product added to cart. Returns cart object.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requireProductAddedToCart(auth);
        ```
       */
      requireProductAddedToCart: (auth: {}) => Cypress.Chainable<{}>;
    }
  }
}

Cypress.Commands.add('requireProductAddedToCart', auth => {
  const apiUrl = Cypress.env('API_URL');
  function createCart() {
    return cy.request({
      method: 'POST',
      url: `${apiUrl}/rest/v2/electronics/users/current/carts`,
      body: {
        fields: 'DEFAULT'
      },
      form: true,
      headers: {
        Authorization: `bearer ${auth.userToken.token.access_token}`
      }
    });
  }

  function addToCart(cartCode: any, productData: any) {
    return cy.request({
      method: 'POST',
      url: `${apiUrl}/rest/v2/electronics/users/current/carts/${cartCode}/entries`,
      body: {
        code: productData.code,
        qty: 1
      },
      form: true,
      headers: {
        Authorization: `bearer ${auth.userToken.token.access_token}`
      }
    });
  }

  cy.server();

  createCart().then(resp => {
    addToCart(resp.body.code, product).then(cart => cy.wrap(cart));
  });
});
