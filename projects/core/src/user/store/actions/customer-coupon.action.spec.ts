import { CUSTOMER_COUPONS } from '../user-state';
import {
  loadMeta,
  failMeta,
  successMeta,
} from '../../../state/utils/loader/loader.action';
import {
  CustomerCoupon,
  CustomerCouponSearchResult,
} from '../../../model/customer-coupon.model';

import * as fromCustomerCouponsAction from './customer-coupon.action';

const userId = '123';
const pageSize = 5;
const currentPage = 1;
const sort = '';
const couponCode = 'testcoupon';

const coupon1: CustomerCoupon = {
  couponId: 'coupon1',
  name: 'coupon 1',
  startDate: new Date(),
  endDate: new Date(),
  status: 'Effective',
  description: '',
  notificationOn: '',
  solrFacets: '',
};
const coupon2: CustomerCoupon = {
  couponId: 'coupon2',
  name: 'coupon 2',
  startDate: new Date(),
  endDate: new Date(),
  status: 'Effective',
  description: '',
  notificationOn: '',
  solrFacets: '',
};

const mockCustomerCoupons: CustomerCoupon[] = [coupon1, coupon2];

const customerSearcherResult: CustomerCouponSearchResult = {
  coupons: mockCustomerCoupons,
  sorts: {},
  pagination: {},
};

describe('User Coupon Actions', () => {
  describe('LoadCustomerCoupons Actions', () => {
    it('should create the action', () => {
      const action = new fromCustomerCouponsAction.LoadCustomerCoupons({
        userId,
        pageSize,
        currentPage,
        sort,
      });

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.LOAD_CUSTOMER_COUPONS,
        payload: { userId, pageSize, currentPage, sort },
        meta: loadMeta(CUSTOMER_COUPONS),
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
        type: fromCustomerCouponsAction.LOAD_CUSTOMER_COUPONS_FAIL,
        payload: error,
        meta: failMeta(CUSTOMER_COUPONS, error),
      });
    });
  });

  describe('LoadCustomerCouponsSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromCustomerCouponsAction.LoadCustomerCouponsSuccess(
        customerSearcherResult
      );

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.LOAD_CUSTOMER_COUPONS_SUCCESS,
        payload: customerSearcherResult,
        meta: successMeta(CUSTOMER_COUPONS),
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
        meta: loadMeta(CUSTOMER_COUPONS),
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
        meta: failMeta(CUSTOMER_COUPONS, error),
      });
    });
  });

  describe('SubscribeCustomerCouponSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromCustomerCouponsAction.SubscribeCustomerCouponSuccess(
        coupon1
      );

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.SUBSCRIBE_CUSTOMER_COUPON_SUCCESS,
        payload: coupon1,
        meta: successMeta(CUSTOMER_COUPONS),
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
        meta: loadMeta(CUSTOMER_COUPONS),
      });
    });
  });

  describe('UnsubscribeCustomerCouponFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromCustomerCouponsAction.UnsubscribeCustomerCouponFail(
        error
      );

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.UNSUBSCRIBE_CUSTOMER_COUPON_FAIL,
        payload: error,
        meta: failMeta(CUSTOMER_COUPONS, error),
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
        payload: 'success',
        meta: successMeta(CUSTOMER_COUPONS),
      });
    });
  });
});
