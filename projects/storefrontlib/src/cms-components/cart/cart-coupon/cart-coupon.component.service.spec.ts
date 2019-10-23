import { TestBed } from '@angular/core/testing';
import { CartCouponComponentService } from './cart-coupon.component.service';

describe('CartCouponComponentService', () => {
  let service: CartCouponComponentService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(CartCouponComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide event emitter', () => {
    expect(service.scrollIn()).not.toEqual(null);
  });
});
