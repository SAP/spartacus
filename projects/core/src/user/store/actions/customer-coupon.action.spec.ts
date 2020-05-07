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
  resetMeta,
} from '../../../state/utils/loader/loader.action';
import { StateUtils } from '../../../state/utils/index';
import {
  CustomerCoupon,
  CustomerCouponSearchResult,
  CustomerCouponNotification,
  CustomerCoupon2Customer,
} from '../../../model/customer-coupon.model';

import { PROCESS_FEATURE } from '../../../process/store';

import { UserActions } from './index';

const userId = '123';
const pageSize = 5;
const currentPage = 1;
const sort = '';
const couponCode = 'testcoupon';

const coupon1: CustomerCoupon = {
  couponId: 'coupon1',
  name: 'coupon 1',
  startDate: '',
  endDate: '',
  status: 'Effective',
  description: '',
  notificationOn: true,
  allProductsApplicable: false,
};
const coupon2: CustomerCoupon = {
  couponId: 'coupon2',
  name: 'coupon 2',
  startDate: '',
  endDate: '',
  status: 'Effective',
  description: '',
  notificationOn: true,
  allProductsApplicable: false,
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
      const action = new UserActions.LoadCustomerCoupons({
        userId,
        pageSize,
        currentPage,
        sort,
      });

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_CUSTOMER_COUPONS,
        payload: { userId, pageSize, currentPage, sort },
        meta: loadMeta(CUSTOMER_COUPONS),
      });
    });
  });

  describe('LoadCustomerCouponsFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.LoadCustomerCouponsFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_CUSTOMER_COUPONS_FAIL,
        payload: error,
        meta: failMeta(CUSTOMER_COUPONS, error),
      });
    });
  });

  describe('LoadCustomerCouponsSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadCustomerCouponsSuccess(
        customerSearcherResult
      );

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_CUSTOMER_COUPONS_SUCCESS,
        payload: customerSearcherResult,
        meta: successMeta(CUSTOMER_COUPONS),
      });
    });
  });

  describe('ResetLoadCustomerCoupons', () => {
    it('should create the action', () => {
      const action = new UserActions.ResetLoadCustomerCoupons();

      expect({ ...action }).toEqual({
        type: UserActions.RESET_LOAD_CUSTOMER_COUPONS,
        meta: resetMeta(CUSTOMER_COUPONS),
      });
    });
  });

  describe('SubscribeCustomerCoupon Actions', () => {
    it('should create the action', () => {
      const action = new UserActions.SubscribeCustomerCoupon({
        userId,
        couponCode,
      });

      expect({ ...action }).toEqual({
        type: UserActions.SUBSCRIBE_CUSTOMER_COUPON,
        payload: { userId, couponCode },
        meta: StateUtils.entityLoadMeta(
          PROCESS_FEATURE,
          SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID
        ),
      });
    });
  });

  describe('SubscribeCustomerCouponFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.SubscribeCustomerCouponFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.SUBSCRIBE_CUSTOMER_COUPON_FAIL,
        payload: error,
        meta: StateUtils.entityFailMeta(
          PROCESS_FEATURE,
          SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('SubscribeCustomerCouponSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.SubscribeCustomerCouponSuccess(
        customerCouponNotification
      );

      expect({ ...action }).toEqual({
        type: UserActions.SUBSCRIBE_CUSTOMER_COUPON_SUCCESS,
        payload: customerCouponNotification,
        meta: StateUtils.entitySuccessMeta(
          PROCESS_FEATURE,
          SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID
        ),
      });
    });
  });

  describe('ResetSubscribeCustomerCouponProcess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.ResetSubscribeCustomerCouponProcess();

      expect({ ...action }).toEqual({
        type: UserActions.RESET_SUBSCRIBE_CUSTOMER_COUPON_PROCESS,
        meta: StateUtils.entityResetMeta(
          PROCESS_FEATURE,
          SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID
        ),
      });
    });
  });

  describe('UnsubscribeCustomerCoupon Actions', () => {
    it('should create the action', () => {
      const action = new UserActions.UnsubscribeCustomerCoupon({
        userId,
        couponCode,
      });

      expect({ ...action }).toEqual({
        type: UserActions.UNSUBSCRIBE_CUSTOMER_COUPON,
        payload: { userId, couponCode },
        meta: StateUtils.entityLoadMeta(
          PROCESS_FEATURE,
          UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID
        ),
      });
    });
  });

  describe('UnsubscribeCustomerCouponFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.UnsubscribeCustomerCouponFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.UNSUBSCRIBE_CUSTOMER_COUPON_FAIL,
        payload: error,
        meta: StateUtils.entityFailMeta(
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
      const action = new UserActions.UnsubscribeCustomerCouponSuccess(success);

      expect({ ...action }).toEqual({
        type: UserActions.UNSUBSCRIBE_CUSTOMER_COUPON_SUCCESS,
        payload: success,
        meta: StateUtils.entitySuccessMeta(
          PROCESS_FEATURE,
          UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID
        ),
      });
    });
  });

  describe('ResetUnsubscribeCustomerCouponProcess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.ResetUnsubscribeCustomerCouponProcess();

      expect({ ...action }).toEqual({
        type: UserActions.RESET_UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS,
        meta: StateUtils.entityResetMeta(
          PROCESS_FEATURE,
          UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID
        ),
      });
    });
  });

  describe('ClaimCustomerCoupon Action', () => {
    it('should create the action', () => {
      const action = new UserActions.ClaimCustomerCoupon({
        userId,
        couponCode,
      });

      expect({ ...action }).toEqual({
        type: UserActions.CLAIM_CUSTOMER_COUPON,
        payload: { userId, couponCode },
        meta: StateUtils.entityLoadMeta(
          PROCESS_FEATURE,
          CLAIM_CUSTOMER_COUPON_PROCESS_ID
        ),
      });
    });
  });

  describe('ClaimCustomerCouponFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.ClaimCustomerCouponFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.CLAIM_CUSTOMER_COUPON_FAIL,
        payload: error,
        meta: StateUtils.entityFailMeta(
          PROCESS_FEATURE,
          CLAIM_CUSTOMER_COUPON_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('ClaimCustomerCouponSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.ClaimCustomerCouponSuccess(
        customerCoupon2Customer
      );

      expect({ ...action }).toEqual({
        type: UserActions.CLAIM_CUSTOMER_COUPON_SUCCESS,
        payload: customerCoupon2Customer,
        meta: StateUtils.entitySuccessMeta(
          PROCESS_FEATURE,
          CLAIM_CUSTOMER_COUPON_PROCESS_ID
        ),
      });
    });
  });
});
