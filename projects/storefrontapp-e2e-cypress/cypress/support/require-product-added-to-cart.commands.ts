import { product } from '../sample-data/checkout-flow';
import { POWERTOOLS_BASESITE } from '../sample-data/b2b-checkout';

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
      requireProductAddedToCart: (
        auth: {},
        entry?: { productCode?: string; qty?: number }
      ) => Cypress.Chainable<any>;
    }
  }
}

Cypress.Commands.add('requireProductAddedToCart', (auth, entry) => {
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

  function addToCart(cartCode: any) {
    if (Cypress.env('BASE_SITE') === POWERTOOLS_BASESITE) {
      return cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env(
          'BASE_SITE'
        )}/orgUsers/current/carts/${cartCode}/entries`,
        body: {
          code: entry?.productCode ? entry.productCode : product.code,
          quantity: entry?.qty ? entry.qty : 1,
        },
        form: true,
        headers: {
          Authorization: `bearer ${auth.userToken.token.access_token}`,
        },
      });
    } else {
      return cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env('BASE_SITE')}/users/current/carts/${cartCode}/entries`,
        body: {
          code: product.code,
          qty: 1,
        },
        form: true,
        headers: {
          Authorization: `bearer ${auth.userToken.token.access_token}`,
        },
      });
    }
  }

  cy.server();

  createCart().then((cart) => {
    addToCart(cart.body.code).then((resp) => {
      resp.body.cartId = cart.body.code; // need this in the response for later use
      cy.wrap(resp.body);
    });
  });
});
