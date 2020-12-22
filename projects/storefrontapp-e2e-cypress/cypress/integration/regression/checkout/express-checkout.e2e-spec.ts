import { CheckoutConfig } from '@spartacus/storefront';
import * as checkout from '../../../helpers/checkout-flow';

context('Express checkout', () => {
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

  describe('should redirect to first step if there are missing address and payment', () => {
    it('go to checkout', () => {
      checkout.registerUser();
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndLogin();
    });

    it('should verify Shipping Address page', () => {
      cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
    });
  });

  describe('should redirect to last step if there are address and payment', () => {
    it('fill address form', () => {
      checkout.fillAddressFormWithCheapProduct();
    });

    it('choose delivery', () => {
      checkout.verifyDeliveryMethod();
    });

    it('fill in payment form with billing address same as shipping address', () => {
      checkout.fillPaymentFormWithCheapProduct();
    });

    it('should redirect to review order page', () => {
      checkout.verifyReviewOrderPage();
    });

    it('open cart', () => {
      cy.get('cx-mini-cart').click();
    });

    it('click proceed to checkout', () => {
      cy.findByText(/proceed to checkout/i).click();
    });

    it('should redirect to review order page with Standard Delivery', () => {
      checkout.verifyReviewOrderPage();
      cy.get('.cx-review-card-shipping').should('contain', 'Standard Delivery');
    });
  });

  describe('should setup express checkout with another preferred delivery mode', () => {
    it('setup most expensive delivery mode in config', () => {
      cy.cxConfig({
        checkout: {
          express: true,
          defaultDeliveryMode: ['MOST_EXPENSIVE'],
        },
      } as CheckoutConfig);
      cy.visit('/');
    });

    it('open cart', () => {
      cy.get('cx-mini-cart').click();
    });

    it('click proceed to checkout', () => {
      cy.findByText(/proceed to checkout/i).click();
    });

    it('should redirect to review order page with Premium Delivery', () => {
      checkout.verifyReviewOrderPage();
      cy.get('.cx-review-card-shipping').should('contain', 'Premium Delivery');
    });
  });

  describe('should redirect to first step if there is missing payment', () => {
    it('delete payment', () => {
      cy.selectUserMenuOption({
        option: 'Payment Details',
      });
      cy.findAllByText('Delete').first().click({ force: true });
      cy.get('.btn-primary').click({ force: true });
    });

    it('open cart', () => {
      cy.get('cx-mini-cart').click();
    });

    it('click proceed to checkout', () => {
      cy.findByText(/proceed to checkout/i).click();
    });

    it('should verify Shipping Address page', () => {
      cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
    });
  });
});
