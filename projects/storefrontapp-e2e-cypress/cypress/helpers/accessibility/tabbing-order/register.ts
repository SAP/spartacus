import {
  getFormFieldByValue,
  checkAllElements,
  TabElement,
} from '../tabbing-order';
import { fillRegistrationForm } from '../../auth-forms';
import { user } from '../../../sample-data/checkout-flow';

export function registerTabbingOrder(
  config: TabElement[],
  prefillForm: boolean = false
) {
  cy.visit('/login/register');
  if (prefillForm) {
    fillRegistrationForm(user);
  }
  getFormFieldByValue(config[0].value).focus(); // focus the first element
  checkAllElements(config);
}
