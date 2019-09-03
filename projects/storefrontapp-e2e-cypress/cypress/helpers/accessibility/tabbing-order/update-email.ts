import {
  getFormFieldByValue,
  checkAllElements,
  TabElement,
} from '../tabbing-order';

export function updateEmailTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/update-email');
  getFormFieldByValue(config[0].value).focus(); // focus the first element

  checkAllElements(config);
}
