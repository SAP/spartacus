import {
  APPAREL_BASESITE,
  configureProductWithVariants,
} from '../../../helpers/variants/apparel-checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import * as checkoutVariants from '../../../helpers/checkout-variants';
import { getApparelCheckoutUser } from '../../../sample-data/apparel-checkout-flow';

context('Apparel - checkout as guest', () => {
  let variantUser;
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      Cypress.env('BASE_SITE', APPAREL_BASESITE);
      variantUser = getApparelCheckoutUser();
    });

    beforeEach(() => {
      configureProductWithVariants();
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });
    checkoutVariants.testCheckoutVariantAsGuest(variantUser);
  });
});
