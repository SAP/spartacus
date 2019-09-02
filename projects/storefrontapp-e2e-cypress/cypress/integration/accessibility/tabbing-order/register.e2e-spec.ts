import { tabbingOrderConfig } from '../../../helpers/accessibility/tabbing-order.config';
import {
  getFormFieldByValue,
  checkAllElements,
} from '../../../helpers/accessibility/tabbing-order';
import { user } from '../../../sample-data/checkout-flow';
import { fillRegistrationForm } from '../../../helpers/auth-forms';

context('Register page', () => {
  describe('tabbing order', () => {
    before(() => {
      cy.visit('/electronics-spa/en/USD/login/register');
      fillRegistrationForm(user); // fill form to enable submit button
      getFormFieldByValue(tabbingOrderConfig.register[0].value).focus(); // focus the first element
    });

    checkAllElements(tabbingOrderConfig.register);
  });
});
