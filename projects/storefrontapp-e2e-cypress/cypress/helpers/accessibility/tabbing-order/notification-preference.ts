import { checkAllElements, TabElement } from '../tabbing-order';

export function notificationPreferenceTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/notification-preference');
  cy.get('.cx-np-checkbox').first().focus();
  checkAllElements(config);
}
