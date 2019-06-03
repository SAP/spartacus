import { TestBed } from '@angular/core/testing';

import { UserPaymentService } from './user-payment.service';

describe('UserPaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPaymentService = TestBed.get(UserPaymentService);
    expect(service).toBeTruthy();
  });
});
