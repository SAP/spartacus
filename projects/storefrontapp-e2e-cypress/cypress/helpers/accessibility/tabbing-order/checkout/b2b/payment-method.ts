import { enterPONumber } from '../../../../b2b/b2b-checkout';
import { waitForPage } from '../../../../checkout-flow';
import { checkoutNextStep, verifyTabbingOrder } from '../../../tabbing-order';
import { TabElement } from '../../../tabbing-order.model';

const containerSelector = 'cx-payment-type';

export function checkoutPaymentMethodTabbingOrder(config: TabElement[]) {
  const paymentTypePage = waitForPage(
    '/checkout/payment-type',
    'getPaymentType'
  );
  cy.visit('/checkout/payment-type');
  enterPONumber();
  cy.wait(`@${paymentTypePage}`).its('status').should('eq', 200);

  verifyTabbingOrder(containerSelector, config);
  checkoutNextStep('/checkout/shipping-address');
}
