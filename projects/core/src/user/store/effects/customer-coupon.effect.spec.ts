import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { GlobalMessageService } from '../../../global-message/index';
import {
  CustomerCoupon,
  CustomerCouponSearchResult,
} from '../../../model/customer-coupon.model';
import { User } from '../../../model/misc.model';
import { USERID_CURRENT } from '../../../occ/utils/occ-constants';
import { CustomerCouponConnector } from '../../connectors/customer-coupon/customer-coupon.connector';
import { CustomerCouponAdapter } from '../../connectors/customer-coupon/customer-coupon.adapter';
import { UserService } from '../../facade/user.service';
import * as fromCustomerCouponsAction from '../actions/customer-coupon.action';
import * as fromCustomerCouponsEffect from './customer-coupon.effect';

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

    spyOn(customerCouponConnector, 'getMyCoupons').and.returnValue(
      of(customerSearcherResult)
    );
    spyOn(customerCouponConnector, 'turnOnNotification').and.returnValue(
      of(coupon1)
    );

    spyOn(customerCouponConnector, 'turnOffNotification').and.returnValue(
      of({})
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
        userId: USERID_CURRENT,
        couponCode: 'testCoupon',
      });
      const completion = new fromCustomerCouponsAction.SubscribeCustomerCouponSuccess(
        coupon1
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(customerCouponsEffect.subscribeCustomerCoupon$).toBeObservable(
        expected
      );
    });
  });

  describe('unsubscribeCustomerCoupon$', () => {
    it('should add user address', () => {
      const action = new fromCustomerCouponsAction.UnsubscribeCustomerCoupon({
        userId: USERID_CURRENT,
        couponCode: 'testCoupon',
      });
      const completion = new fromCustomerCouponsAction.UnsubscribeCustomerCouponSuccess(
        {}
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(customerCouponsEffect.unsubscribeCustomerCoupon$).toBeObservable(
        expected
      );
    });
  });
});
