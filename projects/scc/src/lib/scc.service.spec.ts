import { TestBed } from '@angular/core/testing';

import { SccService } from './scc.service';

describe('SccService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SccService = TestBed.get(SccService);
    expect(service).toBeTruthy();
  });
});
