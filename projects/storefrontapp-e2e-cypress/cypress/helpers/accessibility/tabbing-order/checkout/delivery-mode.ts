import { checkoutNextStep, verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = 'cx-page-layout.MultiStepCheckoutSummaryPageTemplate';

export function checkoutDeliveryModeTabbingOrder(config: TabElement[]) {
  cy.get('cx-delivery-mode input');

  verifyTabbingOrder(containerSelector, config);

  cy.server();

  cy.route(
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/cardtypes*`
  ).as('cardTypes');
  cy.route(
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/countries?type=BILLING*`
  ).as('countries');

  checkoutNextStep('/checkout/payment-details');

  cy.wait('@cardTypes');
  cy.wait('@countries');
}

export function checkoutDeliveryModeTabbingOrderAccount(config: TabElement[]) {
  cy.get('cx-delivery-mode input');

  verifyTabbingOrder(containerSelector, config);
  checkoutNextStep('/checkout/review-order');
}
