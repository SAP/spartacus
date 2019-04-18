import { TestBed } from '@angular/core/testing';

import { CartEntryConnector } from './cart-entry.connector';

describe('CartEntryConnector', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartEntryConnector = TestBed.get(CartEntryConnector);
    expect(service).toBeTruthy();
  });
});
