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
        contentCatalog?: string,
        orderNumber?: string
      ) => void;
    }
  }
}

Cypress.Commands.add(
  'waitForOrderToBePlacedRequest',
  (contentCatalog = 'electronics-spa', orderNumber) => {
    waitForOrderToBePlacedRequest(orderNumber, contentCatalog);
  }
);
