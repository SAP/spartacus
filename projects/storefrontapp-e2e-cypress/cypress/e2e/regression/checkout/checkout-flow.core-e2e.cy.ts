/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { waitForCsrFallbackTimeout } from '../../../helpers/auth-forms';
import * as checkout from '../../../helpers/checkout-flow';
import {
  clickSearchIcon,
  searchForProduct,
} from '../../../helpers/product-search';
import { viewportContext } from '../../../helpers/viewport-context';
import { getSampleUser, product } from '../../../sample-data/checkout-flow';

context('Checkout flow', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
    });

    it('should checkout with a registered user', () => {
      const user = getSampleUser();
      checkout.visitHomePage();

      checkout.clickHamburger();

      checkout.registerUser(false, user, true);
      waitForCsrFallbackTimeout();
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndLogin(user, undefined, true);
      checkout.checkSummaryAmount();
      checkout.proceedWithEmptyShippingAdressForm();
      checkout.proceedWithIncorrectShippingAddressForm({
        ...user,
        firstName: '',
      });
      checkout.fillAddressFormWithCheapProduct({ firstName: user.firstName });
      checkout.verifyDeliveryOptions();
      checkout.proceedWithEmptyPaymentForm();
      checkout.proceedWithIncorrectPaymentForm({
        ...user,
        payment: { ...user.payment, number: null },
      });
      checkout.fillPaymentFormWithCheapProduct({
        payment: { number: user.payment.number },
      });
      checkout.placeOrderWithCheapProduct(user);
      checkout.verifyOrderConfirmationPageWithCheapProduct(user);
    });

    it('should checkout with a registered user by searching a product', () => {
      const user = getSampleUser();
      checkout.visitHomePage();
      checkout.clickHamburger();
      checkout.registerUser(false, user, true);
      // The search runs on the freshly server-rendered /login page. Wait for the
      // CSR fallback to hydrate the searchbox before interacting with it, otherwise
      // the keypress lands before Angular wires up its handlers and no navigation
      // happens (see CXSPA-13800).
      waitForCsrFallbackTimeout();
      cy.onMobile(() => {
        clickSearchIcon();
      });
      searchForProduct(product.name);
      // Guard: ensure the search actually navigated to the results page.
      cy.location('pathname').should('include', '/search');
      checkout.checkoutFirstDisplayedProduct(user, true);
    });
  });
});
