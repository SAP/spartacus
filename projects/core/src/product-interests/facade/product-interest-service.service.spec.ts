import { TestBed } from '@angular/core/testing';

import { ProductInterestServiceService } from './product-interest-service.service';

describe('ProductInterestServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductInterestServiceService = TestBed.get(
      ProductInterestServiceService
    );
    expect(service).toBeTruthy();
  });
});
