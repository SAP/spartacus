import { addProductFromPdp, loginRegisteredUser } from '../../../helpers/cart';
import { visitHomePage } from '../../../helpers/checkout-flow';
import * as alerts from '../../../helpers/global-message';
import * as login from '../../../helpers/login';
import {
  addPaymentMethod,
  testPaymentDetail,
  verifyPaymentCard,
  visitPaymentDetailsPage,
} from '../../../helpers/payment-methods';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Payment Methods', () => {
  viewportContext(['mobile', 'desktop'], () => {
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

      it('should render page with two payment methods', () => {
        cy.get('cx-mini-cart > a').click({ force: true });
        addPaymentMethod(testPaymentDetail[1]);
        visitPaymentDetailsPage();
        verifyPaymentCard(2);
      });

      it('should set additional payment method as default', () => {
        cy.intercept({
          method: 'GET',
          pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/users/*/paymentdetails`,
          query: {
            lang: 'en',
            curr: 'USD',
          },
        }).as('paymentDetails');

        cy.get('cx-payment-methods')
          .findByText('Set as default')
          .click({ force: true });

        cy.wait('@paymentDetails').its('response.statusCode').should('eq', 200);
        alerts
          .getSuccessAlert()
          .contains('New payment was sucessfully set as default');
        const firstCard = cy.get('.cx-payment-card').first();
        firstCard.should('contain', '✓ DEFAULT');
        firstCard.should('contain', '1234');
        firstCard.should('contain', `Expires: 03/2126`);
      });

      it('should be able to delete payment method', () => {
        cy.findAllByText('Delete').first().click({ force: true });

        // should see confirmation message
        cy.get('.cx-card-delete-msg').should(
          'contain',
          'Are you sure you want to delete this payment method?'
        );

        cy.get('.btn-secondary').should('contain', 'Cancel');
        cy.get('.btn-secondary').click({ force: true });
        cy.get('.cx-card-body__delete-ms').should('not.exist');

        // delete the payment
        cy.findAllByText('Delete').first().click({ force: true });
        cy.get('.btn-primary').should('contain', 'Delete');
        cy.get('.btn-primary').click({ force: true });
        cy.get('.cx-payment-card').should('have.length', 1);

        // verify remaining address is now the default one
        const defaultCard = cy.get('.cx-payment-card');
        defaultCard.should('contain', '✓ DEFAULT');
        defaultCard.should('contain', 'test user');
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
