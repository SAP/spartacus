import { Injectable } from '@angular/core';
import { CustomerTicketingFacade } from '@spartacus/customer-ticketing/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerTicketingDataService {
  constructor(protected customerTicketingService: CustomerTicketingFacade) {}

  protected ticketDetails$ = this.customerTicketingService.getTicket();

  getTicketSubject = (): Observable<string | undefined> =>
    this.ticketDetails$.pipe(map((details) => details?.subject));

  getTicketStatus = (): Observable<string | undefined> =>
    this.ticketDetails$.pipe(map((details) => details?.status?.id));
}
