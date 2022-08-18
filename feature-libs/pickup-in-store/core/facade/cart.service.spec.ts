import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService],
    });
    service = TestBed.inject(CartService);
  });

  it('should call getPickupOption and return object', () => {
    const received = service.getPickupOption('productCode');

    expect(received).toBeUndefined();
  });
});
