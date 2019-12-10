import * as fromActions from '../actions/customer-coupon.action';
import {
  CustomerCoupon,
  CustomerCouponSearchResult,
} from '../../../model/customer-coupon.model';

export const initialState: CustomerCouponSearchResult = {
  coupons: [],
  sorts: [],
  pagination: {},
};
export function reducer(
  state = initialState,
  action: fromActions.CustomerCouponAction
): CustomerCouponSearchResult {
  switch (action.type) {
    case fromActions.LOAD_CUSTOMER_COUPONS_SUCCESS: {
      return action.payload;
    }

    case fromActions.SUBSCRIBE_CUSTOMER_COUPON_SUCCESS: {
      const updatedCustomerCoupon = action.payload.coupon;
      const customerCoupons = new Array<CustomerCoupon>(state.coupons.length);
      state.coupons.forEach((customerCoupon: CustomerCoupon, index) =>
        customerCoupon.couponId === updatedCustomerCoupon.couponId
          ? (customerCoupons[index] = updatedCustomerCoupon)
          : (customerCoupons[index] = customerCoupon)
      );
      return { ...state, coupons: customerCoupons };
    }

    case fromActions.UNSUBSCRIBE_CUSTOMER_COUPON_SUCCESS: {
      const updatedCouponCode = action.payload;
      const customerCoupons = new Array<CustomerCoupon>(state.coupons.length);
      state.coupons.forEach((customerCoupon: CustomerCoupon, index) =>
        customerCoupon.couponId === updatedCouponCode
          ? (customerCoupons[index] = {
              ...customerCoupon,
              notificationOn: false,
            })
          : (customerCoupons[index] = customerCoupon)
      );
      return { ...state, coupons: customerCoupons };
    }
  }
  return state;
}
