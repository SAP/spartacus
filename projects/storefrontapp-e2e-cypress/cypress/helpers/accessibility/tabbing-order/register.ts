import {
  getFormFieldByValue,
  checkAllElements,
  TabElement,
} from '../tabbing-order';

export function registerTabbingOrder(config: TabElement[]) {
  cy.visit('/login/register');
  getFormFieldByValue(config[0].value).focus(); // focus the first element
  checkAllElements(config);
}
