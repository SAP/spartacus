import { TestBed } from '@angular/core/testing';

import { OccRescheduleServiceOrderAdapter} from './occ-reschedule-service-order.adapter';

describe('OccRescheduleServiceOrderAdapter', () => {
  let service: OccRescheduleServiceOrderAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccRescheduleServiceOrderAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
