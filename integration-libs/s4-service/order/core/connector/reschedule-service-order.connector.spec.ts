import { TestBed } from '@angular/core/testing';

import { ReschedleServiceOrderConnector } from './reschedule-service-order.connector';

describe('ReschedleServiceOrderConnectorService', () => {
  let service: ReschedleServiceOrderConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReschedleServiceOrderConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
