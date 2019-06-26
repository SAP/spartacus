import { TestBed } from '@angular/core/testing';
import { CartCouponAnchorService } from './cart-coupon-anchor.service';

describe('CartCouponAnchorService', () => {
  let service: CartCouponAnchorService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(CartCouponAnchorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide event emitter', () => {
    expect(service.getEventEmit()).not.toEqual(null);
  });
});
