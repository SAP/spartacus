/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckoutConfig } from '@spartacus/storefront';
import { login } from '../../../helpers/auth-forms';
import * as guestCheckout from '../../../helpers/checkout-as-guest';
import * as checkout from '../../../helpers/checkout-flow';
import * as loginHelper from '../../../helpers/login';
import { waitForPage } from '../../../helpers/navigation';
import { viewportContext } from '../../../helpers/viewport-context';
import { cheapProduct } from '../../../sample-data/checkout-flow';
import { isolateTests } from '../../../support/utils/test-isolation';
context('Checkout as guest', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    isolateTests();
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      guestCheckout.generateGuestUser();
    });

    beforeEach(() => {
      cy.cxConfig({ checkout: { guest: true } } as CheckoutConfig);
    });

    // Core e2e test.
    guestCheckout.testCheckoutAsGuest();

    // Test depends on on core test for guest account creation.
    // JDK21: identified bug CXSPA-10758, skip test until fix gets applied
    it('should keep products in guest cart and restart checkout', () => {
      cy.whenJDK21(() => {
        cy.log('skip for JDK21, will be fix by CXSPA-10758');
      });
      cy.whenJDK17(() => {
        checkout.goToCheapProductDetailsPage();
        checkout.addCheapProductToCartAndProceedToCheckout();

        guestCheckout.loginAsGuest(guestCheckout.guestUser);

        checkout.fillAddressFormWithCheapProduct();

        const deliveryAddressPage = waitForPage(
          '/checkout/delivery-address',
          'getDeliveryPage'
        );

        checkout.clickHamburger();

        cy.getLoginRegisterLink({ clickAndWait: true });

        login(guestCheckout.guestUser.email, guestCheckout.guestUser.password);
        cy.wait(`@${deliveryAddressPage}`)
          .its('response.statusCode')
          .should('eq', 200);

        cy.get('cx-login div.cx-login-greet').should('exist');
        cy.get('.cx-checkout-title').should('contain', 'Shipping Address');

        cy.get('cx-mini-cart .count').contains('1');

        const cartPage = waitForPage('/cart', 'getCartPage');
        cy.get('cx-mini-cart').click();
        cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);

        cy.get('cx-cart-item-list')
          .contains('tr[cx-cart-item-list-row]', cheapProduct.code)
          .within(() => {
            cy.get('cx-item-counter input').should('have.value', '1');
          });
        loginHelper.signOutUser();
      });
    });
  });
});
