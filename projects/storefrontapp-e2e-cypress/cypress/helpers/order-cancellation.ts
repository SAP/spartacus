import { product } from '../sample-data/checkout-flow';
import {
  waitForOrderToBeDisplayedInOrderHistoryPage,
  waitForStatusToBeDisplayed,
} from '../support/utils/order-placed';
import { doPlaceOrder } from './order-history';

export const placeOrder = () => {
  let orderCode: string;

  doPlaceOrder()
    .then((orderData: any): void => {
      cy.log(orderData.body.code);
      orderCode = orderData.body.code;
      cy.waitForOrderToBePlacedRequest(
        undefined,
        undefined,
        orderData.body.code
      );
      cy.visit('/my-account/orders');

      waitForOrderToBeDisplayedInOrderHistoryPage(orderCode);
    })
    .then(() => {
      cy.get('.cx-order-history-status > .cx-order-history-value')
        .first()
        .should('contain.text', 'Pending');

      cy.get('.cx-order-history-code > .cx-order-history-value')
        .should('contain', orderCode)
        .first()
        .click();
    });

  return orderCode;
};

export const fullyCancelOrder = (orderCode: string) => {
  console.log(orderCode);
  cy.get('cx-order-details-actions a.btn-action').should('exist').click();

  cy.get('cx-amend-order-items .cx-name')
    .should('exist')
    .should('contain.text', product.name);

  cy.get('cx-amend-order-items button.cx-action-link')
    .should('contain', 'Set all quantities to maximum')
    .click();

  cy.get('cx-amend-order-actions')
    .first()
    .get('button.btn-primary')
    .first()
    .click();

  cy.get('cx-amend-order-actions')
    .first()
    .get('button[type="submit"]')
    .first()
    .click();

  cy.visit('/my-account/orders');

  waitForStatusToBeDisplayed('Cancelled');

  cy.get('.cx-order-history-status > .cx-order-history-value')
    .first()
    .should('contain', 'Cancelled');
};
