/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckoutConfig } from '@spartacus/storefront';
import * as guestCheckout from '../../../helpers/checkout-as-guest';
import { clearCacheTestIsolationBeforeOnly } from '../../../helpers/utils-cypress-legacy';
import { viewportContext } from '../../../helpers/viewport-context';
context('Checkout as guest', { testIsolation: false }, () => {
  clearCacheTestIsolationBeforeOnly();
  viewportContext(['desktop'], () => {
    before(() => {
      guestCheckout.generateGuestUser();
      cy.window().then((win) => win.sessionStorage.clear());
    });

    beforeEach(() => {
      cy.cxConfig({ checkout: { guest: true } } as CheckoutConfig);
    });

    guestCheckout.testCheckoutAsGuest();
  });
});
