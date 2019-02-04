import { TestBed } from '@angular/core/testing';

import { SiteContextParamsService } from './site-context-params.service';

describe('SiteContextParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiteContextParamsService = TestBed.get(SiteContextParamsService);
    expect(service).toBeTruthy();
  });
});
