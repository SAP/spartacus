import { UserActions } from '../actions/index';

import * as fromCustomerCouponsReducer from './customer-coupon.reducer';
import {
  CustomerCoupon,
  CustomerCouponSearchResult,
  CustomerCouponNotification,
} from '../../../model/customer-coupon.model';

const coupon1: CustomerCoupon = {
  couponId: 'coupon1',
  name: 'coupon 1',
  startDate: new Date(),
  endDate: new Date(),
  status: 'Effective',
  description: '',
  notificationOn: false,
  allProductsApplicable: false,
};

const coupon2: CustomerCoupon = {
  couponId: 'coupon1',
  name: 'coupon 2',
  startDate: new Date(),
  endDate: new Date(),
  status: 'Effective',
  description: '',
  notificationOn: true,
  allProductsApplicable: false,
};

const mockCustomerCoupons1: CustomerCoupon[] = [coupon1];
const mockCustomerCoupons2: CustomerCoupon[] = [coupon2];

const customerSearcherResult1: CustomerCouponSearchResult = {
  coupons: mockCustomerCoupons1,
  sorts: [],
  pagination: {},
};

const customerSearcherResult2: CustomerCouponSearchResult = {
  coupons: mockCustomerCoupons2,
  sorts: [],
  pagination: {},
};

const customerCouponNotification: CustomerCouponNotification = {
  coupon: coupon1,
  customer: {},
  status: '',
};

describe('CustomerCoupon Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCustomerCouponsReducer;
      const action = {} as UserActions.CustomerCouponAction;
      const state = fromCustomerCouponsReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_CUSTOMER_COUPON_SUCCESS action', () => {
    it('should populate the customer coupon state', () => {
      const { initialState } = fromCustomerCouponsReducer;
      const action = new UserActions.LoadCustomerCouponsSuccess(
        customerSearcherResult1
      );
      const state = fromCustomerCouponsReducer.reducer(initialState, action);

      expect(state).toEqual(customerSearcherResult1);
    });
  });

  describe('SUBSCRIBE_CUSTOMER_COUPON_SUCCESS action', () => {
    it('should populate the customer coupon state', () => {
      const action = new UserActions.SubscribeCustomerCouponSuccess(
        customerCouponNotification
      );
      const state = fromCustomerCouponsReducer.reducer(
        customerSearcherResult1,
        action
      );

      expect(state.coupons[0].notificationOn).toEqual(true);
    });
  });

  describe('UNSUBSCRIBE_CUSTOMER_COUPON_SUCCESS action', () => {
    it('should populate the customer coupon state', () => {
      const action = new UserActions.UnsubscribeCustomerCouponSuccess(
        'coupon1'
      );
      const state = fromCustomerCouponsReducer.reducer(
        customerSearcherResult2,
        action
      );

      expect(state.coupons[0].notificationOn).toEqual(false);
    });
  });
});
