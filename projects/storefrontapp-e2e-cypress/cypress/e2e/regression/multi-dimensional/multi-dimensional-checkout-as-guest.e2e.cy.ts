/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as checkoutMultiDVariants from '../../../helpers/checkout-multi-dimensional';
import { viewportContext } from '../../../helpers/viewport-context';

context('Multi Dimensional - checkout as guest', () => {
  viewportContext(['desktop', 'mobile'], () => {
    describe('multi-d all-tests', () => {
      checkoutMultiDVariants.testCheckoutMultiDAsGuest();
    });
  });

  viewportContext(['desktop'], () => {
    describe('multi-d all-tests', () => {
      checkoutMultiDVariants.testCheckoutMultiDAsGuestAndVerifyCart();
    });
  });
});
