import { TestBed } from '@angular/core/testing';
import { CartCouponAnchorService } from './cart-coupon-anchor.service';

describe('CartCouponAnchorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartCouponAnchorService = TestBed.get(
      CartCouponAnchorService
    );
    expect(service).toBeTruthy();
  });
});
