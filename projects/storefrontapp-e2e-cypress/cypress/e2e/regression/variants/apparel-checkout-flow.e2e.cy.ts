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
import { getApparelCheckoutUser } from '../../../sample-data/apparel-checkout-flow';

context('Apparel - checkout flow', () => {
  let variantUser;
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      Cypress.env('BASE_SITE', APPAREL_BASESITE);
      variantUser = getApparelCheckoutUser();
    });

    beforeEach(() => {
      configureProductWithVariants();
    });

    checkoutVariants.testCheckoutRegisteredUser();
  });
});
