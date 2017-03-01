import { TestBed, inject } from '@angular/core/testing';
import { CmsCacheService } from './cms-cache.service';

describe('CmsCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CmsCacheService]
    });
  });

  it('should ...', inject([CmsCacheService], (service: CmsCacheService) => {
    expect(service).toBeTruthy();
  }));
});
