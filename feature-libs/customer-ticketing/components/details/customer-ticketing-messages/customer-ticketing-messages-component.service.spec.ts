import { TestBed } from '@angular/core/testing';
import { CustomerTicketingMessagesComponentService } from './customer-ticketing-messages-component.service';
import {
  STATUS,
  STATUS_NAME,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';

describe('CustomerTicketingMessagesComponentService', () => {
  let service: CustomerTicketingMessagesComponentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerTicketingMessagesComponentService],
    });
    service = TestBed.inject(CustomerTicketingMessagesComponentService);
    TestBed.compileComponents();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('displayAddMessageSection()', () => {
    it('should return true if status is not closed', () => {
      let ticket1: TicketDetails = {
        status: {
          id: STATUS.OPEN,
          name: STATUS_NAME.OPEN,
        },
      };
      expect(service.displayAddMessageSection(ticket1)).toEqual(true);
    });
    it('should return false if status is closed', () => {
      let ticket2: TicketDetails = {
        status: {
          id: STATUS.CLOSED,
          name: STATUS_NAME.CLOSED,
        },
      };
      expect(service.displayAddMessageSection(ticket2)).toEqual(false);
    });
    it('should return true if status is not available', () => {
      let ticket2: TicketDetails = { id: 'XASDF' };
      expect(service.displayAddMessageSection(ticket2)).toEqual(true);
    });
  });
});
