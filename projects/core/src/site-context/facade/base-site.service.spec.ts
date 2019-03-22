import { TestBed } from '@angular/core/testing';

import { BaseSiteService } from './base-site.service';
import { OccConfig } from '@spartacus/core';

describe('BaseSiteService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OccConfig,
          useValue: {}
        }
      ]
    })
  );

  it('should be created', () => {
    const service: BaseSiteService = TestBed.get(BaseSiteService);
    expect(service).toBeTruthy();
  });
});
