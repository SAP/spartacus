import * as fromActions from '../actions/customer-coupon.action';
import { CustomerCouponSearchResult } from '../../../model/customer-coupon.model';

export const initialState: CustomerCouponSearchResult = {
  coupons: [],
  sorts: {},
  pagination: {},
};
export function reducer(
  state = initialState,
  action: fromActions.CustomerCouponAction
): CustomerCouponSearchResult {
  switch (action.type) {
    case fromActions.LOAD_CUSTOMER_COUPONS_FAIL: {
      return initialState;
    }

    case fromActions.LOAD_CUSTOMER_COUPONS_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }
  }
  return state;
}
