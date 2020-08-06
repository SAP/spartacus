import { createCart, addToCart } from './utils/cart';

declare namespace Cypress {
  interface Chainable {
    /**
       * Creates a new cart and adds items to it
       * @memberof Cypress.Chainable
       * @example
        ```
        cy.addToCart(productCode, quantity, accessToken)
        ```
       */
    addToCart: (itemId: string, quantity: string, accessToken: string) => void;
  }
}

Cypress.Commands.add(
  'addToCart',
  (productCode: string, quantity: string, accessToken: string) => {
    cy.server();

    createCart(accessToken).then((response) => {
      cy.log(`Create cart ${JSON.stringify(response.body)}`);
      const cartId = response.body.code;
      addToCart(cartId, productCode, quantity, accessToken).then(() => {
        cy.log(`Add to cart ${cartId}`);
        cy.wrap(cartId);
      });
    });
  }
);
