import { checkAllElements } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

export function homeTabbingOrder(config: TabElement[]) {
  cy.visit('/');

  // Ensures carousel products are loaded before running checks
  cy.get('cx-carousel')
    .find('img')
    .should('have.length', 18);

  cy.get('.Section1 a')
    .first()
    .focus();

  checkAllElements(config);
}
