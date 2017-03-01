import { TestBed, inject } from '@angular/core/testing';
import { CmsLoaderService } from './cms-loader.service';

describe('CmsLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CmsLoaderService]
    });
  });

  it('should ...', inject([CmsLoaderService], (service: CmsLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
