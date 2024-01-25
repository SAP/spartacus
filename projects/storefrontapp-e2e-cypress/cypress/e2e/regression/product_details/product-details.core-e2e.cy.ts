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

    productDetails.productDetailsTest();
  });

  describe('Apparel', () => {
    before(productDetails.configureApparelProduct);

    productDetails.apparelProductDetailsTest();
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

      productDetails.productDetailsTest();
    });

    describe('Apparel', () => {
      before(productDetails.configureApparelProduct);

      productDetails.apparelProductDetailsTest();
    });
  }
);
