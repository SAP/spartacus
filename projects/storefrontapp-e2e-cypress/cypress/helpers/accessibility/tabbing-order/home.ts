import { verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

const containerSelector = '.LandingPage2Template';

export function homeTabbingOrder(config: TabElement[]) {
  cy.visit('/');

  // Ensures carousel products are loaded before running checks
  cy.get('cx-carousel').find('img').should('have.length', 18);

  verifyTabbingOrder(containerSelector, config);
}
