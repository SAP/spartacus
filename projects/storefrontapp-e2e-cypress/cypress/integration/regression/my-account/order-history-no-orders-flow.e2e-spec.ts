import * as loginHelper from '../../../helpers/login';
import { orderHistoryTest } from '../../../helpers/order-history';
import { verifyGlobalMessageAfterRegistration } from '../../../helpers/register';

describe('Order History with no orders', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/');
    loginHelper.registerUser();
    verifyGlobalMessageAfterRegistration();
  });

  orderHistoryTest.checkRedirectNotLoggedInUser();
  orderHistoryTest.checkRedirectLoggedInUser();
  orderHistoryTest.checkStartShoppingButton();
});
