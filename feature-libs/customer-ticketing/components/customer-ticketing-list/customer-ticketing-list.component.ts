import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ICON_TYPE } from '@spartacus/storefront';
import {
  CustomerTicketingFacade,
  TicketDetails,
  TicketList,
} from '@spartacus/customer-ticketing/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-customer-ticketing-list',
  templateUrl: './customer-ticketing-list.component.html',
})
export class CustomerTicketingListComponent implements OnInit {
  iconTypes = ICON_TYPE;
  // Create table Headers
  tableHeaders = [
    { key: 'ticketId', label: 'ID' },
    { key: 'changedOn', label: 'Changed On' },
  ];
  ticketList: Observable<TicketList | undefined>;
  tickets: Observable<Array<TicketDetails>>;

  ngOnInit(): void {
    this.ticketList = this.customerTicketingFacade.getTickets();
    this.tickets = this.ticketList?.pipe(
      map((ticketList) => ticketList?.tickets)
    );
  }

  constructor(protected customerTicketingFacade: CustomerTicketingFacade) {}

  getStatusClass = (status: string): string => {
    switch (status) {
      case 'OPEN':
        return 'cx-text-green';
      case 'REOPENED':
        return 'cx-text-green';
      case 'CLOSED':
        return 'cx-text-red';
      default:
        return '';
    }
  };
}
