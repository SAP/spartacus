import { TestBed } from '@angular/core/testing';

import { CartConnector } from './cart.connector';

describe('CartConnector', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartConnector = TestBed.get(CartConnector);
    expect(service).toBeTruthy();
  });
});
