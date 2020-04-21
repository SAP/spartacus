import { user } from '../../../../sample-data/checkout-flow';
import {
  fillBillingAddress,
  fillPaymentDetails,
} from '../../../checkout-forms';
import { checkoutNextStep, verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.MultiStepCheckoutSummaryPageTemplate';

export function checkoutPaymentDetailsTabbingOrder(config: TabElement[]) {
  cy.server();
  cy.visit('/checkout/payment-details');

  cy.route(
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/cardtypes*`
  ).as('cardTypes');
  cy.route(
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/countries?type=BILLING*`
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
