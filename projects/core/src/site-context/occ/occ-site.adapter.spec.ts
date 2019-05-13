import { TestBed } from '@angular/core/testing';

import { OccSiteAdapter } from './occ-site.adapter';

describe('OccSiteAdapter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OccSiteAdapter = TestBed.get(OccSiteAdapter);
    expect(service).toBeTruthy();
  });
});
