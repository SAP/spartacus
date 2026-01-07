/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as productDetails from '../../../helpers/product-details';
import { isolateTests } from '../../../support/utils/test-isolation';
import { viewportContext } from '../../../helpers/viewport-context';

context('Product details', { testIsolation: false }, () => {
  viewportContext(['desktop'], () => {
    isolateTests();

    describe('Electronics', () => {
      before(productDetails.configureDefaultProduct);
      productDetails.verifyTabKeyboardNavigation();
    });

    describe('Apparel', () => {
      productDetails.configureApparelProduct;
      productDetails.verifyTabKeyboardNavigation();
    });
  });
});

context('Product details', { testIsolation: false }, () => {
  viewportContext(['mobile'], () => {
    isolateTests();

    describe('Electronics', () => {
      before(productDetails.configureDefaultProduct);
      productDetails.verifyTabKeyboardNavigation(true);
    });

    describe('Apparel', () => {
      productDetails.configureApparelProduct;
      productDetails.verifyTabKeyboardNavigation(true);
    });
  });
});
