import {
  getFormFieldByValue,
  checkAllElements,
  TabElement,
} from '../tabbing-order';

export function forgotPasswordTabbingOrder(config: TabElement[]) {
  cy.visit('/login/forgot-password');
  getFormFieldByValue(config[0].value).focus();

  checkAllElements(config);
}
