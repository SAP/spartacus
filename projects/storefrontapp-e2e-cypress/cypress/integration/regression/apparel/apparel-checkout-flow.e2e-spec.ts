import {
  addMutipleProductWithoutVariantToCart,
  addVariantOfSameProductToCart,
  APPAREL_BASESITE,
  APPAREL_CURRENCY,
  APPAREL_DEFAULT_DELIVERY_MODE,
  configureApparelProduct,
  visitProductWithoutVariantPage,
} from '../../../helpers/apparel/apparel-checkout-flow';
import * as checkout from '../../../helpers/checkout-flow';
import {
  cartWithTotalVariantProduct,
  products,
  variantUser,
} from '../../../sample-data/apparel-checkout-flow';

context('Apparel - checkout flow', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  beforeEach(() => {
    configureApparelProduct();
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('when adding a single variant product to cart and completing checkout.', () => {
    it('should register successfully', () => {
      checkout.visitHomePage('', APPAREL_BASESITE);
      checkout.registerUser(false, variantUser, APPAREL_BASESITE);
    });

    it('should go to product page add the variant style of the product from category page', () => {
      checkout.goToCheapProductDetailsPage(APPAREL_BASESITE, products[0]);
      addVariantOfSameProductToCart();
    });

    it('should visit the product without variant page', () => {
      visitProductWithoutVariantPage();
      addMutipleProductWithoutVariantToCart();
    });

    it('should go to product page, and add product to cart from category page and proceed to checkout', () => {
      checkout.goToCheapProductDetailsPage(APPAREL_BASESITE, products[0]);
      checkout.addCheapProductToCartAndLogin(variantUser, products[0]);
    });

    it('should fill in address form', () => {
      checkout.fillAddressFormWithCheapProduct(
        variantUser,
        cartWithTotalVariantProduct,
        APPAREL_BASESITE
      );
    });

    it('should choose delivery', () => {
      checkout.verifyDeliveryMethod(
        APPAREL_BASESITE,
        APPAREL_DEFAULT_DELIVERY_MODE
      );
    });

    it('should fill in payment form', () => {
      cy.wait(3000);

      checkout.fillPaymentFormWithCheapProduct(
        variantUser,
        undefined,
        cartWithTotalVariantProduct,
        APPAREL_BASESITE
      );
    });

    it('should review and place order', () => {
      checkout.placeOrderWithCheapProduct(
        variantUser,
        cartWithTotalVariantProduct,
        APPAREL_BASESITE,
        APPAREL_CURRENCY
      );
    });

    it('should display summary page', () => {
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
      checkout.viewOrderHistoryWithCheapProduct(
        APPAREL_BASESITE,
        cartWithTotalVariantProduct
      );
    });

    after(() => {
      checkout.signOut();
    });
  });
});
