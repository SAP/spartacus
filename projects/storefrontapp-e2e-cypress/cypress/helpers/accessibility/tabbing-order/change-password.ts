import { getFormFieldByValue, checkAllElements } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

export function changePasswordTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/update-password');
  getFormFieldByValue(config[0].value).focus(); // focus the first element

  checkAllElements(config);
}
