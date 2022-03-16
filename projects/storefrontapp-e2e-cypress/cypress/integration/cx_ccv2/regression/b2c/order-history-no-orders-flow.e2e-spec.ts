import { clickHamburger } from '../../../../helpers/homepage';
import * as userAccountHelpers from '../../../../helpers/login';
import { orderHistoryTest } from '../../../../helpers/order-history';
import { verifyGlobalMessageAfterRegistration } from '../../../../helpers/register';
import { viewportContext } from '../../../../helpers/viewport-context';

describe('Order History with no orders', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
      cy.onMobile(() => {
        clickHamburger();
      });
      userAccountHelpers.registerUser();
      verifyGlobalMessageAfterRegistration();
    });

    orderHistoryTest.checkRedirectNotLoggedInUser();
    orderHistoryTest.checkRedirectLoggedInUser();
    orderHistoryTest.checkStartShoppingButton();
  });
});
