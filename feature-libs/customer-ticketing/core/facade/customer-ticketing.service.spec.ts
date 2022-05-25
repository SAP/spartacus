import { TestBed } from '@angular/core/testing';
import { CustomerTicketingService } from './customer-ticketing.service';

describe('CustomerTicketingService', () => {
  let service: CustomerTicketingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerTicketingService],
    });

    service = TestBed.inject(CustomerTicketingService);
  });
});
