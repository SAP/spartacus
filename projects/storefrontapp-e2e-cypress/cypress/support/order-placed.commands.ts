import { waitForOrderToBePlacedRequest } from './utils/order-placed';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Wait for backend to create order after completing checkout.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.waitForOrderToBePlacedRequest(orderNumber, contentCatalog);
        ```
       */
      waitForOrderToBePlacedRequest: (
        orderNumber?: string,
        contentCatalog?: string
      ) => void;
    }
  }
}

Cypress.Commands.add(
  'waitForOrderToBePlacedRequest',
  (orderNumber, contentCatalog = 'electronics-spa') => {
    waitForOrderToBePlacedRequest(orderNumber, contentCatalog);
  }
);
