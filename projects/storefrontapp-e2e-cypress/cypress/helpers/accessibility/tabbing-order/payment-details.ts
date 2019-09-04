import { checkAllElements, TabElement } from '../tabbing-order';

export function paymentDetailsTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/payment-details');
  cy.get('cx-payment-methods a')
    .first()
    .focus();

  checkAllElements(config);
}
