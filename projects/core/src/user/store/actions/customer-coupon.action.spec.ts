import {
  CUSTOMER_COUPONS,
  SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID,
  UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID,
  CLAIM_CUSTOMER_COUPON_PROCESS_ID,
} from '../user-state';
import {
  loadMeta,
  failMeta,
  successMeta,
} from '../../../state/utils/loader/loader.action';
import {
  entityFailMeta,
  entityLoadMeta,
  entitySuccessMeta,
  entityResetMeta,
} from '../../../state';
import {
  CustomerCoupon,
  CustomerCouponSearchResult,
  CustomerCouponNotification,
  CustomerCoupon2Customer,
} from '../../../model/customer-coupon.model';

import { PROCESS_FEATURE } from '../../../process/store';

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

const customerCouponNotification: CustomerCouponNotification = {
  coupon: coupon1,
  customer: {},
  status: '',
};

const mockCustomerCoupons: CustomerCoupon[] = [coupon1, coupon2];

const customerSearcherResult: CustomerCouponSearchResult = {
  coupons: mockCustomerCoupons,
  sorts: [],
  pagination: {},
};

const customerCoupon2Customer: CustomerCoupon2Customer = {
  coupon: coupon1,
  customer: {},
};

describe('Customer Coupon Actions', () => {
  describe('LoadCustomerCoupons Action', () => {
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
        meta: entityLoadMeta(
          PROCESS_FEATURE,
          SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID
        ),
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
        meta: entityFailMeta(
          PROCESS_FEATURE,
          SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('SubscribeCustomerCouponSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromCustomerCouponsAction.SubscribeCustomerCouponSuccess(
        customerCouponNotification
      );

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.SUBSCRIBE_CUSTOMER_COUPON_SUCCESS,
        payload: customerCouponNotification,
        meta: entitySuccessMeta(
          PROCESS_FEATURE,
          SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID
        ),
      });
    });
  });

  describe('ResetSubscribeCustomerCouponProcess Action', () => {
    it('should create the action', () => {
      const action = new fromCustomerCouponsAction.ResetSubscribeCustomerCouponProcess();

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.RESET_SUBSCRIBE_CUSTOMER_COUPON_PROCESS,
        meta: entityResetMeta(
          PROCESS_FEATURE,
          SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID
        ),
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
        meta: entityLoadMeta(
          PROCESS_FEATURE,
          UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID
        ),
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
        meta: entityFailMeta(
          PROCESS_FEATURE,
          UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('UnsubscribeCustomerCouponSuccess Action', () => {
    it('should create the action', () => {
      const success = 'mockSuccess';
      const action = new fromCustomerCouponsAction.UnsubscribeCustomerCouponSuccess(
        success
      );

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.UNSUBSCRIBE_CUSTOMER_COUPON_SUCCESS,
        payload: success,
        meta: entitySuccessMeta(
          PROCESS_FEATURE,
          UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID
        ),
      });
    });
  });

  describe('ResetUnsubscribeCustomerCouponProcess Action', () => {
    it('should create the action', () => {
      const action = new fromCustomerCouponsAction.ResetUnsubscribeCustomerCouponProcess();

      expect({ ...action }).toEqual({
        type:
          fromCustomerCouponsAction.RESET_UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS,
        meta: entityResetMeta(
          PROCESS_FEATURE,
          UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID
        ),
      });
    });
  });

  describe('ClaimCustomerCoupon Action', () => {
    it('should create the action', () => {
      const action = new fromCustomerCouponsAction.ClaimCustomerCoupon({
        userId,
        couponCode,
      });

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.CLAIM_CUSTOMER_COUPON,
        payload: { userId, couponCode },
        meta: entityLoadMeta(PROCESS_FEATURE, CLAIM_CUSTOMER_COUPON_PROCESS_ID),
      });
    });
  });

  describe('ClaimCustomerCouponFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromCustomerCouponsAction.ClaimCustomerCouponFail(
        error
      );

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.CLAIM_CUSTOMER_COUPON_FAIL,
        payload: error,
        meta: entityFailMeta(
          PROCESS_FEATURE,
          CLAIM_CUSTOMER_COUPON_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('ClaimCustomerCouponSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromCustomerCouponsAction.ClaimCustomerCouponSuccess(
        customerCoupon2Customer
      );

      expect({ ...action }).toEqual({
        type: fromCustomerCouponsAction.CLAIM_CUSTOMER_COUPON_SUCCESS,
        payload: customerCoupon2Customer,
        meta: entitySuccessMeta(
          PROCESS_FEATURE,
          CLAIM_CUSTOMER_COUPON_PROCESS_ID
        ),
      });
    });
  });
});
