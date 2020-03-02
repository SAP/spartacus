import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function closeAccountTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/close-account');

  verifyTabbingOrder(containerSelector, config);
}
