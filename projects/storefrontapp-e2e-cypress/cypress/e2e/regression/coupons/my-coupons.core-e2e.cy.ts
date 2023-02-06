/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as myCoupons from '../../../helpers/coupons/my-coupons';
import { viewportContext } from '../../../helpers/viewport-context';

viewportContext(['desktop'], () => {
  describe('My coupons - Authenticated user', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      cy.requireLoggedIn();
    });

    myCoupons.testClaimCustomerCoupon();
  });
});
