import { tabbingOrderConfig } from '../../../helpers/accessibility/tabbing-order.config';
import {
  getFormFieldByValue,
  checkAllElements,
} from '../../../helpers/accessibility/tabbing-order';
import { registerUser } from '../../../helpers/register';
import { user } from '../../../sample-data/checkout-flow';
import { loginUser } from '../../../helpers/login';

context('Change Password page', () => {
  describe('tabbing order', () => {
    before(() => {
      cy.visit('/');
      registerUser(user);
      loginUser();
      cy.visit('/my-account/update-password');
      getFormFieldByValue(tabbingOrderConfig.changePassword[0].value).focus(); // focus the first element
    });

    checkAllElements(tabbingOrderConfig.changePassword);
  });
});
