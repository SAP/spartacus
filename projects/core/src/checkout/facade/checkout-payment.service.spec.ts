import { TestBed } from '@angular/core/testing';

import { CheckoutPaymentService } from './checkout-payment.service';

describe('CheckoutPaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckoutPaymentService = TestBed.get(CheckoutPaymentService);
    expect(service).toBeTruthy();
  });
});
