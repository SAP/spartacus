import { checkAllElements, TabElement } from '../../tabbing-order';

export function notificationPreferenceTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/notification-preference');
  cy.get('.form-check-input')
    .first()
    .focus();
  checkAllElements(config);
}
