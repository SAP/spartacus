import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function notificationPreferenceTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/notification-preference');

  verifyTabbingOrder(containerSelector, config);
}
