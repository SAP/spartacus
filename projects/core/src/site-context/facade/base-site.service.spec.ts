import { TestBed } from '@angular/core/testing';

import { BaseSiteService } from './base-site.service';

describe('BaseSiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseSiteService = TestBed.get(BaseSiteService);
    expect(service).toBeTruthy();
  });
});
