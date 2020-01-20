import { getFormFieldByValue, checkAllElements } from '../tabbing-order';
import { fillLoginForm } from '../../auth-forms';
import { user } from '../../../sample-data/checkout-flow';
import { TabElement } from '../tabbing-order.model';

export function loginTabbingOrder(
  config: TabElement[],
  prefillForm: boolean = false
) {
  cy.visit('/login');
  if (prefillForm) {
    const { email: username, password } = user;
    fillLoginForm({ username, password });
  }
  getFormFieldByValue(config[0].value).focus();

  checkAllElements(config);
}
