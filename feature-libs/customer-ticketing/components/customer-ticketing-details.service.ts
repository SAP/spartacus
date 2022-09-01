import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerTicketingFacade, TicketDetails } from '../root';

@Injectable({
  providedIn: 'root',
})
export class CustomerTicketingDetailsService {
  constructor(protected customerTicketingService: CustomerTicketingFacade) {}

  protected ticketDetails$ = this.customerTicketingService.getTicket();

  getTicketSubject = (): Observable<string | undefined> =>
    this.ticketDetails$.pipe(map((details) => details?.subject));

  getTicketStatus = (): Observable<string | undefined> =>
    this.ticketDetails$.pipe(map((details) => details?.status?.id));

  getTicketDetails = (): Observable<TicketDetails | undefined> =>
    this.ticketDetails$;
}
