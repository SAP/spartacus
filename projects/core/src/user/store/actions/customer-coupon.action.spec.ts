import { USER_COUPONS } from '../user-state';
import {
  loadMeta,
  failMeta,
  successMeta,
} from '../../../state/utils/loader/loader.action';

import * as fromCustomerCouponsAction from './user-addresses.action';
import { CustomerCoupon } from '../../../model/customer-coupon.model';

const userId = '123';
const couponCode = 'testcoupon';

describe('User Coupon Actions', () => {
  describe('LoadCustomerCoupons Actions', () => {
    it('should create the action', () => {
      const action = new fromCustomerCouponsAction.LoadCustomerCoupons(userId);

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.LOAD_USER_COUPONS,
        payload: userId,
        meta: loadMeta(USER_COUPONS),
      });
    });
  });

  describe('LoadCustomerCouponsFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromCustomerCouponsAction.LoadCustomerCouponsFail(
        error
      );

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.LOAD_USER_COUPONS_FAIL,
        payload: error,
        meta: failMeta(USER_COUPONS, error),
      });
    });
  });

  describe('LoadCustomerCouponsSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromCustomerCouponsAction.LoadCustomerCouponsSuccess(
        mockCustomerCoupons
      );

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.LOAD_USER_COUPONS_SUCCESS,
        payload: userId,
        meta: successMeta(USER_COUPONS),
      });
    });
  });

  describe('SubscribeCustomerCoupon Actions', () => {
    it('should create the action', () => {
      const action = new fromCustomerCouponsAction.SubscribeCustomerCoupon({
        userId,
        couponCode,
      });

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.SUBSCRIBE_CUSTOMER_COUPON,
        payload: { userId, couponCode },
        meta: loadMeta(USER_COUPONS),
      });
    });
  });

  describe('SubscribeCustomerCouponFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromCustomerCouponsAction.SubscribeCustomerCouponFail(
        error
      );

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.SUBSCRIBE_CUSTOMER_COUPON_FAIL,
        payload: error,
        meta: failMeta(USER_COUPONS, error),
      });
    });
  });

  describe('SubscribeCustomerCouponSuccess Action', () => {
    const payload = 'success';

    it('should create the action', () => {
      const action = new fromCustomerCouponsAction.SubscribeCustomerCouponSuccess(
        payload
      );

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.SUBSCRIBE_CUSTOMER_COUPON_SUCCESS,
        payload: { userId, couponCode },
        meta: successMeta(USER_COUPONS),
      });
    });
  });

  describe('UnsubscribeCustomerCoupon Actions', () => {
    it('should create the action', () => {
      const action = new fromCustomerCouponsAction.UnsubscribeCustomerCoupon({
        userId,
        couponCode,
      });

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.UNSUBSCRIBE_CUSTOMER_COUPON,
        payload: { userId, couponCode },
        meta: loadMeta(USER_COUPONS),
      });
    });
  });

  describe('UnsubscribeCustomerCouponFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromCustomerCouponsAction.UnsubscribeCustomerCouponFailressFail(
        error
      );

      expect({ ...action }).toEqual({
        type: fromUserAddressesAction.SUBSCRIBE_CUSTOMER_COUPON_FAIL,
        payload: error,
        meta: failMeta(USER_COUPONS, error),
      });
    });
  });

  describe('UnsubscribeCustomerCouponSuccess Action', () => {
    const payload = 'success';

    it('should create the action', () => {
      const action = new fromCustomerCouponsAction.UnsubscribeCustomerCouponSuccess(
        payload
      );

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.UNSUBSCRIBE_CUSTOMER_COUPON_SUCCESS,
        payload: { userId, couponCode },
        meta: successMeta(USER_COUPONS),
      });
    });
  });
});
