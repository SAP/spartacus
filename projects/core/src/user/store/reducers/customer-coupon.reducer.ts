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
      return action.payload ? action.payload : initialState;
    }

    case fromActions.SUBSCRIBE_CUSTOMER_COUPON_SUCCESS: {
      const updatedCustomerCoupon = action.payload.coupon;
      state.coupons.map((customerCoupon: CustomerCoupon) =>
        customerCoupon.couponId === updatedCustomerCoupon.couponId
          ? (customerCoupon.notificationOn = true)
          : customerCoupon
      );
      return { ...state };
    }

    case fromActions.UNSUBSCRIBE_CUSTOMER_COUPON_SUCCESS: {
      const updatedCouponCode = action.payload;
      state.coupons.map((customerCoupon: CustomerCoupon) =>
        customerCoupon.couponId === updatedCouponCode
          ? (customerCoupon.notificationOn = false)
          : customerCoupon
      );
      return { ...state };
    }
  }
  return state;
}
