import {
  addMutipleProductWithoutVariantToCart,
  addVariantOfSameProductToCart,
  APPAREL_BASESITE,
  APPAREL_CURRENCY,
  APPAREL_DEFAULT_DELIVERY_MODE,
  configureApparelProduct,
  visitProductWithoutVariantPage
} from '../../../helpers/apparel/apparel-checkout-flow';
import {
  selectPaymentMethod,
  selectShippingAddress
} from '../../../helpers/checkout-as-persistent-user';
import * as checkout from '../../../helpers/checkout-flow';
import {
  cartWithSkuProduct,
  cartWithVariantProduct,
  variantProduct,
  variantUser
} from '../../../sample-data/apparel-checkout-flow';

context('Apparel - checkout flow', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  beforeEach(() => {
    configureApparelProduct();
  });

  describe('when adding a single variant product to cart and completing checkout.', () => {
    it('should register successfully', () => {
      checkout.visitHomePage('', APPAREL_BASESITE);
      checkout.registerUser(false, variantUser, APPAREL_BASESITE);
    });

    it('should go to product page from category page', () => {
      checkout.goToCheapProductDetailsPage(APPAREL_BASESITE, variantProduct);
    });

    it('should add product to cart and go to checkout', () => {
      checkout.addCheapProductToCartAndLogin(variantUser, variantProduct);
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

    after(() => {
      checkout.signOut();
      cy.saveLocalStorage();
    });
  });

  describe('when adding a different variant of the same product to cart and completing checkout', () => {
    before(() => {
      cy.restoreLocalStorage();
    });

    it('should go to product page from category page', () => {
      checkout.goToCheapProductDetailsPage(APPAREL_BASESITE, variantProduct);
      checkout.signInUser(APPAREL_BASESITE, variantUser);
    });

    it('should add the variant of the same product to cart', () => {
      addVariantOfSameProductToCart();
    });

    it('should select address card', () => {
      selectShippingAddress(APPAREL_BASESITE);
    });

    it('should choose delivery', () => {
      checkout.verifyDeliveryMethod(
        APPAREL_BASESITE,
        APPAREL_DEFAULT_DELIVERY_MODE
      );
    });

    it('should select payment card', () => {
      selectPaymentMethod();
    });

    it('should review and place order', () => {
      checkout.placeOrderWithCheapProduct(
        variantUser,
        cartWithVariantProduct,
        APPAREL_BASESITE,
        APPAREL_CURRENCY
      );
    });

    after(() => {
      checkout.signOut();
      cy.saveLocalStorage();
    });
  });

  describe('when adding a different variant of the same product to cart and completing checkout', () => {
    before(() => {
      cy.restoreLocalStorage();
    });

    it('should go to product page from category page', () => {
      visitProductWithoutVariantPage();
      checkout.signInUser(APPAREL_BASESITE, variantUser);
    });

    it('should visit the product without variants page', () => {});

    it('should add N number of SKUs to cart', () => {
      addMutipleProductWithoutVariantToCart();
    });

    it('should select address card', () => {
      selectShippingAddress(APPAREL_BASESITE);
    });

    it('should choose delivery', () => {
      checkout.verifyDeliveryMethod(
        APPAREL_BASESITE,
        APPAREL_DEFAULT_DELIVERY_MODE
      );
    });

    it('should select payment card', () => {
      selectPaymentMethod();
    });

    it('should review and place order', () => {
      checkout.placeOrderWithCheapProduct(
        variantUser,
        cartWithSkuProduct,
        APPAREL_BASESITE,
        APPAREL_CURRENCY
      );
    });

    it('should be able to check order in order history', () => {
      // hack: visit other page to trigger store -> local storage sync
      cy.selectUserMenuOption({
        option: 'Personal Details'
      });
      cy.waitForOrderToBePlacedRequest(APPAREL_BASESITE, APPAREL_CURRENCY);
      checkout.viewOrderHistoryWithCheapProduct(
        APPAREL_BASESITE,
        cartWithVariantProduct
      );
    });
  });
});
