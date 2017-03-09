import { TestBed, inject } from '@angular/core/testing';
import { ProductSearchService } from './product-search.service';

describe('ProductSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductSearchService]
    });
  });

  it('should ...', inject([ProductSearchService], (service: ProductSearchService) => {
    expect(service).toBeTruthy();
  }));
});
