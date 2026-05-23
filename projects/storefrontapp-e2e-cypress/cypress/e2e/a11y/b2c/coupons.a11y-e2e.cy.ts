/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as myCoupons from '../../../helpers/coupons/my-coupons';
import { viewportContext } from '../../../helpers/viewport-context';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';
import { getAuthStorageKey } from '../../../helpers/auth';

describe('Coupons Accessibility', { testIsolation: false }, () => {
  isolateTestsBefore();
  before(() => {
    cy.a11yContinuumSetup();
  });

  viewportContext(['mobile', 'desktop'], () => {
    describe('My Coupons', () => {
      before(() => {
        cy.window().then((win) => {
          win.sessionStorage.clear();
        });
        cy.requireLoggedIn();
      });

      it('Empty page', () => {
        cy.visit('/my-account/coupons');
        cy.findByText(/no coupons/);
        cy.get('main').a11yRunContinuumTest();
      });

      it('Claim coupon dialog', () => {
        cy.visit(myCoupons.myCouponsUrl + '#' + myCoupons.validCouponCode);
        cy.get('cx-claim-dialog').a11yRunContinuumTest();
      });

      it('Page with coupons', () => {
        cy.visit(myCoupons.myCouponsUrl + '#' + myCoupons.validCouponCode);
        cy.get(
          '.cx-dialog-body .cx-dialog-row-submit-button .btn:first'
        ).click();
        cy.findByText(/customerCoupon1/);
        cy.get('main').a11yRunContinuumTest();
      });

      it('Coupon details', () => {
        cy.get('.cx-card-read-more:first').click();
        cy.get('cx-coupon-dialog').a11yRunContinuumTest();
      });
    });

    describe('Cart Coupon', () => {
      before(() => {
        const auth = JSON.parse(localStorage.getItem(getAuthStorageKey()));
        cy.addToCart('779841', 1, auth.token.access_token);
      });

      it('add coupon', () => {
        cy.visit('/cart');
        cy.contains('cx-cart-coupon', 'Add a coupon').a11yRunContinuumTest();
      });

      it('available coupons', () => {
        cy.get('.cx-available-coupon').a11yRunContinuumTest();
      });

      it('applied coupons', () => {
        cy.findByText(/customerCoupon1/).click();
        cy.contains(
          'cx-applied-coupons',
          'customerCoupon1'
        ).a11yRunContinuumTest();
        cy.get('cx-cart-coupon').a11yRunContinuumTest();
      });
    });
  });
});
