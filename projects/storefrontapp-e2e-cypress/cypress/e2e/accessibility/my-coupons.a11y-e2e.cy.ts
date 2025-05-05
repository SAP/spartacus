/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { visitHomePage } from '../../helpers/checkout-flow';
import * as myCoupons from '../../helpers/coupons/my-coupons';
import { viewportContext } from '../../helpers/viewport-context';

describe('My Coupons Accessibility', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.a11yContinuumSetup();
      cy.requireLoggedIn();
      visitHomePage();
    });

    it('should display empty My Coupons page (no coupons claimed)', () => {
      cy.selectUserMenuOption({ option: 'My Coupons' });
      cy.get('main').a11yRunContinuumTest();
    });

    it('should pass a11y after claiming a coupon', () => {
      myCoupons.testClaimCustomerCoupon(); // claims via UI
      cy.get('main').a11yRunContinuumTest();
    });

    it('should toggle notification and view coupon list', () => {
      cy.selectUserMenuOption({ option: 'My Coupons' });
      myCoupons.verifyMyCoupons(); // includes toggle & filters
      cy.get('main').a11yRunContinuumTest();
    });

    it('should pass a11y on pagination and sorting', () => {
      myCoupons.verifyPagingAndSorting();
      cy.get('main').a11yRunContinuumTest();
    });
  });
});
