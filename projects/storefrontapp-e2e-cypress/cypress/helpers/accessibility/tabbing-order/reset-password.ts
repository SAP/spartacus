import { getFormFieldByValue, checkAllElements } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

export function forgotPasswordTabbingOrder(config: TabElement[]) {
  cy.visit('/login/forgot-password');
  getFormFieldByValue(config[0].value).focus();

  checkAllElements(config);
}
