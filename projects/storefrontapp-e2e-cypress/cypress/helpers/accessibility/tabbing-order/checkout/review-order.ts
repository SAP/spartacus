import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = 'cx-page-layout.MultiStepCheckoutSummaryPageTemplate';

export function checkoutReviewOrderTabbingOrder(config: TabElement[]) {
  cy.visit('/checkout/review-order');

  cy.getAllByText(/I am confirming that I have read and agreed with/i)
    .first()
    .parent()
    .within(() => {
      cy.get('input').click();
    });

  verifyTabbingOrder(containerSelector, config);
}
