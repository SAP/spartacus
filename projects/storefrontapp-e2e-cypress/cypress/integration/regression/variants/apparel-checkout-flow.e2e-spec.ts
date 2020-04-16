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
    Cypress.env('BASE_SITE', `/${APPAREL_BASESITE}`);
    Cypress.env(
      'PREFIX_AND_BASESITE',
      Cypress.env('OCC_PREFIX') + `/${APPAREL_BASESITE}`
    );
  });

  beforeEach(() => {
    configureProductWithVariants();
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('when adding a single variant product to cart and completing checkout.', () => {
    it('should register successfully', () => {
      checkout.visitHomePage();
      checkout.registerUser(false, variantUser);
    });

    it('should go to product page add the variant style of the product from category page', () => {
      checkout.goToCheapProductDetailsPage(products[0]);
      addVariantOfSameProductToCart();
    });

    it('should visit the product without variant page', () => {
      visitProductWithoutVariantPage();
      addMutipleProductWithoutVariantToCart();
    });

    it('should go to product page, and add product to cart from category page and proceed to checkout', () => {
      checkout.goToCheapProductDetailsPage(products[0]);
      checkout.addCheapProductToCartAndLogin(variantUser, products[0]);
    });

    it('should fill in address form', () => {
      checkout.fillAddressFormWithCheapProduct(
        variantUser,
        cartWithTotalVariantProduct
      );
    });

    it('should choose delivery', () => {
      checkout.verifyDeliveryMethod(APPAREL_DEFAULT_DELIVERY_MODE);
    });

    it('should fill in payment form', () => {
      cy.wait(3000);

      checkout.fillPaymentFormWithCheapProduct(
        variantUser,
        undefined,
        cartWithTotalVariantProduct
      );
    });

    it('should review and place order', () => {
      checkout.placeOrderWithCheapProduct(
        variantUser,
        cartWithTotalVariantProduct,
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
      checkout.viewOrderHistoryWithCheapProduct(cartWithTotalVariantProduct);
    });

    after(() => {
      checkout.signOut();
    });
  });
});
