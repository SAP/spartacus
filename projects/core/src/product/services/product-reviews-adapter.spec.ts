import { TestBed } from '@angular/core/testing';

import { ProductReviewsAdapter } from './product-reviews-adapter';

describe('ProductReviewsAdapterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductReviewsAdapter = TestBed.get(ProductReviewsAdapter);
    expect(service).toBeTruthy();
  });
});
