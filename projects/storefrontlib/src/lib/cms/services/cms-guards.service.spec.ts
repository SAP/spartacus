import { TestBed } from '@angular/core/testing';

import { CmsGuardsService } from './cms-guards.service';
import { CmsMappingService } from '@spartacus/storefront';

describe('CmsGuardsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CmsMappingService,
          useValue: {}
        }
      ]
    })
  );

  it('should be created', () => {
    const service: CmsGuardsService = TestBed.get(CmsGuardsService);
    expect(service).toBeTruthy();
  });
});
