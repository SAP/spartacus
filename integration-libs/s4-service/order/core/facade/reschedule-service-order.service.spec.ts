import { TestBed } from '@angular/core/testing';

import { RescheduleServiceOrderService } from './reschedule-service-order.service';

describe('RescheduleServiceOrderService', () => {
  let service: RescheduleServiceOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RescheduleServiceOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
