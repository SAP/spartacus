import { assertAddressForm } from '../../../helpers/address-book';
import {
  addMutipleProductWithoutVariantToCart,
  addVariantOfSameProductToCart,
  APPAREL_BASESITE,
  APPAREL_CURRENCY,
  APPAREL_DEFAULT_DELIVERY_MODE,
  configureApparelProduct,
  visitProductWithoutVariantPage,
} from '../../../helpers/apparel/apparel-checkout-flow';
import { login } from '../../../helpers/auth-forms';
import * as guestCheckout from '../../../helpers/checkout-as-guest';
import * as checkout from '../../../helpers/checkout-flow';
import { validateUpdateProfileForm } from '../../../helpers/update-profile';
import {
  cartWithSingleVariantProduct,
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
  });

  describe('Create account', () => {
    it('should create an account', () => {
      guestCheckout.createAccountFromGuest(
        variantUser.password,
        APPAREL_BASESITE
      );
    });
  });

  describe('Guest account', () => {
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

    it('should show address in Address Book', () => {
      cy.selectUserMenuOption({
        option: 'Address Book',
      });

      assertAddressForm(
        {
          firstName: variantUser.firstName,
          lastName: variantUser.lastName,
          phone: '',
          address: variantUser.address,
        },
        'GB'
      );
    });

    it('should show payment in Payment Methods', () => {
      cy.selectUserMenuOption({
        option: 'Payment Details',
      });

      cy.get('.cx-payment .cx-body').then(() => {
        cy.get('cx-card').should('exist');
      });
    });

    it('should show personal details in Personal Details', () => {
      cy.selectUserMenuOption({
        option: 'Personal Details',
      });

      validateUpdateProfileForm(
        'mr',
        variantUser.firstName,
        variantUser.lastName
      );
      checkout.signOut();
    });
  });

  describe('Guest cart merge', () => {
    it('should keep guest cart content and restart checkout', () => {
      checkout.goToCheapProductDetailsPage(APPAREL_BASESITE, products[0]);
      checkout.addCheapProductToCartAndProceedToCheckout(
        APPAREL_BASESITE,
        variantProduct
      );

      guestCheckout.loginAsGuest(APPAREL_BASESITE, variantUser);

      checkout.fillAddressFormWithCheapProduct(
        variantUser,
        cartWithSingleVariantProduct,
        APPAREL_BASESITE
      );

      const shippingPage = checkout.waitForPage(
        '/checkout/shipping-address',
        'getShippingPage',
        APPAREL_BASESITE
      );

      const loginPage = checkout.waitForPage(
        '/login',
        'getLoginPage',
        APPAREL_BASESITE
      );
      cy.getByText(/Sign in \/ Register/i).click();
      cy.wait(`@${loginPage}`).its('status').should('eq', 200);

      login(variantUser.email, variantUser.password);
      cy.wait(`@${shippingPage}`).its('status').should('eq', 200);

      cy.get('cx-mini-cart .count').contains('1');

      const cartPage = checkout.waitForPage(
        '/cart',
        'getCartPage',
        APPAREL_BASESITE
      );
      cy.get('cx-mini-cart').click();
      cy.wait(`@${cartPage}`).its('status').should('eq', 200);

      cy.get('cx-cart-item-list')
        .contains('cx-cart-item', variantProduct.code)
        .within(() => {
          cy.get('cx-item-counter input').should('have.value', '1');
        });
    });
  });
});
