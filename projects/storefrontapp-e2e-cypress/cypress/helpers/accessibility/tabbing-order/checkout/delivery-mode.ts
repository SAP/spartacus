import { checkoutNextStep, verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = 'cx-page-layout.MultiStepCheckoutSummaryPageTemplate';

export function checkoutDeliveryModeTabbingOrder(config: TabElement[]) {
  cy.visit('/checkout/delivery-mode');

  cy.get('cx-delivery-mode input');

  verifyTabbingOrder(containerSelector, config);
  checkoutNextStep('/checkout/payment-details');
}
