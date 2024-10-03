/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckoutConfig } from '@spartacus/storefront';
import { getStateAuth } from '../../../helpers/auth';
import * as cart from '../../../helpers/cart';
import * as cartCoupon from '../../../helpers/coupons/cart-coupon';
import { signOut } from '../../../helpers/register';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Cart Coupon', () => {
  viewportContext(['mobile', 'desktop'], () => {
    describe('Logged user', () => {
      beforeEach(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        cy.requireLoggedIn();
      });
      it('should show error message when applied a wrong coupon', () => {
        cartCoupon.visitProductPage(cartCoupon.productCode1);
        cartCoupon.addProductToCart(cartCoupon.productCode1);
        cartCoupon.applyWrongCoupon();
      });

      it('should apply product category coupon', () => {
        const stateAuth = getStateAuth();
        cartCoupon.visitProductPage(cartCoupon.productCode2);
        cartCoupon.addProductToCart(cartCoupon.productCode2);
        cartCoupon.applyCoupon(cartCoupon.couponForProduct);
        cartCoupon.goThroughCheckout(stateAuth.token).then(() => {
          cartCoupon.verifyCouponInReviewOrder(cartCoupon.couponForProduct);
        });
      });

      it('should apply gift product coupon', () => {
        const stateAuth = getStateAuth();
        cartCoupon.visitProductPage(cartCoupon.productCode3);
        cartCoupon.addProductToCart(cartCoupon.productCode3);
        cartCoupon.applyCoupon(cartCoupon.freeGiftCoupon);
        cartCoupon.verifyGiftProductCoupon(cartCoupon.giftProductCode);
        cartCoupon.goThroughCheckout(stateAuth.token).then(() => {
          cartCoupon.verifyCouponInReviewOrder(cartCoupon.freeGiftCoupon);
        });
      });

      it('should be able to remove coupon and place order without it', () => {
        const stateAuth = getStateAuth();
        cartCoupon.visitProductPage(cartCoupon.productCode1);
        cartCoupon.addProductToCart(cartCoupon.productCode1);
        cartCoupon.applyCoupon(cartCoupon.couponForCart);
        cartCoupon.removeCoupon(cartCoupon.couponForCart);

        cartCoupon.goThroughCheckout(stateAuth.token).then(() => {
          cartCoupon.verifyCouponInReviewOrder();
        });
      });
    });

    describe('Anonymous And Logged User', () => {
      let cartUser;
      beforeEach(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        cartUser = cartCoupon.getCartUser();
        cart.registerCartUser(cartUser);
      });

      it('should keep cart coupons after signing in', () => {
        cartCoupon.visitProductPage(cartCoupon.productCode1);
        cartCoupon.addProductToCart(cartCoupon.productCode1);
        cartCoupon.applyCoupon(
          cartCoupon.couponForCart,
          cartCoupon.UserType.ANONYMOUS
        );
        cart.loginCartUser(cartUser).then(() => {
          const stateAuth = getStateAuth();
          cartCoupon.goThroughCheckout(stateAuth.token).then(() => {
            cartCoupon.verifyCouponInReviewOrder(cartCoupon.couponForCart);
          });
        });
      });

      it('should merge anonymous cart with coupon and user cart with coupon', () => {
        cart.loginCartUser(cartUser).then(() => {
          cartCoupon.visitProductPage(cartCoupon.productCode1);
          cartCoupon.addProductToCart(cartCoupon.productCode1);
          cartCoupon.applyCoupon(cartCoupon.couponForCart);
        });
        signOut().then(() => {
          cartCoupon.visitProductPage(cartCoupon.productCode2);
          cartCoupon.addProductToCart(cartCoupon.productCode2);
          cartCoupon.applyCoupon(
            cartCoupon.couponForProduct,
            cartCoupon.UserType.ANONYMOUS
          );
        });
        cart.loginCartUser(cartUser).then(() => {
          const stateAuth = getStateAuth();
          cartCoupon.goThroughCheckout(stateAuth.token).then(() => {
            cartCoupon.verifyCouponInReviewOrder(cartCoupon.couponForCart);
          });
        });
      });

      it('should merge anonymous cart with coupon and user cart without coupon', () => {
        cart.loginCartUser(cartUser).then(() => {
          cartCoupon.visitProductPage(cartCoupon.productCode1);
          cartCoupon.addProductToCart(cartCoupon.productCode1);
        });
        signOut().then(() => {
          cartCoupon.visitProductPage(cartCoupon.productCode2);
          cartCoupon.addProductToCart(cartCoupon.productCode2);
          cartCoupon.applyCoupon(
            cartCoupon.couponForCart,
            cartCoupon.UserType.ANONYMOUS
          );
        });
        cart.loginCartUser(cartUser).then(() => {
          const stateAuth = getStateAuth();
          cartCoupon.goThroughCheckout(stateAuth.token).then(() => {
            cartCoupon.verifyCouponInReviewOrder(cartCoupon.couponForCart);
          });
        });
      });
    });

    describe('Express Checkout', () => {
      let cartUser;
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        cy.cxConfig({
          checkout: { express: true, defaultDeliveryMode: ['MOST_EXPENSIVE'] },
        } as CheckoutConfig);
      });

      beforeEach(() => {
        cartUser = cartCoupon.getCartUserForExpressCheckout();
        cart.registerCartUser(cartUser);
        cart.loginCartUser(cartUser);
      });

      it('should keep applied coupons during express checkout', () => {
        const stateAuth = getStateAuth();
        cartCoupon.visitProductPage(cartCoupon.productCode1);
        cartCoupon.addProductToCart(cartCoupon.productCode1);
        cartCoupon.applyCoupon(cartCoupon.couponForCart);
        cartCoupon.goThroughCheckout(stateAuth.token).then(() => {
          cartCoupon.verifyCouponInReviewOrder(cartCoupon.couponForCart);
        });
      });
    });

    describe('Guest Checkout', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        cy.cxConfig({ checkout: { guest: true } } as CheckoutConfig);
      });

      it('should keep applied coupons during quest checkout', () => {
        cartCoupon.visitProductPage(cartCoupon.productCode1);
        cartCoupon.addProductToCart(cartCoupon.productCode1);
        cartCoupon.applyCouponAndProceedToGuestCheckout(
          cartCoupon.couponForCart
        );
        cartCoupon.goThroughGuestCheckout().then(() => {
          cartCoupon.verifyCouponInReviewOrder(cartCoupon.couponForCart);
        });
      });
    });
  });
});
