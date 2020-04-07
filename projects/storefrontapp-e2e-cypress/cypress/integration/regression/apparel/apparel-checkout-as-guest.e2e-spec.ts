import {
  addMutipleProductWithoutVariantToCart,
  addVariantOfSameProductToCart,
  APPAREL_BASESITE,
  APPAREL_CURRENCY,
  APPAREL_DEFAULT_DELIVERY_MODE,
  configureApparelProduct,
  visitProductWithoutVariantPage,
} from '../../../helpers/apparel/apparel-checkout-flow';
import * as guestCheckout from '../../../helpers/checkout-as-guest';
import * as checkout from '../../../helpers/checkout-flow';
import {
  cartWithTotalVariantProduct,
  products,
  variantProduct,
  variantUser,
} from '../../../sample-data/apparel-checkout-flow';

context('Apparel - checkout as guest', () => {
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
    before(() => {
      checkout.visitHomePage();
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
      checkout.addCheapProductToCartAndProceedToCheckout(
        APPAREL_BASESITE,
        variantProduct
      );
    });

    it('should login as guest', () => {
      guestCheckout.loginAsGuest(APPAREL_BASESITE, variantUser);
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
        variantProduct,
        cartWithTotalVariantProduct,
        true
      );
    });

    after(() => {
      checkout.signOut();
    });
  });
});
