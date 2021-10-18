import { CheckoutConfig } from '@spartacus/storefront';
import { assertAddressForm } from '../../../helpers/address-book';
import { login } from '../../../helpers/auth-forms';
import * as guestCheckout from '../../../helpers/checkout-as-guest';
import * as checkout from '../../../helpers/checkout-flow';
import { waitForPage } from '../../../helpers/checkout-flow';
import * as loginHelper from '../../../helpers/login';
import { validateUpdateProfileForm } from '../../../helpers/update-profile';
import { viewportContext } from '../../../helpers/viewport-context';
import {
  cheapProduct,
  getSampleUser,
} from '../../../sample-data/checkout-flow';
context('Checkout as guest', () => {
  let user;
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      user = getSampleUser();
      cy.window().then((win) => win.sessionStorage.clear());
    });

    beforeEach(() => {
      cy.cxConfig({ checkout: { guest: true } } as CheckoutConfig);
    });

    it('should perform checkout as guest and create a user account', () => {
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndProceedToCheckout();

      cy.get('.register').findByText(/Guest Checkout/i);

      guestCheckout.loginAsGuest(user);

      checkout.fillAddressFormWithCheapProduct();
      checkout.verifyDeliveryMethod();
      checkout.fillPaymentFormWithCheapProduct();
      checkout.placeOrderWithCheapProduct();
      checkout.verifyOrderConfirmationPageWithCheapProduct();

      guestCheckout.createAccountFromGuest(user.password);

      cy.selectUserMenuOption({
        option: 'Address Book',
      });

      assertAddressForm(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          phone: '',
          address: user.address,
        },
        'US-CA'
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

      validateUpdateProfileForm('mr', user.firstName, user.lastName);
      checkout.signOut();
    });

    it('should keep products in guest cart and restart checkout', () => {
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndProceedToCheckout();

      guestCheckout.loginAsGuest(user);

      checkout.fillAddressFormWithCheapProduct();

      const shippingPage = waitForPage(
        '/checkout/shipping-address',
        'getShippingPage'
      );

      checkout.clickHamburger();

      const loginPage = waitForPage('/login', 'getLoginPage');
      cy.findByText(/Sign in \/ Register/i).click();
      cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

      login(user.email, user.password);
      cy.wait(`@${shippingPage}`).its('response.statusCode').should('eq', 200);

      cy.get('cx-mini-cart .count').contains('1');

      const cartPage = waitForPage('/cart', 'getCartPage');
      cy.get('cx-mini-cart').click();
      cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);

      cy.get('cx-cart-item-list')
        .contains('cx-cart-item', cheapProduct.code)
        .within(() => {
          cy.get('cx-item-counter input').should('have.value', '1');
        });
      loginHelper.signOutUser();
    });
  });
});
