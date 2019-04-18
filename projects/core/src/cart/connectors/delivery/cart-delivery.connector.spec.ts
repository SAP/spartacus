import { TestBed } from '@angular/core/testing';

import { CartDeliveryConnector } from './cart-delivery.connector';

describe('CartDeliveryConnector', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartDeliveryConnector = TestBed.get(CartDeliveryConnector);
    expect(service).toBeTruthy();
  });
});
