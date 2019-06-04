import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { UserCouponAdapter } from './user-coupon.adapter';
import { UserCouponConnector } from './user-coupon.connector';
import createSpy = jasmine.createSpy;

class MockUserAdapter implements UserCouponAdapter {
  loadCustomerCoupons = createSpy('loadCustomerCoupons').and.callFake(userId =>
    of(`loadList-${userId}`)
  );
  subscribeCustomerCoupon = createSpy(
    'subscribeCustomerCoupon'
  ).and.returnValue(of({}));
  unSubscribeCustomerCoupon = createSpy(
    'unSubscribeCustomerCoupon'
  ).and.returnValue(of({}));
}

describe('UserCouponConnector', () => {
  let service: UserCouponConnector;
  let adapter: UserCouponAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserCouponAdapter, useClass: MockUserAdapter }],
    });

    service = TestBed.get(UserCouponConnector);
    adapter = TestBed.get(UserCouponAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadCustomerCoupons should call adapter', () => {
    let result;
    service.loadCustomerCoupons('user-id').subscribe(res => (result = res));
    expect(result).toEqual('load-user-id');
    expect(adapter.loadAll).toHaveBeenCalledWith('user-id');
  });

  it('subscribeCustomerCoupon should call adapter', () => {
    let result;
    service
      .subscribeCustomerCoupon('userId', 'couponCode')
      .subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.subscribe).toHaveBeenCalledWith('userId', 'templateId');
  });

  it('unSubscribeCustomerCoupon should call adapter', () => {
    let result;
    service
      .unSubscribeCustomerCoupon('userId', 'consentCode')
      .subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.unsubscribe).toHaveBeenCalledWith('userId', 'templateId');
  });
});
