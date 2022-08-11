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
      requireProductAddedToCart: (
        auth: {},
        productData?: {}
      ) => Cypress.Chainable<any>;
    }
  }
}

Cypress.Commands.add(
  'requireProductAddedToCart',
  (auth, productData = product) => {
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
          Authorization: `bearer ${auth.access_token}`,
        },
      });
    }

    function addToCart(cartCode: any, productData: any) {
      // B2B add to cart
      if (Cypress.env('OCC_PREFIX_USER_ENDPOINT') !== 'users') {
        return cy.request({
          method: 'POST',
          url: `${Cypress.env('API_URL')}/${Cypress.env(
            'OCC_PREFIX'
          )}/${Cypress.env('BASE_SITE')}/${Cypress.env(
            'OCC_PREFIX_USER_ENDPOINT'
          )}/current/carts/${cartCode}/entries`,
          body: {
            code: productData.code,
            qty: 1,
          },
          form: true,
          headers: {
            Authorization: `bearer ${auth.access_token}`,
          },
        });
      }

      // B2C add to cart
      return cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env('BASE_SITE')}/${Cypress.env(
          'OCC_PREFIX_USER_ENDPOINT'
        )}/current/carts/${cartCode}/entries`,
        body: {
          product: {
            code: productData.code,
          },
          qty: 1,
        },
        headers: {
          Authorization: `bearer ${auth.access_token}`,
        },
      });
    }

    createCart().then((cart) => {
      addToCart(cart.body.code, productData).then((response) => {
        response.body.cartId = cart.body.code; // need this in the response for later use
        Cypress.log({
          name: 'requireProductaddedToCart',
          displayName: 'Add to cart (require)',
          message: [`🛒 Product added to cart`],
          consoleProps: () => {
            return {
              'Cart ID': response.body.cartId,
              'Product code': productData.code,
              Quantity: productData.qty,
            };
          },
        });
        cy.wrap(response.body);
      });
    });
  }
);
