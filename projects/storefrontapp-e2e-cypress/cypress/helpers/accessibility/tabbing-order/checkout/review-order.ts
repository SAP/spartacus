import { checkAllElements, TabElement } from '../../tabbing-order';

export function checkoutReviewOrderTabbingOrder(config: TabElement[]) {
  cy.visit('/checkout/review-order');

  cy.getAllByText(/I am confirming that I have read and agreed with/i)
    .first()
    .parent()
    .within(() => {
      cy.get('input').click();
    });

  cy.getAllByText(/Edit shipping address/i)
    .first()
    .focus();

  checkAllElements(config);
}
