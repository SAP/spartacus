import { CheckoutConfig } from '@spartacus/storefront';
import { login } from '../../../helpers/auth-forms';
import * as guestCheckout from '../../../helpers/checkout-as-guest';
import * as checkout from '../../../helpers/checkout-flow';
import { waitForPage } from '../../../helpers/checkout-flow';
import * as loginHelper from '../../../helpers/login';
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

    guestCheckout.testCheckoutAsGuest();

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
