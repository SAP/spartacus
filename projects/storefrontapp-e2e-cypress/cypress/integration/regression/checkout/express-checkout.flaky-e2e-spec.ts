import { CheckoutConfig } from '@spartacus/storefront';
import * as checkout from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';

context('Express checkout', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.cxConfig({ checkout: { express: true } } as CheckoutConfig);
      cy.visit('/');
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    describe('Missing address/payment', () => {
      it('should go to first step of checkout', () => {
        cy.onMobile(() => {
          cy.get('cx-hamburger-menu [aria-label="Menu"]').click();
        });

        checkout.registerUser();
        checkout.goToCheapProductDetailsPage();
        checkout.addCheapProductToCartAndLogin();

        cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
      });
    });

    describe('Existing address/payment', () => {
      it('should skip address and payment screens', () => {
        checkout.fillAddressFormWithCheapProduct();
        checkout.verifyDeliveryMethod();
        checkout.fillPaymentFormWithCheapProduct();
        checkout.verifyReviewOrderPage();

        cy.get('cx-mini-cart').click();

        cy.findByText(/proceed to checkout/i).click();

        checkout.verifyReviewOrderPage();
        cy.get('.cx-review-card-shipping').should(
          'contain',
          'Standard Delivery'
        );
      });
    });

    describe('Other delivery mode', () => {
      it('should setup express checkout with another preferred delivery mode', () => {
        cy.cxConfig({
          checkout: {
            express: true,
            defaultDeliveryMode: ['MOST_EXPENSIVE'],
          },
        } as CheckoutConfig);
        cy.visit('/');

        cy.get('cx-mini-cart').click();

        cy.findByText(/proceed to checkout/i).click();

        checkout.verifyReviewOrderPage();
        cy.get('.cx-review-card-shipping').should(
          'contain',
          'Premium Delivery'
        );
      });
    });

    describe('Missing payment method', () => {
      it('should redirect to first step if there is missing payment', () => {
        cy.selectUserMenuOption({
          option: 'Payment Details',
        });
        cy.findAllByText('Delete').first().click({ force: true });
        cy.get('.btn-primary').click({ force: true });

        cy.get('cx-mini-cart').click();
        cy.findByText(/proceed to checkout/i).click();
        cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
      });
    });
  });
});
