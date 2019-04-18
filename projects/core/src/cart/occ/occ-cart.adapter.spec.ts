import { TestBed } from '@angular/core/testing';

import { OccCartAdapter } from './occ-cart.adapter';

describe('OccCartAdapter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OccCartAdapter = TestBed.get(OccCartAdapter);
    expect(service).toBeTruthy();
  });
});
