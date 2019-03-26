import { TestBed } from '@angular/core/testing';

import { BaseSiteService } from './base-site.service';
import { OccConfig } from '@spartacus/core';
import { Store } from '@ngrx/store';

describe('BaseSiteService', () => {
  class MockStore {}

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        BaseSiteService,
        {
          provide: OccConfig,
          useValue: {}
        },
        {
          provide: Store,
          useClass: MockStore
        }
      ]
    })
  );

  it('should be created', () => {
    const service: BaseSiteService = TestBed.get(BaseSiteService);
    expect(service).toBeTruthy();
  });
});
