import { getFormFieldByValue, checkAllElements } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

export function updateEmailTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/update-email');
  getFormFieldByValue(config[0].value).focus(); // focus the first element

  checkAllElements(config);
}
