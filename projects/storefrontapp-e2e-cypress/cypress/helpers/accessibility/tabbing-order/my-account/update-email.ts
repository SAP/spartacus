import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function updateEmailTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/update-email');

  verifyTabbingOrder(containerSelector, config);
}
