import * as fromCustomerCouponsAction from '../actions/customer-coupon.action';

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

const couponNotification: CustomerCouponNotification = {
  coupon: coupon1,
  customer: {},
  status: '',
};

describe('CustomerCoupon Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCustomerCouponsReducer;
      const action = {} as fromCustomerCouponsAction.CustomerCouponAction;
      const state = fromCustomerCouponsReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_CUSTOMER_COUPON_SUCCESS action', () => {
    it('should populate the customer coupons state', () => {
      const { initialState } = fromCustomerCouponsReducer;
      const action = new fromCustomerCouponsAction.LoadCustomerCouponsSuccess(
        customerSearcherResult
      );
      const state = fromCustomerCouponsReducer.reducer(initialState, action);

      expect(state).toEqual(customerSearcherResult);
    });
  });

  describe('SUBSCRIBE_CUSTOMER_COUPON action', () => {
    it('should populate the customerCoupon notification state', () => {
      const { initialState } = fromCustomerCouponsReducer;
      const action = new fromCustomerCouponsAction.SubscribeCustomerCoupon({
        userId: 'user_id',
        couponCode: 'coupon_code',
      });
      const state = fromCustomerCouponsReducer.reducer(initialState, action);

      expect(state).toEqual('on');
    });
  });

  describe('UNSUBSCRIBE_CUSTOMER_COUPON action', () => {
    it('should populate the customer coupons state', () => {
      const { initialState } = fromCustomerCouponsReducer;
      const action = new fromCustomerCouponsAction.UnsubscribeCustomerCoupon({
        userId: 'user_id',
        couponCode: 'coupon_code',
      });
      const state = fromCustomerCouponsReducer.reducer(initialState, action);

      expect(state).toEqual('off');
    });
  });
});
