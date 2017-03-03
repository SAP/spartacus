import { TestBed, inject } from '@angular/core/testing';
import { OccProductSearchService } from './product-search.service';

describe('ProductSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccProductSearchService]
    });
  });

  it('should ...', inject([OccProductSearchService], (service: OccProductSearchService) => {
    expect(service).toBeTruthy();
  }));
});
