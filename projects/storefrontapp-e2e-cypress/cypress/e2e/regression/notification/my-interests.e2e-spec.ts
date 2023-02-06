import * as notification from '../../../helpers/notification';
import * as orderDetail from '../../../helpers/consignment-tracking';
import { viewportContext } from '../../../helpers/viewport-context';

describe('My interests', () => {
  viewportContext(['mobile'], () => {
    describe('Customer', () => {
      beforeEach(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        cy.requireLoggedIn();
        cy.visit('/');
        notification.enableNotificationChannel();
      });

      // Core test. Retest in mobile view.
      it('should show/remove interest', () => {
        notification.verifyCustomerInterests();
      });

      // Core test. Retest in mobile view.
      it('should remove the subscrption in PDP', () => {
        notification.verifyRemovingCustomerInterestInPDP();
      });
    });
  });
  viewportContext(['mobile', 'desktop'], () => {
    describe('Guest', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
      });

      it('should redirect to login page for anonymous user', () => {
        cy.visit('/my-account/my-interests');
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('Customer with interests', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        cy.requireLoggedIn();
        orderDetail.loginUsingUserWithOrder();
      });

      it('should page and sort', () => {
        notification.verifyPagingAndSorting();
      });
    });
  });
});
