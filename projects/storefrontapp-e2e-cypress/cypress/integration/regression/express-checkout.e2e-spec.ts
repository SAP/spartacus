import { CheckoutConfig } from '@spartacus/storefront';

import * as checkout from '../../helpers/checkout-flow';

context('Express checkout', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.cxConfig({ checkout: { express: true } } as CheckoutConfig);
    cy.visit('/');
  });

  describe('should redirect to first step if there are missing address and payment', () => {
    it('go to checkout', () => {
      checkout.registerUser();
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndLogin();
    });

    it('fill address form', () => {
      checkout.fillAddressFormWithCheapProduct();
    });

    it('choose delivery', () => {
      checkout.chooseDeliveryMethod();
    });

    it('fill in payment form with billing address same as shipping address', () => {
      checkout.fillPaymentFormWithCheapProduct();
    });

    it('should redirect to review order page', () => {
      checkout.verifyReviewOrderPage();
    });
  });

  describe('should redirect to last step if there are address and payment', () => {
    it('open cart', () => {
      cy.get('cx-mini-cart').click();
    });

    it('click proceed to checkout', () => {
      cy.getByText(/proceed to checkout/i).click();
    });

    it('should redirect to review order page', () => {
      checkout.verifyReviewOrderPage();
      cy.get('.cx-review-card-shipping').should('contain', 'Standard Delivery');
    });
  });

  describe('should setup express checkout with another preferred delivery mode', () => {
    it('open cart', () => {
      cy.cxConfig({
        checkout: {
          defaultDeliveryMode: ['MOST_EXPENSIVE'],
        },
      } as CheckoutConfig);
      cy.visit('/');
      cy.get('cx-mini-cart').click();
    });

    it('click proceed to checkout', () => {
      cy.getByText(/proceed to checkout/i).click();
    });

    it('should redirect to review order page', () => {
      checkout.verifyReviewOrderPage();
      cy.get('.cx-review-card-shipping').should('contain', 'Premium Delivery');
    });
  });

  describe('should redirect to first step if there is missing payment', () => {
    it('delete payment', () => {
      cy.selectUserMenuOption({
        option: 'Payment Details',
      });
      cy.getAllByText('Delete')
        .first()
        .click({ force: true });
      cy.get('.btn-primary').click({ force: true });
    });

    it('open cart', () => {
      cy.get('cx-mini-cart').click();
    });

    it('click proceed to checkout', () => {
      cy.getByText(/proceed to checkout/i).click();
    });

    it('should verify Shipping Address', () => {
      cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
    });
  });
});
