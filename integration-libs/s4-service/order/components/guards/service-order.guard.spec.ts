import { TestBed } from '@angular/core/testing';

import { ServiceOrderGuard } from './service-order.guard';

describe('ServiceOrderGuard', () => {
  let guard: ServiceOrderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ServiceOrderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
