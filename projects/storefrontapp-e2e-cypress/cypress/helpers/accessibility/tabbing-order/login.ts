import {
  getFormFieldByValue,
  checkAllElements,
  TabElement,
} from '../tabbing-order';
import { fillLoginForm } from '../../auth-forms';
import { user } from '../../../sample-data/checkout-flow';

export function loginTabbingOrder(config: TabElement[], prefillForm: boolean = false) {
  cy.visit('/login');
  if (prefillForm) {
    const { email: username, password } = user;
    fillLoginForm({ username, password });
  }
  getFormFieldByValue(config[0].value).focus();

  checkAllElements(config);
}
