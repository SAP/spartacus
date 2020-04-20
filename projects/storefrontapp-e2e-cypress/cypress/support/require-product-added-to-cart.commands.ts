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
      requireProductAddedToCart: (auth: {}) => Cypress.Chainable<any>;
    }
  }
}

Cypress.Commands.add('requireProductAddedToCart', (auth) => {
  function createCart() {
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
        Authorization: `bearer ${auth.userToken.token.access_token}`,
      },
    });
  }

  function addToCart(cartCode: any, productData: any) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/${Cypress.env(
        'OCC_PREFIX'
      )}/${Cypress.env('BASE_SITE')}/users/current/carts/${cartCode}/entries`,
      body: {
        code: productData.code,
        qty: 1,
      },
      form: true,
      headers: {
        Authorization: `bearer ${auth.userToken.token.access_token}`,
      },
    });
  }

  cy.server();

  createCart().then((cart) => {
    addToCart(cart.body.code, product).then((resp) => {
      resp.body.cartId = cart.body.code; // need this in the response for later use
      cy.wrap(resp.body);
    });
  });
});
