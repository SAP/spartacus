import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { GlobalMessageService } from '../../../global-message/index';
import {
  CustomerCoupon,
  CustomerCouponSearchResult,
  CustomerCouponNotification,
  CustomerCoupon2Customer,
} from '../../../model/customer-coupon.model';
import { User } from '../../../model/misc.model';
import { CustomerCouponConnector } from '../../connectors/customer-coupon/customer-coupon.connector';
import { CustomerCouponAdapter } from '../../connectors/customer-coupon/customer-coupon.adapter';
import { UserService } from '../../facade/user.service';
import * as fromCustomerCouponsAction from '../actions/customer-coupon.action';
import * as fromCustomerCouponsEffect from './customer-coupon.effect';
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
  let customerCouponsEffect: fromCustomerCouponsEffect.CustomerCouponEffects;
  let customerCouponConnector: CustomerCouponConnector;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromCustomerCouponsEffect.CustomerCouponEffects,
        { provide: CustomerCouponAdapter, useValue: {} },
        { provide: UserService, useClass: MockUserService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        provideMockActions(() => actions$),
      ],
    });

    customerCouponsEffect = TestBed.get(
      fromCustomerCouponsEffect.CustomerCouponEffects
    );
    customerCouponConnector = TestBed.get(CustomerCouponConnector);

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
      const action = new fromCustomerCouponsAction.LoadCustomerCoupons({
        userId,
        pageSize,
        currentPage,
        sort,
      });
      const completion = new fromCustomerCouponsAction.LoadCustomerCouponsSuccess(
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
      const action = new fromCustomerCouponsAction.SubscribeCustomerCoupon({
        userId: OCC_USER_ID_CURRENT,
        couponCode: 'testCoupon',
      });
      const completion = new fromCustomerCouponsAction.SubscribeCustomerCouponSuccess(
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
      const action = new fromCustomerCouponsAction.UnsubscribeCustomerCoupon({
        userId: OCC_USER_ID_CURRENT,
        couponCode: 'testCoupon',
      });
      const completion = new fromCustomerCouponsAction.UnsubscribeCustomerCouponSuccess(
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
      const action = new fromCustomerCouponsAction.ClaimCustomerCoupon({
        userId: OCC_USER_ID_CURRENT,
        couponCode: 'testCoupon',
      });
      const completion = new fromCustomerCouponsAction.ClaimCustomerCouponSuccess(
        customerCoupon2Customer
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(customerCouponsEffect.claimCustomerCoupon$).toBeObservable(
        expected
      );
    });
  });

  describe('reloadCustomerCoupons$', () => {
    const customerCouponSubscriptionFailActions = [
      'SubscribeCustomerCouponFail',
      'UnsubscribeCustomerCouponFail',
    ];

    customerCouponSubscriptionFailActions.forEach(actionName => {
      it(`should reload custioner coupon on ${actionName}`, () => {
        const action = new fromCustomerCouponsAction[actionName]({});
        const completion = new fromCustomerCouponsAction.LoadCustomerCoupons({
          userId: OCC_USER_ID_CURRENT,
          pageSize: 10,
        });

        actions$ = hot('-a', { a: action });
        const expected = cold('-b', { b: completion });

        expect(customerCouponsEffect.reloadCustomerCoupons$).toBeObservable(
          expected
        );
      });
    });
  });
});
