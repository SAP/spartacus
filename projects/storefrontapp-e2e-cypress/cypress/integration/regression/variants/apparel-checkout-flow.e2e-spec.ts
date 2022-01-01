import {
  APPAREL_BASESITE,
  configureProductWithVariants,
} from '../../../helpers/variants/apparel-checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import { getApparelCheckoutUser } from '../../../sample-data/apparel-checkout-flow';
import * as checkoutVariants from '../../../helpers/checkout-variants';

context('Apparel - checkout flow', () => {
  let variantUser;
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      Cypress.env('BASE_SITE', APPAREL_BASESITE);
      variantUser = getApparelCheckoutUser();
    });

    beforeEach(() => {
      configureProductWithVariants();
    });

    checkoutVariants.testCheckoutRegisteredUser();
  });
});
