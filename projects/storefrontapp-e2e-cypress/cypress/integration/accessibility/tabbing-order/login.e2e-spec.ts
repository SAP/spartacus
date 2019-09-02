import { tabbingOrderConfig } from '../../../helpers/accessibility/tabbing-order.config';
import {
  getFormFieldByValue,
  checkAllElements,
} from '../../../helpers/accessibility/tabbing-order';

context('Login page', () => {
  describe.only('tabbing order', () => {
    before(() => {
      cy.visit('/login');
      getFormFieldByValue(tabbingOrderConfig.login[0].value).focus(); // focus the first element
    });

    checkAllElements(tabbingOrderConfig.login);
  });
});
