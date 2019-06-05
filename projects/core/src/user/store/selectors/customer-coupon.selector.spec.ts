import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, select } from '@ngrx/store';

import { StateWithUser, CUSTOMER_COUPONS } from '../user-state';
import * as fromActions from '../actions/index';
import * as fromReducers from '../reducers/index';
import * as fromSelectors from '../selectors/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';

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

const customerCouponSearchResult: CustomerCouponSearchResult = {
  coupons: mockCustomerCoupons,
  sorts: {},
  pagination: {},
};

const customerCouponNotification: CustomerCouponNotification = {
  coupon: {},
  customer: {},
  status: '',
};

describe('Customer Coupon Selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CUSTOMER_COUPONS, fromReducers.getReducers()),
      ],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getCustomerCouponsLoaderState', () => {
    it('should return customerCoupons state', () => {
      let result: LoaderState<CustomerCoupon[]>;
      store.pipe(
        select(fromSelectors.getCustomerCouponsLoaderState)
          .subscribe(value => (result = value))
          .unsubscribe()
      );

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: [],
      });
    });
  });

  describe('getCustomerCoupons', () => {
    it('should return customerCoupons', () => {
      let result: CustomerCouponSearchResult;
      store
        .pipe(select(fromSelectors.getCustomerCoupons))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(
        new fromActions.LoadCustomerCouponsSuccess(customerCouponSearchResult)
      );

      expect(result).toEqual(customerCouponSearchResult);
    });
  });
});
