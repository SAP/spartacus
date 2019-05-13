import { TestBed } from '@angular/core/testing';

import { OccOrderAdapter } from './occ-order.adapter';

describe('OccOrderAdapter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OccOrderAdapter = TestBed.get(OccOrderAdapter);
    expect(service).toBeTruthy();
  });
});
