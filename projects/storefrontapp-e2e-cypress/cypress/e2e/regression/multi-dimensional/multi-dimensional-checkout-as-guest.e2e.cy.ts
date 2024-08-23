/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as checkoutMultiDVariants from '../../../helpers/checkout-multi-dimensional';
import {viewportContext} from '../../../helpers/viewport-context';
// import {clearAllStorage} from '../../../support/utils/clear-all-storage';

context('Multi Dimensional - checkout as guest', () => {
  viewportContext(['desktop', 'mobile'], () => {
    describe('multi-d all-tests', () => {
      beforeEach(() => {
        // clearAllStorage();
      });

      checkoutMultiDVariants.testCheckoutMultiDAsGuest();
    });
  });

  viewportContext(['desktop'], () => {

    describe('multi-d all-tests', () => {
      beforeEach(() => {
        // clearAllStorage();
      });
      checkoutMultiDVariants.testCheckoutMultiDAsGuestAndVerifyCart();
    });
  });
});
