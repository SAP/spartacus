import { user } from '../../../../sample-data/checkout-flow';
import {
  fillBillingAddress,
  fillPaymentDetails,
} from '../../../checkout-forms';
import { baseEndpoint } from '../../../constants/backend';
import { checkoutNextStep, verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.MultiStepCheckoutSummaryPageTemplate';

export function checkoutPaymentDetailsTabbingOrder(config: TabElement[]) {
  cy.server();
  cy.visit('/checkout/payment-details');

  cy.route(`${baseEndpoint}/cardtypes*`).as('cardTypes');
  cy.route(`${baseEndpoint}/countries?type=BILLING*`).as('countries');

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
