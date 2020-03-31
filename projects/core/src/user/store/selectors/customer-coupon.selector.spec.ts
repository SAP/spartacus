import { TestBed } from '@angular/core/testing';

import { select, Store, StoreModule } from '@ngrx/store';

import { StateWithUser, USER_FEATURE } from '../user-state';
import * as fromReducers from '../reducers/index';
import { UserActions } from '../actions/index';
import { UsersSelectors } from '../selectors/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  CustomerCoupon,
  CustomerCouponSearchResult,
} from '../../../model/customer-coupon.model';

const coupon: CustomerCoupon = {
  couponId: 'coupon',
  name: 'coupon',
  startDate: '',
  endDate: '',
  status: 'Effective',
  description: '',
  notificationOn: true,
};

const customerSearcherResult: CustomerCouponSearchResult = {
  coupons: [coupon],
  pagination: {
    count: 1,
    page: 4,
    totalCount: 11,
    totalPages: 5,
  },
  sorts: [],
};

const emptyCustomerSearcherResult: CustomerCouponSearchResult = {
  coupons: [],
  pagination: {},
  sorts: [],
};

describe('Customer Coupon Selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getCustomerCouponsState', () => {
    it('should return customer coupon state', () => {
      let result: LoaderState<CustomerCouponSearchResult>;
      store
        .pipe(select(UsersSelectors.getCustomerCouponsState))
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: emptyCustomerSearcherResult,
      });
    });
  });

  describe('getCustomerCoupons', () => {
    it('should return customer coupons', () => {
      let result: CustomerCouponSearchResult;
      store
        .pipe(select(UsersSelectors.getCustomerCoupons))
        .subscribe((value) => (result = value));

      expect(result).toEqual(emptyCustomerSearcherResult);

      store.dispatch(
        new UserActions.LoadCustomerCouponsSuccess(customerSearcherResult)
      );
      expect(result).toEqual(customerSearcherResult);
    });
  });

  describe('getCustomerCouponsLoaded', () => {
    it('should return success flag of orders state', () => {
      let result: boolean;
      store
        .pipe(select(UsersSelectors.getCustomerCouponsLoaded))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);

      store.dispatch(
        new UserActions.LoadCustomerCouponsSuccess(customerSearcherResult)
      );
      expect(result).toEqual(true);
    });
  });
});
