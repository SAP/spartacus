import { TestBed, inject } from '@angular/core/testing';
import { SiteContextService } from './site-context.service';

describe('SiteLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteContextService]
    });
  });

  it('should ...', inject([SiteContextService], (service: SiteContextService) => {
    expect(service).toBeTruthy();
  }));
});
