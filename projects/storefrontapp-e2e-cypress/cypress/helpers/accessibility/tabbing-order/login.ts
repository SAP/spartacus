import {
  getFormFieldByValue,
  checkAllElements,
  TabElement,
} from '../tabbing-order';

export function loginTabbingOrder(config: TabElement[]) {
  cy.visit('/login');
  getFormFieldByValue(config[0].value).focus();

  checkAllElements(config);
}
