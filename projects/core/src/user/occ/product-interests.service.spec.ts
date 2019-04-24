import { TestBed } from '@angular/core/testing';

import { ProductInterestsService } from './product-interests.service';

describe('ProductInterestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductInterestsService = TestBed.get(
      ProductInterestsService
    );
    expect(service).toBeTruthy();
  });
});
