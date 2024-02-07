import { Injectable } from '@angular/core';
import { CustomerTicketingMessagesComponentService } from '@spartacus/customer-ticketing/components';
import { TicketDetails } from '@spartacus/customer-ticketing/root';

@Injectable()
export class CdpCustomerTicketingMessagesComponentService extends CustomerTicketingMessagesComponentService {
  displayAddMessageSection(_ticket: TicketDetails | undefined): boolean {
    return false;
  }
}
