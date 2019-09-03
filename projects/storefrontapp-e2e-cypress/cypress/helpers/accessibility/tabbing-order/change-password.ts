import {
  getFormFieldByValue,
  checkAllElements,
  TabElement,
} from '../tabbing-order';

export function changePasswordTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/update-password');
  getFormFieldByValue(config[0].value).focus(); // focus the first element

  checkAllElements(config);
}
