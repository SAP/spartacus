/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as productDetails from '../../../helpers/product-details';
import { formats } from '../../../sample-data/viewports';
import { isolateTests } from '../../../support/utils/test-isolation';

context('Product details', { testIsolation: false }, () => {
  isolateTests();
  describe('Electronics', () => {
    before(productDetails.configureDefaultProduct);
    beforeEach(() => {
      cy.cxConfig({
        // TODO: No longer needed to toggle a11yTabComponent feature when set to true
        // by default.
        features: {
          a11yTabComponent: true,
        },
      });
    });

    productDetails.productDetailsTest();
    productDetails.verifyTabKeyboardNavigation();
  });

  describe('Apparel', () => {
    before(productDetails.configureApparelProduct);
    beforeEach(() => {
      cy.cxConfig({
        // TODO: No longer needed to toggle a11yTabComponent feature when set to true
        // by default.
        features: {
          a11yTabComponent: true,
        },
      });
    });

    productDetails.apparelProductDetailsTest();
    productDetails.verifyTabKeyboardNavigation();
  });
});

//TODO split this test in two files (one for mobile)
context(
  `${formats.mobile.width + 1}p resolution - Product details`,
  { testIsolation: false },
  () => {
    isolateTests();
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });
    beforeEach(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });

    describe('Electronics', () => {
      before(productDetails.configureDefaultProduct);
      beforeEach(() => {
        cy.cxConfig({
          // TODO: No longer needed to toggle a11yTabComponent feature when set to true
          // by default.
          features: {
            a11yTabComponent: true,
          },
        });
      });

      productDetails.productDetailsTest();
      productDetails.verifyTabKeyboardNavigation(true);
    });

    describe('Apparel', () => {
      before(productDetails.configureApparelProduct);
      beforeEach(() => {
        cy.cxConfig({
          // TODO: No longer needed to toggle a11yTabComponent feature when set to true
          // by default.
          features: {
            a11yTabComponent: true,
          },
        });
      });

      productDetails.apparelProductDetailsTest();
      productDetails.verifyTabKeyboardNavigation(true);
    });
  }
);
