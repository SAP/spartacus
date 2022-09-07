import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CustomerTicketingFacade,
  STATUS,
  Status,
  TicketDetails,
  TicketEvent,
} from '@spartacus/customer-ticketing/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class CustomerTicketingDetailsService {
  protected ticketDetails$ = this.customerTicketingService.getTicket();

  constructor(
    protected customerTicketingService: CustomerTicketingFacade,
    protected globalMessageService: GlobalMessageService,
    protected launchDialogService: LaunchDialogService,
    protected routingService: RoutingService
  ) {}

  getTicketSubject = (): Observable<string | undefined> =>
    this.ticketDetails$.pipe(map((details) => details?.subject));

  getTicketStatus = (): Observable<string | undefined> =>
    this.ticketDetails$.pipe(
      map((details) => details?.status?.id?.toUpperCase())
    );

  getAvailableTransitionStatus = (): Observable<Status[] | undefined> =>
    this.ticketDetails$.pipe(
      map((details) => details?.availableStatusTransitions)
    );

  getTicketDetails = (): Observable<TicketDetails | undefined> =>
    this.ticketDetails$;

  createTicketEvent(ticketEvent: TicketEvent): void {
    this.customerTicketingService.createTicketEvent(ticketEvent).subscribe({
      complete: () => {
        this.launchDialogService.closeDialog(
          'Ticket status changed successfully'
        );
        if (ticketEvent?.toStatus?.id === STATUS.CLOSE) {
          this.routingService.go({ cxRoute: 'supportTickets' });
        }
        this.globalMessageService.add(
          {
            key:
              ticketEvent?.toStatus?.id === STATUS.CLOSE
                ? 'customerTicketing.RequestClosed'
                : 'customerTicketing.RequestReopened',
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      },
      error: () => {
        this.launchDialogService.closeDialog(
          'Something went wrong while updating ticket event'
        );
        this.globalMessageService.add(
          {
            key: 'customerTicketing.errorMessage',
          },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      },
    });
  }
}
