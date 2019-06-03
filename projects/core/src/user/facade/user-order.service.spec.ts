import { TestBed } from '@angular/core/testing';

import { UserOrderService } from './user-order.service';

describe('UserOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserOrderService = TestBed.get(UserOrderService);
    expect(service).toBeTruthy();
  });
});
