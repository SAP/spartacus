import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { CustomerCouponAdapter } from './customer-coupon.adapter';
import { CustomerCouponConnector } from './customer-coupon.connector';
import createSpy = jasmine.createSpy;

class MockUserAdapter implements CustomerCouponAdapter {
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

describe('CustomerCouponConnector', () => {
  let service: CustomerCouponConnector;
  let adapter: CustomerCouponAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CustomerCouponAdapter, useClass: MockUserAdapter },
      ],
    });

    service = TestBed.get(CustomerCouponConnector);
    adapter = TestBed.get(CustomerCouponAdapter);
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
