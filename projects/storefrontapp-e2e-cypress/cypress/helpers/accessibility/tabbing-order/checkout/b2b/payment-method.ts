import {
  enterPONumber,
  selectAccountPayment,
} from '../../../../b2b/b2b-checkout';
import { waitForPage } from '../../../../checkout-flow';
import { verifyTabbingOrder } from '../../../tabbing-order';
import { TabElement } from '../../../tabbing-order.model';

const containerSelector = 'cx-page-layout.MultiStepCheckoutSummaryPageTemplate';

export function checkoutPaymentMethodTabbingOrder(
  config: TabElement[],
  selectAccount: boolean = false
) {
  const paymentTypePage = waitForPage(
    '/checkout/payment-type',
    'getPaymentType'
  );
  cy.visit('/checkout/payment-type');
  cy.wait(`@${paymentTypePage}`).its('status').should('eq', 200);
  enterPONumber();

  if (selectAccount) {
    selectAccountPayment();
  }

  verifyTabbingOrder(containerSelector, config);
}
