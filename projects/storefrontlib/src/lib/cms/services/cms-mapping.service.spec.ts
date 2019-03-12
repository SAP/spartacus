import { TestBed } from '@angular/core/testing';

import { CmsMappingService } from './cms-mapping.service';

describe('CmsMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CmsMappingService = TestBed.get(CmsMappingService);
    expect(service).toBeTruthy();
  });
});
