import { TestBed } from '@angular/core/testing';

import { CheckoutDeliveryService } from './checkout-delivery.service';

describe('CheckoutDeliveryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckoutDeliveryService = TestBed.get(CheckoutDeliveryService);
    expect(service).toBeTruthy();
  });
});
