/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { viewportContext } from '../../../helpers/viewport-context';
import * as checkoutMultiDVariants from '../../../helpers/checkout-multi-dimensional';

context('Multi Dimensional - checkout flow', () => {
  viewportContext(['desktop', 'mobile'], () => {
    describe('multi-d core-tests', () => {
      checkoutMultiDVariants.testCheckoutRegisteredUser();
    });
  });
});
