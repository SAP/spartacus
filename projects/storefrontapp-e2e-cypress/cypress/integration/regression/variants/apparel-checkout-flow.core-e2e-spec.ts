import {
  APPAREL_BASESITE,
  configureProductWithVariants,
} from '../../../helpers/variants/apparel-checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import * as checkoutVariants from '../../../helpers/checkout-variants';

context('Apparel - checkout flow', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      Cypress.env('BASE_SITE', APPAREL_BASESITE);
      checkoutVariants.generateVariantGuestUser();
    });

    beforeEach(() => {
      configureProductWithVariants();
    });

    checkoutVariants.testCheckoutRegisteredUser();
  });
});
