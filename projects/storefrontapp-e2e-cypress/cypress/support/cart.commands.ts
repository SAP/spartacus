import { addToCart, createCart } from './utils/cart';

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
    createCart(accessToken).then((response) => {
      const cartId = response.body.code;
      addToCart(cartId, productCode, quantity, accessToken).then(() => {
        Cypress.log({
          name: 'addToCart',
          displayName: 'Add to cart',
          message: [`🛒 Product(s) added to cart`],
          consoleProps: () => {
            return {
              'Cart ID': cartId,
              'Product code': productCode,
              Quantity: quantity,
            };
          },
        });

        cy.wrap(cartId);
      });
    });
  }
);
