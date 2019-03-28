import { TestBed } from '@angular/core/testing';

import { CmsGuardsService } from './cms-guards.service';

describe('CmsGuardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CmsGuardsService = TestBed.get(CmsGuardsService);
    expect(service).toBeTruthy();
  });
});
