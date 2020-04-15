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
  startDate: '',
  endDate: '',
  status: 'Effective',
  description: '',
  notificationOn: false,
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

const stateCoupon1: CustomerCoupon = {
  couponId: 'coupon1',
  name: 'coupon 1',
  startDate: '',
  endDate: '',
  status: 'Effective',
  description: '',
  notificationOn: true,
  allProductsApplicable: false,
};

const stateCoupon2: CustomerCoupon = {
  couponId: 'coupon2',
  name: 'coupon 2',
  startDate: '',
  endDate: '',
  status: 'Effective',
  description: '',
  notificationOn: false,
  allProductsApplicable: false,
};

const mockCustomerCoupons1: CustomerCoupon[] = [coupon1];

const customerSearcherResult1: CustomerCouponSearchResult = {
  coupons: mockCustomerCoupons1,
  sorts: [],
  pagination: {},
};

const customerCouponNotification: CustomerCouponNotification = {
  coupon: coupon2,
  customer: {},
  status: '',
};

const MockinitialState: CustomerCouponSearchResult = {
  coupons: [stateCoupon1, stateCoupon2],
  sorts: [],
  pagination: {},
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
        MockinitialState,
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
        MockinitialState,
        action
      );

      expect(state.coupons[0].notificationOn).toEqual(false);
    });
  });
});
