import { TestBed } from '@angular/core/testing';

import { CdpCustomerTicketingMessagesComponentService } from './cdp-customer-ticketing-messages-component.service';

describe('CdpCustomerTicketingMessagesComponentService', () => {
  let service: CdpCustomerTicketingMessagesComponentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CdpCustomerTicketingMessagesComponentService],
    });
    service = TestBed.inject(CdpCustomerTicketingMessagesComponentService);
    TestBed.compileComponents();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('displayAddMessageSection()', () => {
    it('should not display section to add new messages in CDP scenario', () => {
      expect(service.displayAddMessageSection({})).toEqual(false);
    });
  });
});
