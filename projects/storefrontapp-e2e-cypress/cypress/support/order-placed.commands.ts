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
        cy.waitForOrderToBePlacedRequest(contentCatalog, currency, orderNumber);
        ```
       */
      waitForOrderToBePlacedRequest: (
        contentCatalog?: string,
        currency?: string,
        orderNumber?: string
      ) => void;
    }
  }
}

Cypress.Commands.add(
  'waitForOrderToBePlacedRequest',
  (contentCatalog = 'electronics-spa', currency = 'USD', orderNumber) => {
    Cypress.log({
      name: 'waitForOrderToBePlacedRequest',
      displayName: 'Waiting for placed order',
      message: [`💰 Waiting for placed order ${orderNumber}`],
    });
    waitForOrderToBePlacedRequest(orderNumber, contentCatalog, currency);
  }
);
