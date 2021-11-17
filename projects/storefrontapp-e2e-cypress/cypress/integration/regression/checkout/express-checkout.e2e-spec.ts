import { CheckoutConfig } from '@spartacus/storefront';
import * as checkout from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import { getSampleUser } from '../../../sample-data/checkout-flow';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Express checkout', () => {
  viewportContext(['mobile', 'desktop'], () => {
    let user;

    before(() => {
      clearAllStorage();
      cy.cxConfig({ checkout: { express: true } } as CheckoutConfig);
      user = getSampleUser();
      Cypress.log({
        name: 'expressCheckoutLog',
        displayName: 'expressCheckoutLog',
        message: [`Creating/setting test user: ${user.email}`],
      });

      checkout.visitHomePage();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it('should go to first step of checkout when there is no default address/payment', () => {
      checkout.clickHamburger();

      checkout.registerUser(false, user);
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndLogin(user);

      cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
    });

    it('should skip address and payment checkout steps once address and payment are set', () => {
      checkout.fillAddressFormWithCheapProduct();
      checkout.verifyDeliveryMethod();
      checkout.fillPaymentFormWithCheapProduct();
      checkout.verifyReviewOrderPage();

      cy.get('cx-mini-cart').click();

      cy.findByText(/proceed to checkout/i).click();

      checkout.verifyReviewOrderPage();
      cy.get('.cx-review-card-shipping').should('contain', 'Standard Delivery');
    });

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
      cy.get('.cx-review-card-shipping').should('contain', 'Premium Delivery');
    });

    it('should redirect to first step if payment method is not set', () => {
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
