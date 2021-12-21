import { visitHomePage } from '../../../helpers/checkout-flow';
import * as login from '../../../helpers/login';
import * as paymentMethods from '../../../helpers/payment-methods';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Payment Methods', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      visitHomePage();
    });

    describe('Anonymous user', () => {
      it('should redirect user to login page', () => {
        cy.visit('/my-account/payment-details');
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('Authenticated user', () => {
      before(() => {
        visitHomePage();
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
      });

      paymentMethods.testRenderEmptyPaymentDetailsPage();
      paymentMethods.testRenderOnePaymentMethod();

      afterEach(() => {
        cy.saveLocalStorage();
      });

      after(() => {
        login.signOutUser();
      });
    });
  });
});
