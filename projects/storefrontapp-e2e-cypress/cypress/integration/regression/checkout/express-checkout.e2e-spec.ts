import { CheckoutConfig } from '@spartacus/storefront';
import * as checkout from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import { getSampleUser } from '../../../sample-data/checkout-flow';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import * as expressCheckout from '../../../helpers/express-checkout';

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

    expressCheckout.testExpressCheckout(user);

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
