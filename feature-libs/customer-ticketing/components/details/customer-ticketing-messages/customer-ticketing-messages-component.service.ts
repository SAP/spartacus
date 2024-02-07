import { Injectable } from '@angular/core';
import { STATUS, TicketDetails } from '@spartacus/customer-ticketing/root';

@Injectable()
export class CustomerTicketingMessagesComponentService {
  displayAddMessageSection(ticket: TicketDetails | undefined): boolean {
    return ticket?.status?.id !== STATUS.CLOSED;
  }
}
