/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckoutConfig } from '@spartacus/storefront';
import { login } from '../../../helpers/auth-forms';
import * as guestCheckout from '../../../helpers/checkout-as-guest';
import * as checkout from '../../../helpers/checkout-flow';
import * as loginHelper from '../../../helpers/login';
import { waitForPage } from '../../../helpers/navigation';
import { cheapProduct } from '../../../sample-data/checkout-flow';
import { isolateTests } from '../../../support/utils/test-isolation';

const alias = (name: string) => `desktop__${name}`;

context('Checkout as guest (desktop)', { testIsolation: true }, () => {
  isolateTests();

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    guestCheckout.generateGuestUser();
  });

  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.cxConfig({ checkout: { guest: true } } as CheckoutConfig);
  });

  // flow-ul complet de checkout + crearea contului din guest
  guestCheckout.testCheckoutAsGuest();

  // testul care verifică păstrarea produselor în cart după login
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
        alias('getDeliveryPage')
      );

      checkout.clickHamburger();
      cy.getLoginRegisterLink({ clickAndWait: true });

      cy.intercept('POST', '**/authorizationserver/oauth/token').as(
        alias('oauth')
      );
      cy.intercept('GET', '**/users/current/carts**').as(
        alias('getCartsAfterLogin')
      );

      login(guestCheckout.guestUser.email, guestCheckout.guestUser.password);

      cy.wait(`@${alias('oauth')}`, { timeout: 30000 }).then((xhr) => {
        const status = xhr?.response?.statusCode;
        if (![200, 201].includes(status as number)) {
          cy.log(`OAuth ${status} – retry login once`);
          login(
            guestCheckout.guestUser.email,
            guestCheckout.guestUser.password
          );
          cy.wait(`@${alias('oauth')}`, { timeout: 30000 })
            .its('response.statusCode')
            .should('be.oneOf', [200, 201]);
        }
      });

      cy.wait(`@${deliveryAddressPage}`, { timeout: 30000 })
        .its('response.statusCode')
        .should('eq', 200);

      cy.get('cx-login div.cx-login-greet', { timeout: 20000 }).should('exist');
      cy.get('.cx-checkout-title').should('contain', 'Shipping Address');

      cy.wait(`@${alias('getCartsAfterLogin')}`, { timeout: 30000 })
        .its('response.statusCode')
        .should('be.oneOf', [200, 204]);

      cy.get('cx-mini-cart .count', { timeout: 20000 }).should('contain', '1');

      const cartPage = waitForPage('/cart', alias('getCartPage'));
      cy.get('cx-mini-cart').click();
      cy.wait(`@${cartPage}`, { timeout: 30000 })
        .its('response.statusCode')
        .should('eq', 200);

      cy.get('cx-cart-item-list')
        .contains('tr[cx-cart-item-list-row]', cheapProduct.code)
        .within(() => {
          cy.get('cx-item-counter input').should('have.value', '1');
        });

      loginHelper.signOutUser();
    });
  });
});
