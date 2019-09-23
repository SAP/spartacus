import {
  getFormFieldByValue,
  checkAllElements,
  TabElement,
} from '../tabbing-order';
import { fillLoginForm } from '../../auth-forms';
import { user } from '../../../sample-data/checkout-flow';

export function loginTabbingOrder(config: TabElement[]) {
  cy.visit('/login');
  getFormFieldByValue(config[0].value).focus();

  checkAllElements(config);
}
