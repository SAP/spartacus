import { assertAddressForm } from '../../../helpers/address-book';
import { login } from '../../../helpers/auth-forms';
import * as guestCheckout from '../../../helpers/checkout-as-guest';
import * as checkout from '../../../helpers/checkout-flow';
import * as loginHelper from '../../../helpers/login';
import { validateUpdateProfileForm } from '../../../helpers/update-profile';
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
  cartWithSingleVariantProduct,
  cartWithTotalVariantProduct,
  getApparelCheckoutUser,
  products,
  variantProduct,
} from '../../../sample-data/apparel-checkout-flow';

context('Apparel - checkout as guest', () => {
  let variantUser;
  viewportContext(['mobile', 'desktop'], () => {
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

    it('should perform checkout as guest, create an account and verify guest data', () => {
      checkout.goToCheapProductDetailsPage(products[0]);
      addVariantOfSameProductToCart();

      visitProductWithoutVariantPage();
      addMutipleProductWithoutVariantToCart();

      checkout.goToCheapProductDetailsPage(products[0]);
      checkout.addCheapProductToCartAndProceedToCheckout(variantProduct);

      guestCheckout.loginAsGuest(variantUser);

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
        variantProduct,
        cartWithTotalVariantProduct,
        true
      );
      guestCheckout.createAccountFromGuest(variantUser.password);

      cy.selectUserMenuOption({
        option: 'Personal Details',
      });

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

      cy.selectUserMenuOption({
        option: 'Payment Details',
      });

      cy.get('.cx-payment .cx-body').then(() => {
        cy.get('cx-card').should('exist');
      });

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

    it('should keep guest cart content and restart checkout', () => {
      cy.clearLocalStorage();
      checkout.goToCheapProductDetailsPage(products[0]);
      checkout.addCheapProductToCartAndProceedToCheckout(variantProduct);

      guestCheckout.loginAsGuest(variantUser);

      checkout.fillAddressFormWithCheapProduct(
        variantUser,
        cartWithSingleVariantProduct
      );

      const shippingPage = checkout.waitForPage(
        '/checkout/shipping-address',
        'getShippingPage'
      );

      checkout.clickHamburger();

      const loginPage = checkout.waitForPage('/login', 'getLoginPage');
      cy.findByText(/Sign in \/ Register/i).click();
      cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

      login(variantUser.email, variantUser.password);
      cy.wait(`@${shippingPage}`).its('response.statusCode').should('eq', 200);

      cy.get('cx-mini-cart .count').contains('1');

      const cartPage = checkout.waitForPage('/cart', 'getCartPage');
      cy.get('cx-mini-cart').click();
      cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);

      cy.get('cx-cart-item-list')
        .contains('cx-cart-item', variantProduct.code)
        .within(() => {
          cy.get('cx-item-counter input').should('have.value', '1');
        });
      loginHelper.signOutUser();
    });
  });
});
