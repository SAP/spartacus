import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { GlobalMessageService } from '../../../global-message/index';
import {
  CustomerCoupon,
  CustomerCouponNotification,
} from '../../../model/customer-coupon.model';
import { User } from '../../../model/misc.model';
import { USERID_CURRENT } from '../../../occ/utils/occ-constants';
import { CustomerCouponsConnector } from '../../user-coupon.connector';
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

const couponNotification: CustomerCouponNotification = {
  coupon: {},
  customer: {},
  status: '',
};

describe('Customer Coupon effect', () => {
  let customerCouponsEffect: fromCustomerCouponsEffect.CustomerCouponsEffects;
  let customerCouponsConnector: CustomerCouponConnector;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromCustomerCouponsEffect.CustomerCouponsEffects,
        { provide: CustomerCouponAdapter, useValue: {} },
        { provide: UserService, useClass: MockUserService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        provideMockActions(() => actions$),
      ],
    });

    customerCouponsEffect = TestBed.get(
      fromCustomerCouponsEffect.CustomerCouponsEffects
    );
    customerCouponsConnector = TestBed.get(CustomerCouponsConnector);

    spyOn(customerCouponsConnector, 'getAll').and.returnValue(
      of(mockCustomerCoupons)
    );
    spyOn(customerCouponsConnector, 'subscribe').and.returnValue(
      of(couponNotification)
    );

    spyOn(customerCouponsConnector, 'unsubscribe').and.returnValue(of({}));
  });

  describe('loadCustomerCoupons$', () => {
    it('should load CustomerCoupons', () => {
      const action = new fromCustomerCouponsAction.LoadCustomerCoupons(
        'customerCoupon1'
      );
      const completion = new fromCustomerCouponsAction.LoadCustomerCouponsSuccess(
        mockCustomerCoupons
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(customerCouponsEffect.loadCustomerCoupons$).toBeObservable(
        expected
      );
    });
  });

  describe('subscribeCustomerCoupon$', () => {
    it('should add user address', () => {
      const action = new fromCustomerCouponsAction.SubscibeCustomerCoupon({
        userId: USERID_CURRENT,
        couponCode: 'testCoupon',
      });
      const completion = new fromCustomerCouponsAction.SubscibeCustomerCouponSuccess(
        {}
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
      const action = new fromCustomerCouponsAction.UnsubscibeCustomerCoupon({
        userId: USERID_CURRENT,
        couponCode: 'testCoupon',
      });
      const completion = new fromCustomerCouponsAction.UnsubscibeCustomerCouponSuccess(
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
