import {
  addMutipleProductWithoutVariantToCart,
  addVariantOfSameProductToCart,
  APPAREL_BASESITE,
  APPAREL_CURRENCY,
  APPAREL_DEFAULT_DELIVERY_MODE,
  configureApparelProduct,
  visitProductWithoutVariantPage
} from '../../../helpers/apparel/apparel-checkout-flow';
import * as guestCheckout from '../../../helpers/checkout-as-guest';
import * as checkout from '../../../helpers/checkout-flow';
import {
  cartWithSkuProduct,
  cartWithVariantProduct,
  productWithoutVariants,
  styleVariantProduct,
  variantProduct,
  variantUser
} from '../../../sample-data/apparel-checkout-flow';

context('Apparel - checkout as guest', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  beforeEach(() => {
    configureApparelProduct();
  });

  describe('when adding a single variant product to cart and completing checkout.', () => {
    before(() => {
      checkout.visitHomePage();
    });

    it('should go to product page from category page', () => {
      checkout.goToCheapProductDetailsPage(APPAREL_BASESITE, variantProduct);
    });

    it('should add product to cart and go to checkout', () => {
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
        cartWithVariantProduct,
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
      // TESTING
      cy.wait(3000);

      checkout.fillPaymentFormWithCheapProduct(
        variantUser,
        undefined,
        cartWithVariantProduct,
        APPAREL_BASESITE
      );
    });

    it('should review and place order', () => {
      checkout.placeOrderWithCheapProduct(
        variantUser,
        cartWithVariantProduct,
        APPAREL_BASESITE,
        APPAREL_CURRENCY
      );
    });

    it('should display summary page', () => {
      checkout.verifyOrderConfirmationPageWithCheapProduct(
        variantUser,
        variantProduct,
        cartWithVariantProduct
      );
    });
  });

  describe('when adding a different variant of the same product to cart and completing checkout', () => {
    before(() => {
      cy.window().then(win => win.sessionStorage.clear());
      checkout.visitHomePage();
    });

    it('should go to product page from category page', () => {
      checkout.goToCheapProductDetailsPage(APPAREL_BASESITE, variantProduct);
    });

    it('should add the variant of the same product to cart', () => {
      addVariantOfSameProductToCart();
    });

    it('should login as guest', () => {
      guestCheckout.loginAsGuest(APPAREL_BASESITE, variantUser);
    });

    it('should fill in address form', () => {
      checkout.fillAddressFormWithCheapProduct(
        variantUser,
        cartWithVariantProduct,
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
      // TESTING
      cy.wait(3000);

      checkout.fillPaymentFormWithCheapProduct(
        variantUser,
        undefined,
        cartWithVariantProduct,
        APPAREL_BASESITE
      );
    });

    it('should review and place order', () => {
      checkout.placeOrderWithCheapProduct(
        variantUser,
        cartWithVariantProduct,
        APPAREL_BASESITE,
        APPAREL_CURRENCY
      );
    });

    it('should display summary page', () => {
      checkout.verifyOrderConfirmationPageWithCheapProduct(
        variantUser,
        styleVariantProduct,
        cartWithVariantProduct
      );
    });
  });

  describe('when adding a different variant of the same product to cart and completing checkout', () => {
    before(() => {
      cy.window().then(win => win.sessionStorage.clear());
      checkout.visitHomePage();
    });

    it('should visit the product without variants page', () => {
      visitProductWithoutVariantPage();
    });

    it('should add N number of SKUs to cart', () => {
      addMutipleProductWithoutVariantToCart();

      const loginPage = checkout.waitForPage(
        '/login',
        'getLoginPage',
        APPAREL_BASESITE
      );
      cy.getByText(/proceed to checkout/i).click();
      cy.wait(`@${loginPage}`);
    });

    it('should login as guest', () => {
      guestCheckout.loginAsGuest(APPAREL_BASESITE, variantUser);
    });

    it('should fill in address form', () => {
      checkout.fillAddressFormWithCheapProduct(
        variantUser,
        cartWithSkuProduct,
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
      // TESTING
      cy.wait(3000);

      checkout.fillPaymentFormWithCheapProduct(
        variantUser,
        undefined,
        cartWithSkuProduct,
        APPAREL_BASESITE
      );
    });

    it('should review and place order', () => {
      checkout.placeOrderWithCheapProduct(
        variantUser,
        cartWithSkuProduct,
        APPAREL_BASESITE,
        APPAREL_CURRENCY
      );
    });

    it('should display summary page', () => {
      checkout.verifyOrderConfirmationPageWithCheapProduct(
        variantUser,
        productWithoutVariants,
        cartWithSkuProduct
      );
    });
  });
});
