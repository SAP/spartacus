import { user } from '../sample-data/big-happy-path';
import {
  fillShippingAddress,
  fillPaymentDetails
} from '../helpers/checkout-forms';

describe('Payment Methods', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  it('should redirect to login page for anonymouse user', () => {
    cy.visit('/my-account/payment-details');
    cy.location('pathname').should('contain', '/login');
  });

  describe('should go to payment details page for login user', () => {
    before(() => {
      cy.requireLoggedIn();
    });

    it('should see spinner when loading', () => {
      cy.visit('/my-account/payment-details');

      cy.get('cx-payment-methods .cx-body').then(() =>
        cy.get('cx-spinner').should('exist')
      );
    });

    it('should see title and some messages', () => {
      cy.get('cx-payment-methods').within(() => {
        cy.get('.cx-payment .cx-header').should('contain', 'Payment methods');
        cy.get('.cx-payment .cx-body').should(
          'contain',
          'New payment methods are added during checkout.'
        );
      });
    });

    it('should see payment method card', () => {
      // go to product page
      const productId = '3595723';
      cy.visit(`/product/${productId}`);

      // add product to cart and go to checkout
      cy.get('cx-product-summary cx-add-to-cart button').click();
      cy.get('cx-added-to-cart-dialog').within(() => {
        cy.getByText(/proceed to checkout/i).click();
      });

      // go to shipping address
      fillShippingAddress(user);

      // set delivery method
      cy.get('#deliveryMode-standard-gross').check();
      cy.get('button.btn-primary').click();

      // fill in payment method
      fillPaymentDetails(user);

      // go to payment details page
      cy.get('cx-review-submit', { timeout: 50000 });

      cy.visit('/my-account/payment-details');
      cy.get('.cx-payment .cx-body').then(() => {
        cy.get('cx-card').should('exist');
      });
    });

    it('should be able to delete the payment', () => {
      cy.get('.card-link').should('have.text', 'Delete');
      cy.get('.card-link').click();

      // should see confirmation message
      cy.get('cx-card').should(
        'contain',
        'Are you sure you want to delete this payment method?'
      );

      // click cancel
      cy.get('.btn-secondary').should('contain', 'cancel');
      cy.get('.btn-secondary').click();
      cy.get('cx-card').should(
        'not.contain',
        'Are you sure you want to delete this payment method?'
      );
      cy.get('.card-link').should('exist');

      // delete the payment
      cy.get('.card-link').click();
      cy.get('.btn-primary').should('contain', 'delete');
      cy.get('.btn-primary').click();
      cy.get('.cx-payment .cx-body').then(() => {
        cy.get('cx-card').should('not.exist');
      });
    });
  });
});
