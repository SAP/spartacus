import { TestBed, inject } from '@angular/core/testing';
import { OccSiteService } from './site.service';

describe('SiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccSiteService]
    });
  });

  it('should ...', inject([OccSiteService], (service: OccSiteService) => {
    expect(service).toBeTruthy();
  }));
});
