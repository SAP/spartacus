/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as checkoutVariants from '../../../helpers/checkout-variants';
import {
  APPAREL_BASESITE,
  configureProductWithVariants,
} from '../../../helpers/variants/apparel-checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Apparel - checkout as guest', () => {
  viewportContext(['desktop', 'mobile'], () => {
    describe('core tests', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        checkoutVariants.generateVariantGuestUser();
      });

      beforeEach(() => {
        clearAllStorage();
        Cypress.env('BASE_SITE', APPAREL_BASESITE);
        configureProductWithVariants();
      });

      checkoutVariants.testCheckoutVariantAsGuest();
    });
  });

  viewportContext(['desktop'], () => {
    describe('all tests', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        checkoutVariants.generateVariantGuestUser();
      });

      beforeEach(() => {
        clearAllStorage();
        Cypress.env('BASE_SITE', APPAREL_BASESITE);
        configureProductWithVariants();
      });

      checkoutVariants.testCheckoutVariantAsGuestAndVerifyCart();
    });
  });
});