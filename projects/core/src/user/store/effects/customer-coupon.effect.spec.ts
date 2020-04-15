import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { GlobalMessageService } from '../../../global-message/index';
import {
  CustomerCoupon,
  CustomerCoupon2Customer,
  CustomerCouponNotification,
  CustomerCouponSearchResult,
} from '../../../model/customer-coupon.model';
import { User } from '../../../model/misc.model';
import { CustomerCouponConnector } from '../../connectors/customer-coupon/customer-coupon.connector';
import { CustomerCouponAdapter } from '../../connectors/customer-coupon/customer-coupon.adapter';
import { UserService } from '../../facade/user.service';
import { UserActions } from '../actions/index';
import { CustomerCouponEffects } from './customer-coupon.effect';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';

class MockUserService {
  loadAddresses = jasmine.createSpy();

  get(): Observable<User> {
    return of({});
  }
}

class MockGlobalMessageService {
  add = jasmine.createSpy();
}

const userId = '123';
const pageSize = 5;
const currentPage = 1;
const sort = '';

const coupon1: CustomerCoupon = {
  couponId: 'coupon1',
  name: 'coupon 1',
  startDate: '',
  endDate: '',
  status: 'Effective',
  description: '',
  notificationOn: true,
};
const coupon2: CustomerCoupon = {
  couponId: 'coupon2',
  name: 'coupon 2',
  startDate: '',
  endDate: '',
  status: 'Effective',
  description: '',
  notificationOn: true,
};

const mockCustomerCoupons: CustomerCoupon[] = [coupon1, coupon2];

const customerSearcherResult: CustomerCouponSearchResult = {
  coupons: mockCustomerCoupons,
  sorts: [],
  pagination: {},
};

const customerCouponNotification: CustomerCouponNotification = {
  coupon: coupon1,
  customer: {},
  status: '',
};

const customerCoupon2Customer: CustomerCoupon2Customer = {
  coupon: coupon1,
  customer: {},
};

describe('Customer Coupon effect', () => {
  let customerCouponsEffect: CustomerCouponEffects;
  let customerCouponConnector: CustomerCouponConnector;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerCouponEffects,
        { provide: CustomerCouponAdapter, useValue: {} },
        { provide: UserService, useClass: MockUserService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        provideMockActions(() => actions$),
      ],
    });

    customerCouponsEffect = TestBed.inject(CustomerCouponEffects);
    customerCouponConnector = TestBed.inject(CustomerCouponConnector);

    spyOn(customerCouponConnector, 'getCustomerCoupons').and.returnValue(
      of(customerSearcherResult)
    );
    spyOn(customerCouponConnector, 'turnOnNotification').and.returnValue(
      of(customerCouponNotification)
    );

    spyOn(customerCouponConnector, 'turnOffNotification').and.returnValue(
      of({})
    );
    spyOn(customerCouponConnector, 'claimCustomerCoupon').and.returnValue(
      of(customerCoupon2Customer)
    );
  });

  describe('loadCustomerCoupons$', () => {
    it('should load CustomerCoupons', () => {
      const action = new UserActions.LoadCustomerCoupons({
        userId,
        pageSize,
        currentPage,
        sort,
      });
      const completion = new UserActions.LoadCustomerCouponsSuccess(
        customerSearcherResult
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(customerCouponsEffect.loadCustomerCoupons$).toBeObservable(
        expected
      );
    });
  });

  describe('subscribeCustomerCoupon$', () => {
    it('should subscribe customer coupon', () => {
      const action = new UserActions.SubscribeCustomerCoupon({
        userId: OCC_USER_ID_CURRENT,
        couponCode: 'testCoupon',
      });
      const completion = new UserActions.SubscribeCustomerCouponSuccess(
        customerCouponNotification
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(customerCouponsEffect.subscribeCustomerCoupon$).toBeObservable(
        expected
      );
    });
  });

  describe('unsubscribeCustomerCoupon$', () => {
    it('should unsubscribe customer coupon', () => {
      const action = new UserActions.UnsubscribeCustomerCoupon({
        userId: OCC_USER_ID_CURRENT,
        couponCode: 'testCoupon',
      });
      const completion = new UserActions.UnsubscribeCustomerCouponSuccess(
        'testCoupon'
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(customerCouponsEffect.unsubscribeCustomerCoupon$).toBeObservable(
        expected
      );
    });
  });

  describe('claimCustomerCoupon$', () => {
    it('should load CustomerCoupons', () => {
      const action = new UserActions.ClaimCustomerCoupon({
        userId: OCC_USER_ID_CURRENT,
        couponCode: 'testCoupon',
      });
      const completion = new UserActions.ClaimCustomerCouponSuccess(
        customerCoupon2Customer
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(customerCouponsEffect.claimCustomerCoupon$).toBeObservable(
        expected
      );
    });
  });
});
