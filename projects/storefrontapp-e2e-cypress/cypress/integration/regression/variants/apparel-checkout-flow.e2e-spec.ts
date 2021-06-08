import * as checkout from '../../../helpers/checkout-flow';
import {
  addMutipleProductWithoutVariantToCart,
  addVariantOfSameProductToCart,
  APPAREL_BASESITE,
  APPAREL_CURRENCY,
  configureProductWithVariants,
  visitProductWithoutVariantPage,
} from '../../../helpers/variants/apparel-checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import {
  cartWithTotalVariantProduct,
  getApparelCheckoutUser,
  products,
} from '../../../sample-data/apparel-checkout-flow';

context('Apparel - checkout flow', () => {
  let variantUser;
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      Cypress.env('BASE_SITE', APPAREL_BASESITE);
      variantUser = getApparelCheckoutUser();
    });

    beforeEach(() => {
      configureProductWithVariants();
    });

    it('should perform checkout with a registered user', () => {
      checkout.visitHomePage();

      checkout.clickHamburger();

      checkout.registerUser(false, variantUser);
      checkout.goToCheapProductDetailsPage(products[0]);
      addVariantOfSameProductToCart();
      visitProductWithoutVariantPage();
      addMutipleProductWithoutVariantToCart();
      checkout.goToCheapProductDetailsPage(products[0]);
      checkout.addCheapProductToCartAndLogin(variantUser, products[0]);
      checkout.fillAddressFormWithCheapProduct(
        variantUser,
        cartWithTotalVariantProduct
      );
      checkout.verifyDeliveryMethod();
      checkout.fillPaymentFormWithCheapProduct(
        variantUser,
        undefined,
        cartWithTotalVariantProduct
      );
      checkout.placeOrderWithCheapProduct(
        variantUser,
        cartWithTotalVariantProduct,
        APPAREL_CURRENCY
      );
      checkout.verifyOrderConfirmationPageWithCheapProduct(
        variantUser,
        products[0],
        cartWithTotalVariantProduct,
        true
      );
    });
  });
});
