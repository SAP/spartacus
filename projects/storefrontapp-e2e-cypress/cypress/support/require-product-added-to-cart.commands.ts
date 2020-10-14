import { b2bProduct } from '../sample-data/b2b-checkout';
import { product } from '../sample-data/checkout-flow';

const cartsUrl = `${Cypress.env('API_URL')}/${Cypress.env(
  'OCC_PREFIX'
)}/${Cypress.env('BASE_SITE')}/users/current/carts`;
const b2bCartsUrl = `${Cypress.env('API_URL')}/${Cypress.env(
  'OCC_PREFIX'
)}/${Cypress.env('BASE_SITE')}/orgUsers/current/carts`;

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
        cartCode?: string
      ) => Cypress.Chainable<any>;
    }
  }
}

Cypress.Commands.add(
  'requireProductAddedToCart',
  (auth: any, code?: string) => {
    function createCart() {
      return cy.request({
        method: 'POST',
        url: cartsUrl,
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
      const url = Boolean(Cypress.env('B2B'))
        ? `${b2bCartsUrl}/${cartCode}/entries/`
        : `${cartsUrl}/${cartCode}/entries`;

      return cy.request({
        method: 'POST',
        url: url,
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

    if (!Boolean(code)) {
      createCart().then((cart) => {
        const prod = Boolean(Cypress.env('B2B')) ? b2bProduct : product;
        addToCart(cart.body.code, prod).then((resp) => {
          resp.body.cartId = cart.body.code; // need this in the response for later use
          cy.wrap(resp.body);
        });
      });
    } else {
      const prod = Boolean(Cypress.env('B2B')) ? b2bProduct : product;
      addToCart(code, prod).then((resp) => {
        resp.body.cartId = code; // need this in the response for later use
        cy.wrap(resp.body);
      });
    }
  }
);