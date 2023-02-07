/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cartCoupon from '../../../helpers/coupons/cart-coupon';
import { clearCacheCy12 } from '../../../helpers/utils-cypress12';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Cart Coupon', { testIsolation: false }, () => {
  // beforeEach(() => {
  //   cy.clearLocalStorage();
  //   cy.clearCookies();
  // });
  clearCacheCy12();

  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.requireLoggedIn();
    });

    // TODO. Core test. Move to helper after GH-14500
    it('should apply cart coupon', () => {
      const stateAuth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
      cartCoupon.visitProductPage(cartCoupon.productCode1);

      //TODO products can be added to cart asynchronously
      cartCoupon.addProductToCart(cartCoupon.productCode1);
      cartCoupon.applyCoupon(cartCoupon.couponForCart);
      cartCoupon.goThroughCheckout(stateAuth.token).then(() => {
        cartCoupon.verifyCouponInReviewOrder(cartCoupon.couponForCart);
      });
    });
  });
});
