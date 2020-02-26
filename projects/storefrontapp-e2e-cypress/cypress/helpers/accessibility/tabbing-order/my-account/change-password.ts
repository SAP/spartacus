import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function changePasswordTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/update-password');

  verifyTabbingOrder(containerSelector, config);
}
