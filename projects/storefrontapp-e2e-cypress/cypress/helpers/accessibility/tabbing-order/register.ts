import {
  getFormFieldByValue,
  checkAllElements,
  TabElement,
} from '../tabbing-order';
import { fillRegistrationForm } from '../../auth-forms';
import { user } from '../../../sample-data/checkout-flow';

export function registerTabbingOrder(config: TabElement[]) {
  cy.visit('/electronics-spa/en/USD/login/register');
  fillRegistrationForm(user); // fill form to enable submit button
  getFormFieldByValue(config[0].value).focus(); // focus the first element
  checkAllElements(config);
}
