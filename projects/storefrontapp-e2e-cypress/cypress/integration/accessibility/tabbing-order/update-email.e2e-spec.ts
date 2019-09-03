import { tabbingOrderConfig } from '../../../helpers/accessibility/tabbing-order.config';
import {
  getFormFieldByValue,
  checkAllElements,
} from '../../../helpers/accessibility/tabbing-order';
import { registerUser } from '../../../helpers/register';
import { user } from '../../../sample-data/checkout-flow';
import { loginUser } from '../../../helpers/login';

context('Update Email page', () => {
  describe('tabbing order', () => {
    before(() => {
      cy.visit('/');
      registerUser(user);
      loginUser();
      cy.visit('/electronics-spa/en/USD/my-account/update-email');
      getFormFieldByValue(tabbingOrderConfig.updateEmail[0].value).focus(); // focus the first element
    });

    checkAllElements(tabbingOrderConfig.updateEmail);
  });
});
