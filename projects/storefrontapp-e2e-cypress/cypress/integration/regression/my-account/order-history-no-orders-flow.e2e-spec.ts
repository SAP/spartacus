import { clickHamburger } from '../../../helpers/homepage';
import * as userAccountHelpers from '../../../helpers/login';
import { orderHistoryTest } from '../../../helpers/order-history';
import { verifyGlobalMessageAfterRegistration } from '../../../helpers/register';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

describe('Order History with no orders', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      clearAllStorage();
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
