import * as loginHelper from '../../../helpers/login';
import { orderHistoryTest } from '../../../helpers/order-history';

describe('Order History with no orders', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
    loginHelper.registerUser();
    loginHelper.signOutUser();
  });

  orderHistoryTest.checkRedirectNotLoggedInUser();
  orderHistoryTest.checkRedirectLoggedInUser();
  orderHistoryTest.checkStartShoppingButton();
});
