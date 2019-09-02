import {
  checkAllElements,
  getFormFieldByValue,
} from '../../../helpers/accessibility/tabbing-order';
import { tabbingOrderConfig } from '../../../helpers/accessibility/tabbing-order.config';

context('Reset Password', () => {
  describe('tabbing order', () => {
    before(() => {
      cy.visit('/electronics-spa/en/USD/login/forgot-password');
      getFormFieldByValue(tabbingOrderConfig.resetPassword[0].value).focus();
    });

    checkAllElements(tabbingOrderConfig.resetPassword);
  });
});
