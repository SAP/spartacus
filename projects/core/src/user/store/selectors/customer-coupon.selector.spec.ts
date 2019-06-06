import { TestBed } from '@angular/core/testing';

import { Store, StoreModule, select } from '@ngrx/store';

import { StateWithUser, USER_FEATURE } from '../user-state';
import * as fromActions from '../actions/index';
import * as fromReducers from '../reducers/index';
import * as fromSelectors from '../selectors/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  CustomerCoupon,
  CustomerCouponSearchResult,
} from '../../../model/customer-coupon.model';
const coupon: CustomerCoupon = {
  couponId: 'coupon',
  name: 'coupon',
  startDate: new Date(),
  endDate: new Date(),
  status: 'Effective',
  description: '',
  notificationOn: '',
  solrFacets: '',
};

const customerSearcherResult: CustomerCouponSearchResult = {
  coupons: [coupon],
  pagination: {
    currentPage: 1,
    pageSize: 5,
  },
  sorts: { code: 'byPage' },
};

const emptyCustomerSearcherResult: CustomerCouponSearchResult = {
  coupons: [],
  pagination: {},
  sorts: {},
};

describe('User Orders Selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getOrdersLoaderState', () => {
    it('should return orders state', () => {
      let result: LoaderState<CustomerCouponSearchResult>;
      store
        .pipe(select(fromSelectors.getCustomerCouponsState))
        .subscribe(value => (result = value))
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
    it('should return a user Orders', () => {
      let result: CustomerCouponSearchResult;
      store
        .pipe(select(fromSelectors.getCustomerCoupons))
        .subscribe(value => (result = value));

      expect(result).toEqual(emptyCustomerSearcherResult);

      store.dispatch(
        new fromActions.LoadCustomerCouponsSuccess(customerSearcherResult)
      );
      expect(result).toEqual(customerSearcherResult);
    });
  });

  describe('getCustomerCouponsLoaded', () => {
    it('should return success flag of orders state', () => {
      let result: boolean;
      store
        .pipe(select(fromSelectors.getCustomerCouponsLoaded))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(
        new fromActions.LoadCustomerCouponsSuccess(customerSearcherResult)
      );
      expect(result).toEqual(true);
    });
  });
});
