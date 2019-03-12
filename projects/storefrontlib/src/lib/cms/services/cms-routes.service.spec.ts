import { TestBed } from '@angular/core/testing';

import { CmsRoutesService } from './cms-routes.service';

describe('CmsRoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CmsRoutesService = TestBed.get(CmsRoutesService);
    expect(service).toBeTruthy();
  });
});
