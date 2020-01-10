import { waitForPage } from './checkout-flow';
import { getSuccessAlert } from './global-message';

export function checkTabs() {
  cy.get('cx-tab-paragraph-container > h3')
    .eq(1)
    .contains('RETURNS (0)')
    .click();

  cy.get('cx-tab-paragraph-container > h3')
    .first()
    .contains('ALL ORDERS (2)')
    .click();
}

export function cancelOrder() {
  const orderHistoryPage = waitForPage('/my-account/order', 'orderHistoryPage');

  cy.get('cx-order-history a.cx-order-history-value')
    .contains('In Process')
    .click({ force: true });

  cy.wait(`@${orderHistoryPage}`);

  const cancelOrderPage = waitForPage(
    '/my-account/order/cancel',
    'cancelOrderPage'
  );

  cy.get('cx-order-details-actions button.btn-primary')
    .contains('Cancel Items')
    .click({ force: true });

  cy.wait(`@${cancelOrderPage}`);

  cy.get('button.cx-action-link')
    .contains('Set all quantities to maximum')
    .click({ force: true });

  cy.get('input.cx-counter-value').should('have.value', '1');

  cy.get('button.btn-primary')
    .contains('Continue')
    .should('not.be.disabled')
    .click({ force: true });

  cy.get('cx-cancel-order-confirmation button.btn-primary')
    .contains('Submit Request')
    .click({ force: true });

  getSuccessAlert().contains('Your cancellation request was submitted');

  cy.wait(`@${orderHistoryPage}`);

  cy.url().should('contain', 'my-account/orders');
}
