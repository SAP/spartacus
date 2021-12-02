import { CheckoutConfig } from '@spartacus/storefront';
import * as checkout from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import { getSampleUser } from '../../../sample-data/checkout-flow';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import * as expressCheckout from '../../../helpers/express-checkout';

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

    expressCheckout.testExpressCheckout(user);
  });
});
