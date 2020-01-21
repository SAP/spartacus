import { checkAllElements, TabElement, getFormFieldByValue } from '../tabbing-order';

export function notificationPreferenceTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/notification-preference');
  getFormFieldByValue(config[0].value).focus();
  checkAllElements(config);
}

