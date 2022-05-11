import * as userAccountHelpers from '../../../helpers/login';
import { clickHamburger } from '../../../helpers/homepage';
import { orderHistoryTest } from '../../../helpers/order-history';
import { verifyGlobalMessageAfterRegistration } from '../../../helpers/register';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Order History with no orders', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
      cy.onMobile(() => {
        clickHamburger();
      });
      userAccountHelpers.registerUser();
      verifyGlobalMessageAfterRegistration();
    });

    it(['order_history','my_account'], 'should validate order history with no orders functionality', () => {
      orderHistoryTest.checkRedirectNotLoggedInUser();
      orderHistoryTest.checkRedirectLoggedInUser();
      orderHistoryTest.checkStartShoppingButton();
    });
  });
});
