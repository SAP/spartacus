import { TestBed, inject } from '@angular/core/testing';
import { SiteLoaderService } from './site-loader.service';

describe('SiteLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteLoaderService]
    });
  });

  it('should ...', inject([SiteLoaderService], (service: SiteLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
