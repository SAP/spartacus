import { verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function registerTabbingOrder(config: TabElement[]) {
  cy.visit('/login/register');

  verifyTabbingOrder(containerSelector, config);
}
