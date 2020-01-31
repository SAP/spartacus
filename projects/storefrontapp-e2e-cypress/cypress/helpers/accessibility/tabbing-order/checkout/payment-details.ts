import { checkoutNextStep, verifyTabbingOrder } from '../../tabbing-order';
import {
  fillPaymentDetails,
  fillBillingAddress,
} from '../../../checkout-forms';
import { user } from '../../../../sample-data/checkout-flow';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.MultiStepCheckoutSummaryPageTemplate';

export function checkoutPaymentDetailsTabbingOrder(config: TabElement[]) {
  cy.server();
  cy.visit('/checkout/payment-details');

  cy.route(`${Cypress.env('API_URL')}/rest/v2/electronics-spa/cardtypes*`).as(
    'cardTypes'
  );
  cy.route(
    `${Cypress.env('API_URL')}/rest/v2/electronics-spa/countries?type=BILLING*`
  ).as('countries');

  cy.wait('@cardTypes');
  cy.wait('@countries');

  const { payment, fullName } = user;
  fillPaymentDetails({ payment, fullName }, null, false);

  verifyTabbingOrder(containerSelector, config);
}

export function checkoutBillingAddressTabbingOrder(config: TabElement[]) {
  const { firstName, lastName, phone, address } = user;
  fillBillingAddress({ firstName, lastName, phone, address });

  verifyTabbingOrder(containerSelector, config);
  checkoutNextStep('/checkout/review-order');
}
