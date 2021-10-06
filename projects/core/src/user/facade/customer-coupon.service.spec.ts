import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import {
  CustomerCoupon,
  CustomerCouponSearchResult,
} from '../../model/customer-coupon.model';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { CustomerCouponService } from './customer-coupon.service';

describe('CustomerCouponService', () => {
  const coupon: CustomerCoupon = {
    couponId: 'coupon',
    name: 'coupon',
    startDate: '',
    endDate: '',
    status: 'Effective',
    description: '',
    notificationOn: true,
  };

  class MockUserIdService implements Partial<UserIdService> {
    takeUserId() {
      return of(OCC_USER_ID_CURRENT);
    }
  }

  let service: CustomerCouponService;
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromStoreReducers.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        CustomerCouponService,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.inject(CustomerCouponService);
  });

  it('should be able to load customer coupons data', () => {
    service.loadCustomerCoupons(10, 1, 'byDate');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.LoadCustomerCoupons({
        userId: OCC_USER_ID_CURRENT,
        pageSize: 10,
        currentPage: 1,
        sort: 'byDate',
      })
    );
  });

  it('should be able to get customer coupon list', () => {
    store.dispatch(
      new UserActions.LoadCustomerCouponsSuccess({
        coupons: [],
        pagination: {},
        sorts: [],
      })
    );

    let customerCouponSearchResult: CustomerCouponSearchResult;
    service
      .getCustomerCoupons(1)
      .subscribe((data) => {
        customerCouponSearchResult = data;
      })
      .unsubscribe();
    expect(customerCouponSearchResult).toEqual({
      coupons: [],
      pagination: {},
      sorts: [],
    });
  });

  it('should be able to get customer coupon list loaded flag', () => {
    store.dispatch(new UserActions.LoadCustomerCouponsSuccess({}));

    let customerCouponLoaded: boolean;
    service
      .getCustomerCouponsLoaded()
      .subscribe((data) => {
        customerCouponLoaded = data;
      })
      .unsubscribe();
    expect(customerCouponLoaded).toEqual(true);
  });

  it('should be able to get customer coupon list loading flag', () => {
    store.dispatch(
      new UserActions.LoadCustomerCoupons({
        userId: OCC_USER_ID_CURRENT,
        pageSize: 10,
        currentPage: 1,
        sort: 'byDate',
      })
    );

    let customerCouponLoaded: boolean;
    service
      .getCustomerCouponsLoading()
      .subscribe((data) => {
        customerCouponLoaded = data;
      })
      .unsubscribe();
    expect(customerCouponLoaded).toEqual(true);
  });

  it('should be able to subscribe customer coupons', () => {
    service.subscribeCustomerCoupon('couponCode');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.SubscribeCustomerCoupon({
        userId: OCC_USER_ID_CURRENT,
        couponCode: 'couponCode',
      })
    );
  });

  it('should getSubscribeCustomerCouponResultLoading() return loading flag', () => {
    store.dispatch(
      new UserActions.SubscribeCustomerCoupon({
        userId: OCC_USER_ID_CURRENT,
        couponCode: 'couponCode',
      })
    );

    let result = false;
    service
      .getSubscribeCustomerCouponResultLoading()
      .subscribe((loading) => (result = loading))
      .unsubscribe();

    expect(result).toEqual(true);
  });

  it('should getSubscribeCustomerCouponResultSuccess() return the success flag', () => {
    store.dispatch(new UserActions.SubscribeCustomerCouponSuccess(coupon));

    let result = false;
    service
      .getSubscribeCustomerCouponResultSuccess()
      .subscribe((loading) => (result = loading))
      .unsubscribe();

    expect(result).toEqual(true);
  });

  it('should getSubscribeCustomerCouponResultError() return the error flag', () => {
    store.dispatch(new UserActions.SubscribeCustomerCouponFail('error'));

    let result = false;
    service
      .getSubscribeCustomerCouponResultError()
      .subscribe((loading) => (result = loading))
      .unsubscribe();

    expect(result).toEqual(true);
  });

  it('should be able to unsubscribe customer coupons', () => {
    service.unsubscribeCustomerCoupon('couponCode');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.UnsubscribeCustomerCoupon({
        userId: OCC_USER_ID_CURRENT,
        couponCode: 'couponCode',
      })
    );
  });

  it('should getUnsubscribeCustomerCouponResultLoading() return loading flag', () => {
    store.dispatch(
      new UserActions.UnsubscribeCustomerCoupon({
        userId: OCC_USER_ID_CURRENT,
        couponCode: 'couponCode',
      })
    );

    let result = false;
    service
      .getUnsubscribeCustomerCouponResultLoading()
      .subscribe((loading) => (result = loading))
      .unsubscribe();

    expect(result).toEqual(true);
  });

  it('should getUnsubscribeCustomerCouponResultSuccess() return the success flag', () => {
    store.dispatch(new UserActions.UnsubscribeCustomerCouponSuccess('coupon'));

    let result = false;
    service
      .getUnsubscribeCustomerCouponResultSuccess()
      .subscribe((loading) => (result = loading))
      .unsubscribe();

    expect(result).toEqual(true);
  });

  it('should getUnsubscribeCustomerCouponResultError() return the error flag', () => {
    store.dispatch(new UserActions.UnsubscribeCustomerCouponFail('error'));

    let result = false;
    service
      .getUnsubscribeCustomerCouponResultError()
      .subscribe((loading) => (result = loading))
      .unsubscribe();

    expect(result).toEqual(true);
  });

  it('should be able to claim a customer coupon', () => {
    service.claimCustomerCoupon('couponCode');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.ClaimCustomerCoupon({
        userId: OCC_USER_ID_CURRENT,
        couponCode: 'couponCode',
      })
    );
  });
});
