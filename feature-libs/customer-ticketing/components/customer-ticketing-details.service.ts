import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CustomerTicketingFacade,
  STATUS,
  Status,
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
  dataLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ticketDetails$ = this.customerTicketingService.getTicket();

  constructor(
    protected customerTicketingService: CustomerTicketingFacade,
    protected globalMessageService: GlobalMessageService,
    protected launchDialogService: LaunchDialogService,
    protected routingService: RoutingService
  ) {}

  getTicketSubject(): Observable<string | undefined> {
    return this.ticketDetails$.pipe(map((details) => details?.subject));
  }

  getTicketStatus(): Observable<string | undefined> {
    return this.ticketDetails$.pipe(
      map((details) => details?.status?.id?.toUpperCase())
    );
  }

  getAvailableTransitionStatus(): Observable<Status[] | undefined> {
    return this.ticketDetails$.pipe(
      map((details) => details?.availableStatusTransitions)
    );
  }

  createTicketEvent(ticketEvent: TicketEvent): void {
    this.dataLoading$.next(true);
    this.customerTicketingService.createTicketEvent(ticketEvent).subscribe({
      complete: () => {
        this.customerTicketingService.getTicketState().subscribe((state) => {
          if (!state.loading) {
            this.dataLoading$.next(false);
            this.closeDialog('Ticket event created successfully');

            if (ticketEvent?.toStatus?.id === STATUS.CLOSE) {
              this.routingService.go({ cxRoute: 'supportTickets' });
            }

            this.triggerSuccessNotifications(ticketEvent?.toStatus?.id);
          }
        });
      },
      error: () => {
        this.closeDialog('Something went wrong while updating ticket event');
        this.triggerErrorNotification();
      },
    });
  }

  protected closeDialog(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  protected triggerSuccessNotifications(id?: string): void {
    this.globalMessageService.add(
      {
        key:
          id === STATUS.CLOSE
            ? 'customerTicketing.requestClosed'
            : 'customerTicketing.requestReopened',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  protected triggerErrorNotification(): void {
    this.globalMessageService.add(
      {
        key: 'customerTicketing.errorMessage',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }
}
