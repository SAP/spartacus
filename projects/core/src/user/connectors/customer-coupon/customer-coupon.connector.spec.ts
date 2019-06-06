import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { CustomerCouponAdapter } from './customer-coupon.adapter';
import { CustomerCouponConnector } from './customer-coupon.connector';
import createSpy = jasmine.createSpy;

const PAGE_SIZE = 5;
const currentPage = 1;
const sort = 'byDate';

class MockUserAdapter implements CustomerCouponAdapter {
  getMyCoupons = createSpy('getMyCoupons').and.callFake(userId =>
    of(`loadList-${userId}`)
  );
  turnOnNotification = createSpy('turnOnNotification').and.callFake(userId =>
    of(`subscribe-${userId}`)
  );
  turnOffNotification = createSpy('turnOffNotification').and.returnValue(
    of({})
  );
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

  it('getMyCoupons should call adapter', () => {
    let result;
    service
      .getMyCoupons('user-id', PAGE_SIZE, currentPage, sort)
      .subscribe(res => (result = res));
    expect(result).toEqual('loadList-user-id');
    expect(adapter.getMyCoupons).toHaveBeenCalledWith(
      'user-id',
      PAGE_SIZE,
      currentPage,
      sort
    );
  });

  it('turnOnNotification should call adapter', () => {
    let result;
    service
      .turnOnNotification('userId', 'couponCode')
      .subscribe(res => (result = res));
    expect(result).toEqual('subscribe-userId');
    expect(adapter.turnOnNotification).toHaveBeenCalledWith(
      'userId',
      'couponCode'
    );
  });

  it('turnOffNotification should call adapter', () => {
    let result;
    service
      .turnOffNotification('userId', 'couponCode')
      .subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.turnOffNotification).toHaveBeenCalledWith(
      'userId',
      'couponCode'
    );
  });
});
