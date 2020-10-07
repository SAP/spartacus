import { waitForPage } from '../../../checkout-flow';
import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = 'cx-page-layout.MultiStepCheckoutSummaryPageTemplate';

export function checkoutReviewOrderTabbingOrder(
  config: TabElement[],
  checkout: boolean = false
) {
  cy.findAllByText(/I am confirming that I have read and agreed with/i)
    .first()
    .parent()
    .within(() => {
      cy.get('input').click();
    });

  verifyTabbingOrder(containerSelector, config);

  if (checkout) {
    const orderConfirmationPage = waitForPage(
      '/order-confirmation',
      'getOrderConfirmationPage'
    );
    cy.get('cx-place-order button.btn-primary').click();
    cy.wait(`@${orderConfirmationPage}`).its('status').should('eq', 200);
  }
}
