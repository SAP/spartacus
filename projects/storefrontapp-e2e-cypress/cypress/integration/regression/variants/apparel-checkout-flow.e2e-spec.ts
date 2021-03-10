import * as checkout from '../../../helpers/checkout-flow';
import {
  addMutipleProductWithoutVariantToCart,
  addVariantOfSameProductToCart,
  APPAREL_BASESITE,
  APPAREL_CURRENCY,
  APPAREL_DEFAULT_DELIVERY_MODE,
  configureProductWithVariants,
  visitProductWithoutVariantPage,
} from '../../../helpers/variants/apparel-checkout-flow';
import {
  cartWithTotalVariantProduct,
  products,
  variantUser,
} from '../../../sample-data/apparel-checkout-flow';

context('Apparel - checkout flow', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    Cypress.env('BASE_SITE', APPAREL_BASESITE);
  });

  beforeEach(() => {
    configureProductWithVariants();
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('when adding a single variant product to cart and completing checkout.', () => {
    it('should do apparel checkout with a registered user', () => {
      checkout.visitHomePage();
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
      checkout.verifyDeliveryMethod(APPAREL_DEFAULT_DELIVERY_MODE);
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

    it('should be able to check order in order history', () => {
      // hack: visit other page to trigger store -> local storage sync
      cy.selectUserMenuOption({
        option: 'Personal Details',
      });
      cy.waitForOrderToBePlacedRequest(APPAREL_BASESITE, APPAREL_CURRENCY);
      checkout.viewOrderHistoryWithCheapProduct(cartWithTotalVariantProduct);
    });

    after(() => {
      checkout.signOut();
    });
  });
});
