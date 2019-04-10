import { TestBed } from '@angular/core/testing';

import { ProductConnector } from './product.connector';

describe('ProductConnector', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductConnector = TestBed.get(ProductConnector);
    expect(service).toBeTruthy();
  });
});
