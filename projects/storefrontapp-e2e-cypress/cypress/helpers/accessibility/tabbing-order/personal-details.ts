import {
  getFormFieldByValue,
  checkAllElements,
  TabElement,
} from '../tabbing-order';

export function personalDetailsTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/update-profile');
  getFormFieldByValue(config[0].value).focus();

  checkAllElements(config);
}
