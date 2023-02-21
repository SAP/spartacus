/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckoutConfig } from '@spartacus/storefront';
import * as guestCheckout from '../../../helpers/checkout-as-guest';
import { viewportContext } from '../../../helpers/viewport-context';
import { isolateTests } from '../../../support/utils/test-isolation';
context('Checkout as guest', { testIsolation: false }, () => {
  viewportContext(['desktop'], () => {
    isolateTests();
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
