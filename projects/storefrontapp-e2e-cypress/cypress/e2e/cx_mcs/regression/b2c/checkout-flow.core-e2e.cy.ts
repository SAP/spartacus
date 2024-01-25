/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as checkout from '../../../../helpers/checkout-flow';
import {
  clickSearchIcon,
  searchForProduct,
} from '../../../../helpers/product-search';
import { viewportContext } from '../../../../helpers/viewport-context';
import { getSampleUser, product } from '../../../../sample-data/checkout-flow';

context('Checkout flow', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
    });

    it('should perform checkout', () => {
      const user = getSampleUser();
      checkout.visitHomePage();

      checkout.clickHamburger();

      checkout.registerUser(false, user);
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndLogin(user);
      checkout.checkSummaryAmount();
      checkout.proceedWithEmptyShippingAdressForm();
      checkout.proceedWithIncorrectShippingAddressForm({
        ...user,
        firstName: '',
      });
      checkout.fillAddressFormWithCheapProduct({ firstName: user.firstName });
      checkout.verifyDeliveryMethod();
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

    it('should search and perform checkout', () => {
      const user = getSampleUser();
      checkout.visitHomePage();
      checkout.clickHamburger();
      checkout.registerUser(false, user);
      cy.onMobile(() => {
        clickSearchIcon();
      });
      searchForProduct(product.name);
      checkout.checkoutFirstDisplayedProduct(user);
    });

    // With MCs, it is missing filter. Enable back once filtering has been fixed.
    // it.skip('should filter with faceting and perform checkout', () => {
    //   const user = getSampleUser();
    //   checkout.visitHomePage();

    //   checkout.clickHamburger();

    //   checkout.registerUser(false, user);
    //   searchResult();
    //   filterUsingFacetFiltering();
    //   checkout.checkoutFirstDisplayedProduct(user);
    // });
  });
});
