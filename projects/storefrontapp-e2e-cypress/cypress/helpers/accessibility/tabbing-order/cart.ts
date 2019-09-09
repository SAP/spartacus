import { checkAllElements, TabElement } from '../tabbing-order';

export function cartTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/close-account');
  cy.get('cx-close-account a.btn.btn-secondary')
    .first()
    .focus();

  checkAllElements(config);
}
