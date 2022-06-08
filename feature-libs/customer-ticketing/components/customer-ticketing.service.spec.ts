import { TestBed } from '@angular/core/testing';

import { CustomerTicketingService } from './customer-ticketing.service';

describe('CustomerTicketingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerTicketingService = TestBed.get(
      CustomerTicketingService
    );
    expect(service).toBeTruthy();
  });
});
