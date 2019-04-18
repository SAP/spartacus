import { TestBed } from '@angular/core/testing';

import { CartPaymentConnector } from './cart-payment.connector';

describe('CartPaymentConnector', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartPaymentConnector = TestBed.get(CartPaymentConnector);
    expect(service).toBeTruthy();
  });
});
