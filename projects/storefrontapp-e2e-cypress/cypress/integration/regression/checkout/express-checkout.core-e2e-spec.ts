import { CheckoutConfig } from '@spartacus/storefront';
import * as checkout from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import { getSampleUser } from '../../../sample-data/checkout-flow';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Express checkout', () => {
  viewportContext(['desktop'], () => {
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
  });
});
