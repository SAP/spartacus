/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckoutConfig } from '@spartacus/storefront';
import * as checkout from '../../../helpers/checkout-flow';
import * as expressCheckout from '../../../helpers/express-checkout';
import { clearCacheTestIsolationBeforeOnly } from '../../../helpers/utils-cypress-legacy';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Express checkout', { testIsolation: false }, () => {
  clearCacheTestIsolationBeforeOnly();
  viewportContext(['desktop'], () => {
    before(() => {
      clearAllStorage();
      cy.cxConfig({ checkout: { express: true } } as CheckoutConfig);
      checkout.visitHomePage();
    });
    // restore and save not needed when TestIsolation is off
    // beforeEach(() => {
    //   cy.restoreLocalStorage();
    // });

    // afterEach(() => {
    //   cy.saveLocalStorage();
    // });
    expressCheckout.testExpressCheckout();
  });
});
