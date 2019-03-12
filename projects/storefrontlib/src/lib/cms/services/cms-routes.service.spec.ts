import { TestBed } from '@angular/core/testing';

import { CmsRoutesService } from './cms-routes.service';
import { Router } from '@angular/router';
import { CmsService } from '@spartacus/core';
import { CmsMappingService } from '@spartacus/storefront';

describe('CmsRoutesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: {}
        },
        {
          provide: CmsService,
          useValue: {}
        },
        { provide: CmsMappingService, useValue: {} }
      ]
    })
  );

  it('should be created', () => {
    const service: CmsRoutesService = TestBed.get(CmsRoutesService);
    expect(service).toBeTruthy();
  });
});
