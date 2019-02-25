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

    it('should see title and some messages', () => {
      cy.visit('/my-account/payment-details');

      cy.get('cx-payment-methods').within(() => {
        cy.get('.cx-payment .cx-header').should('contain', 'Payment methods');
        cy.get('.cx-payment .cx-body').should(
          'contain',
          'New payment methods are added during checkout.'
        );
      });
    });

    it('should see spinner when loading', () => {});

    it('should see payment method card', () => {
      // go to product page
      const productId = '3595723';
      cy.visit(`/product/${productId}`);

      // add product to cart and go to checkout
      cy.get('cx-product-summary cx-add-to-cart button').click();
      cy.get('cx-added-to-cart-dialog').within(() => {
        cy.getByText(/proceed to checkout/i).click();
      });

      // fill in shipping address and payment methods
      fillShippingAddress(user);
      cy.get('#deliveryMode-standard-gross').check();
      cy.get('button.btn-primary').click();
      fillPaymentDetails(user);

      // go to payment details page
      cy.get('cx-review-submit', { timeout: 50000 }).then(() => {
        cy.visit('/my-account/payment-details');
        cy.get('cx-card').should('exist');
      });
    });
  });
});
