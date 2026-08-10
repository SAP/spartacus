import { of } from 'rxjs';
import { vi } from 'vitest';
import { CustomerCouponConnector } from './customer-coupon.connector';

const PAGE_SIZE = 5;
const currentPage = 1;
const sort = 'byDate';

describe('CustomerCouponConnector', () => {
  let service: CustomerCouponConnector;
  let adapter: {
    getCustomerCoupons: ReturnType<typeof vi.fn>;
    turnOnNotification: ReturnType<typeof vi.fn>;
    turnOffNotification: ReturnType<typeof vi.fn>;
    claimCustomerCoupon: ReturnType<typeof vi.fn>;
    claimCustomerCouponWithCodeInBody: ReturnType<typeof vi.fn>;
    disclaimCustomerCoupon: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    adapter = {
      getCustomerCoupons: vi
        .fn()
        .mockImplementation((userId) => of(`loadList-${userId}`)),
      turnOnNotification: vi
        .fn()
        .mockImplementation((userId) => of(`subscribe-${userId}`)),
      turnOffNotification: vi.fn().mockReturnValue(of({})),
      claimCustomerCoupon: vi
        .fn()
        .mockImplementation((userId) => of(`claim-${userId}`)),
      claimCustomerCouponWithCodeInBody: vi
        .fn()
        .mockImplementation((userId) => of(`claim-${userId}`)),
      disclaimCustomerCoupon: vi
        .fn()
        .mockImplementation((userId) => of(`disclaim-${userId}`)),
    };
    service = new CustomerCouponConnector(adapter as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCustomerCoupons should call adapter', () => {
    let result: any;
    service
      .getCustomerCoupons('user-id', PAGE_SIZE, currentPage, sort)
      .subscribe((res) => (result = res));
    expect(result).toEqual('loadList-user-id');
    expect(adapter.getCustomerCoupons).toHaveBeenCalledWith(
      'user-id',
      PAGE_SIZE,
      currentPage,
      sort
    );
  });

  it('turnOnNotification should call adapter', () => {
    let result: any;
    service
      .turnOnNotification('userId', 'couponCode')
      .subscribe((res) => (result = res));
    expect(result).toEqual('subscribe-userId');
    expect(adapter.turnOnNotification).toHaveBeenCalledWith(
      'userId',
      'couponCode'
    );
  });

  it('turnOffNotification should call adapter', () => {
    let result: any;
    service
      .turnOffNotification('userId', 'couponCode')
      .subscribe((res) => (result = res));
    expect(result).toEqual({});
    expect(adapter.turnOffNotification).toHaveBeenCalledWith(
      'userId',
      'couponCode'
    );
  });

  it('claimCustomerCoupon should call adapter.claimCustomerCouponWithCodeInBody', () => {
    let result: any;
    service
      .claimCustomerCoupon('userId', 'couponCode')
      .subscribe((res) => (result = res));
    expect(result).toEqual('claim-userId');
    expect(adapter.claimCustomerCouponWithCodeInBody).toHaveBeenCalledWith(
      'userId',
      'couponCode'
    );
  });

  it('disclaimCustomerCoupon should call adapter', () => {
    let result: any;
    service
      .disclaimCustomerCoupon('userId', 'couponCode')
      .subscribe((res) => (result = res));
    expect(result).toEqual('disclaim-userId');
    expect(adapter.disclaimCustomerCoupon).toHaveBeenCalledWith(
      'userId',
      'couponCode'
    );
  });
});
