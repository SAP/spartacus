import { checkAllElements, TabElement } from '../tabbing-order';

export function homeTabbingOrder(config: TabElement[]) {
  cy.visit('/');
  cy.get('.Section1 a')
    .first()
    .focus();

  checkAllElements(config);
}
