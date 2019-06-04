import { USER_COUPONS } from '../user-state';
import {
  loadMeta,
  failMeta,
  successMeta,
} from '../../../state/utils/loader/loader.action';

import * as fromUserCouponsAction from './user-addresses.action';
import { CustomerCoupon } from '../../../model/customer-coupon.model';

const userId = '123';
const couponCode = 'testcoupon';
const coupon1: CustomerCoupon = {
  couponId: 'coupon1',
  name: 'coupon 1',
  startDate: new Date(),
  endDate: new Date(),
  status: 'Effective',
  description: '',
  notificationOn: true,
  solrFacets: '',
};
const coupon2: CustomerCoupon = {
  couponId: 'coupon2',
  name: 'coupon 2',
  startDate: new Date(),
  endDate: new Date(),
  status: 'Effective',
  description: '',
  notificationOn: true,
  solrFacets: '',
};

describe('User Coupon Actions', () => {
  describe('LoadUserCoupons Actions', () => {
    it('should create the action', () => {
      const action = new fromUserCouponsAction.LoadUserCoupons(userId);

      expect({ ...action }).toEqual({
        type: fromUserCouponsAction.LOAD_USER_COUPONS,
        payload: userId,
        meta: loadMeta(USER_COUPONS),
      });
    });
  });

  describe('LoadUserCouponsFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromUserCouponsAction.LoadUserCouponsFail(error);

      expect({ ...action }).toEqual({
        type: fromUserCouponsAction.LOAD_USER_COUPONS_FAIL,
        payload: error,
        meta: failMeta(USER_COUPONS, error),
      });
    });
  });

  describe('LoadUserCouponsSuccess Action', () => {
    const mockUserCoupons: CustomerCoupon[] = [{ coupon1 }, { coupon2 }];

    it('should create the action', () => {
      const action = new fromUserCouponsAction.LoadUserCouponsSuccess(
        mockUserCoupons
      );

      expect({ ...action }).toEqual({
        type: fromUserCouponsAction.LOAD_USER_COUPONS_SUCCESS,
        payload: mockUserCoupons,
        meta: successMeta(USER_COUPONS),
      });
    });
  });

  describe('SubscribeCustomerCoupon Actions', () => {
    it('should create the action', () => {
      const action = new fromUserCouponsAction.SubscribeCustomerCoupon({
        userId,
        couponCode,
      });

      expect({ ...action }).toEqual({
        type: fromUserCouponsAction.SUBSCRIBE_CUSTOMER_COUPON,
        payload: { userId, couponCode },
        meta: loadMeta(USER_COUPONS),
      });
    });
  });

  describe('SubscribeCustomerCouponFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromUserCouponsAction.SubscribeCustomerCouponFail(
        error
      );

      expect({ ...action }).toEqual({
        type: fromUserCouponsAction.SUBSCRIBE_CUSTOMER_COUPON_FAIL,
        payload: error,
        meta: failMeta(USER_COUPONS, error),
      });
    });
  });

  describe('SubscribeCustomerCouponSuccess Action', () => {
    const payload = 'success';

    it('should create the action', () => {
      const action = new fromUserCouponsAction.SubscribeCustomerCouponSuccess(
        payload
      );

      expect({ ...action }).toEqual({
        type: fromUserCouponsAction.SUBSCRIBE_CUSTOMER_COUPON_SUCCESS,
        payload: payload,
        meta: successMeta(USER_COUPONS),
      });
    });
  });

  describe('UnsubscribeCustomerCoupon Actions', () => {
    it('should create the action', () => {
      const action = new fromUserCouponsAction.UnsubscribeCustomerCoupon({
        userId,
        couponCode,
      });

      expect({ ...action }).toEqual({
        type: fromUserCouponsAction.UNSUBSCRIBE_CUSTOMER_COUPON,
        payload: { userId, couponCode },
        meta: loadMeta(USER_COUPONS),
      });
    });
  });

  describe('UnsubscribeCustomerCouponFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromUserCouponsAction.UnsubscribeCustomerCouponFailressFail(
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
      const action = new fromUserCouponsAction.UnsubscribeCustomerCouponSuccess(
        payload
      );

      expect({ ...action }).toEqual({
        type: fromUserCouponsAction.UNSUBSCRIBE_CUSTOMER_COUPON_SUCCESS,
        payload: payload,
        meta: successMeta(USER_COUPONS),
      });
    });
  });
});
