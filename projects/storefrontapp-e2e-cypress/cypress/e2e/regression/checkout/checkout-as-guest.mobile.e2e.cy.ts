/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckoutConfig } from '@spartacus/storefront';
import * as guestCheckout from '../../../helpers/checkout-as-guest';
import { isolateTests } from '../../../support/utils/test-isolation';

const alias = (name: string) => `mobile__${name}`;

context('Checkout as guest (mobile)', { testIsolation: true }, () => {
  isolateTests();

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    guestCheckout.generateGuestUser();
  });

  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.cxConfig({ checkout: { guest: true } } as CheckoutConfig);
  });

  guestCheckout.testCheckoutAsGuest();

});
