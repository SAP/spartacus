import { CMS_DELIVERY_PAGE } from '../../../interceptors';
import { checkoutNextStep, verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = 'cx-page-layout.MultiStepCheckoutSummaryPageTemplate';

export function checkoutDeliveryModeTabbingOrder(config: TabElement[]) {
  cy.visit('/checkout/delivery-mode');

  cy.wait(CMS_DELIVERY_PAGE).its('response.statusCode').should('eq', 200);

  cy.get('cx-delivery-mode input').should('exist');

  verifyTabbingOrder(containerSelector, config);

  checkoutNextStep('/checkout/payment-details');
}

export function checkoutDeliveryModeTabbingOrderAccount(config: TabElement[]) {
  cy.visit('/checkout/delivery-mode');
  cy.wait(CMS_DELIVERY_PAGE).its('response.statusCode').should('eq', 200);

  cy.get('cx-delivery-mode input').should('exist');

  verifyTabbingOrder(containerSelector, config);

  checkoutNextStep('/checkout/review-order');
}
