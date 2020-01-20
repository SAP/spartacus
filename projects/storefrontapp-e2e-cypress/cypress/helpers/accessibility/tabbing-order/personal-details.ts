import { getFormFieldByValue, checkAllElements } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

export function personalDetailsTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/update-profile');
  getFormFieldByValue(config[0].value).focus();

  checkAllElements(config);
}
