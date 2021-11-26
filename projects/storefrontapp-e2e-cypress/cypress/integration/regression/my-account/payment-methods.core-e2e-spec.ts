import { addProductFromPdp, loginRegisteredUser } from '../../../helpers/cart';
import { visitHomePage } from '../../../helpers/checkout-flow';
import * as login from '../../../helpers/login';
import {
  addPaymentMethod,
  testPaymentDetail,
  verifyPaymentCard,
  visitPaymentDetailsPage,
} from '../../../helpers/payment-methods';
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

      it('should render empty payment details page', () => {
        loginRegisteredUser();
        visitPaymentDetailsPage();
        cy.get('cx-payment-methods').within(() => {
          cy.get('.cx-payment .cx-header').should('contain', 'Payment methods');
          cy.get('.cx-payment .cx-body').should(
            'contain',
            'New payment methods are added during checkout.'
          );
        });
      });

      it('should render page with only one payment methods', () => {
        addProductFromPdp();
        addPaymentMethod(testPaymentDetail[0]);
        visitPaymentDetailsPage();
        verifyPaymentCard(1);
      });
      
      afterEach(() => {
        cy.saveLocalStorage();
      });

      after(() => {
        login.signOutUser();
      });
    });
  });
});
