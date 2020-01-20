import { getFormFieldByValue, checkAllElements } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

export function registerTabbingOrder(config: TabElement[]) {
  cy.visit('/login/register');
  getFormFieldByValue(config[0].value).focus(); // focus the first element
  checkAllElements(config);
}
