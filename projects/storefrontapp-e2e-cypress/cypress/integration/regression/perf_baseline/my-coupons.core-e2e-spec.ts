import * as myCoupons from '../../../helpers/coupons/my-coupons';
import { viewportContext } from '../../../helpers/viewport-context';

viewportContext(['desktop'], () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  });
  describe('My coupons - Authenticated user', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      cy.requireLoggedIn();
    });

    myCoupons.testClaimCustomerCoupon();
  });
});
