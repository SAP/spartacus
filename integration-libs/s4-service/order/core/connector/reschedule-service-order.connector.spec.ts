import { TestBed } from '@angular/core/testing';

import { RescheduleServiceOrderConnector } from './reschedule-service-order.connector';

describe('ReschedleServiceOrderConnectorService', () => {
  let service: RescheduleServiceOrderConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RescheduleServiceOrderConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
