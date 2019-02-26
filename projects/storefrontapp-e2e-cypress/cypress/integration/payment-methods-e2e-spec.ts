import { user } from '../sample-data/big-happy-path';
import {
  fillShippingAddress,
  fillPaymentDetails
} from '../helpers/checkout-forms';
import { standardUser } from '../sample-data/shared-users';

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
      cy.requireLoggedIn(standardUser);
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
      cy.get('.cx-payment .cx-body').then($body => {
        // if there is no payment method
        if (!$body.find('cx-card').length) {
          // go to product page
          const productId = '3595723';
          cy.visit(`/product/${productId}`);

          // add product to cart and go to checkout
          cy.get('cx-product-summary cx-add-to-cart button').click();
          cy.get('cx-added-to-cart-dialog').within(() => {
            cy.getByText(/proceed to checkout/i).click();
          });

          // go to shipping address
          cy.get('.cx-shipping-address').then($addressBody => {
            // after loading
            cy.get('.cx-shipping-address-spinner')
              .should('not.exist')
              .then(() => {
                // address exist, go to next step; otherwise fill in
                if ($addressBody.find('cx-card').length) {
                  cy.get('.card-link').click();
                  cy.get('button.btn-primary').click();
                } else {
                  fillShippingAddress(user);
                }
              });
          });

          // set delivery method
          cy.get('#deliveryMode-standard-gross').check();
          cy.get('button.btn-primary').click();

          // fill in payment method
          fillPaymentDetails(user);

          // go to payment details page
          cy.get('cx-review-submit', { timeout: 50000 }).then(() => {
            cy.visit('/my-account/payment-details');
            cy.get('cx-card').should('exist');
          });
        }
      });
    });
  });
});
