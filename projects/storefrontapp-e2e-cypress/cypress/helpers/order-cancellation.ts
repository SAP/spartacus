import { product } from '../sample-data/checkout-flow';
import { waitForOrderWithConsignmentToBePlacedRequest } from '../support/utils/order-placed';
import { doPlaceOrder } from './order-history';

export const placeOrderAndVerifyHistory = () => {
  let orderCode: string;

  doPlaceOrder().then((orderData: any) => {
    cy.waitForOrderToBePlacedRequest(undefined, undefined, orderData.body.code);
    cy.visit('/my-account/orders');

    cy.get('.cx-order-history-code > .cx-order-history-value')
      .then(
        (el: JQuery<HTMLElement>): Cypress.Chainable<JQuery<HTMLElement>> => {
          const orderNumber: string = el.text().match(/\d+/).shift();
          orderCode = orderNumber;

          waitForOrderWithConsignmentToBePlacedRequest(orderNumber);
          return cy.wrap(el);
        }
      )
      .first()
      .click();

    cy.get('.cx-item-list-row .cx-link').should('contain', product.name);
    cy.get('.cx-item-list-row .cx-code').should('contain', product.code);
    cy.get('.cx-summary-total > .cx-summary-amount').should(
      'contain',
      orderData.body.totalPrice.formattedValue
    );
  });

  return orderCode;
};

export const cancelOrder = (orderCode: string) => {
  cy.get('cx-order-details-actions a[data-cy-cancel-button="cancelButton"]')
    .should('exist')
    .click();

  cy.get('cx-amend-order-items .cx-name')
    .should('exist')
    .should('contain.text', product.name);

  cy.get('cx-item-counter button').eq(1).should('exist').click();

  cy.get('cx-amend-order-actions').first().get('a.btn-primary').first().click();

  cy.get('cx-amend-order-actions')
    .first()
    .get('button[type="submit"]')
    .first()
    .click();

  cy.visit('/my-account/orders');

  cy.get('.cx-order-history-status > .cx-order-history-value')
    .first()
    .then((element: JQuery<HTMLElement>) => {
      const status = element.text();
      cy.log(status);
      // expect(status).to.eq('Cancelled') uncomment when GH-7277 gets fixed
    });
};
