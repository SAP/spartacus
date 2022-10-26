import { CheckoutConfig } from '@spartacus/storefront';
import * as checkout from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import * as expressCheckout from '../../../helpers/express-checkout';

context('Express checkout', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  });
  viewportContext(['desktop'], () => {
    before(() => {
      clearAllStorage();
      cy.cxConfig({ checkout: { express: true } } as CheckoutConfig);
      checkout.visitHomePage();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });
    expressCheckout.testExpressCheckout();
  });
});
