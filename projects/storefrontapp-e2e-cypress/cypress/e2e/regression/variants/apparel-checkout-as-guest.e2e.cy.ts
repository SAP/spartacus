/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as checkoutVariants from '../../../helpers/checkout-variants';
import {
  APPAREL_BASESITE,
  configureProductWithVariants,
} from '../../../helpers/variants/apparel-checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';

context('Apparel - checkout as guest', () => {
  viewportContext(['mobile'], () => {
    describe('core tests', () => {
      beforeEach(() => {
        Cypress.env('BASE_SITE', APPAREL_BASESITE);
        configureProductWithVariants();
        checkoutVariants.generateVariantGuestUser();
      });

      checkoutVariants.testCheckoutVariantAsGuest();
    });
  });

  viewportContext(['desktop'], () => {
    describe('all tests', () => {
      beforeEach(() => {
        Cypress.env('BASE_SITE', APPAREL_BASESITE);
        configureProductWithVariants();
        checkoutVariants.generateVariantGuestUser();
      });

      checkoutVariants.testCheckoutVariantAsGuestAndVerifyCart();
    });
  });
});
