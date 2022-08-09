import { Injectable } from '@angular/core';
import {
  Query,
  QueryNotifier,
  QueryService,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  CustomerTicketingFacade,
  GetTicketQueryReloadEvent,
  GetTicketQueryResetEvent,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CustomerTicketingConnector } from '../connectors';

@Injectable()
export class CustomerTicketingService implements CustomerTicketingFacade {
  /**
   * Returns the reload events for the getTicket query.
   */
  protected getTicketQueryReloadEvents(): QueryNotifier[] {
    return [GetTicketQueryReloadEvent];
  }
  /**
   * Returns the reset events for the getTicket query.
   */
  protected getTicketQueryResetEvents(): QueryNotifier[] {
    return [GetTicketQueryResetEvent];
  }

  protected getTicketQuery$: Query<TicketDetails | undefined> =
    this.queryService.create<TicketDetails | undefined>(
      () =>
        this.checkTicketPreConditions().pipe(
          switchMap(([customerId, ticketId]) =>
            this.customerTicketingConnector.getTicket(customerId, ticketId)
          )
        ),
      {
        reloadOn: this.getTicketQueryReloadEvents(),
        resetOn: this.getTicketQueryResetEvents(),
      }
    );

  constructor(
    protected queryService: QueryService,
    protected userIdService: UserIdService,
    protected customerTicketingConnector: CustomerTicketingConnector,
    protected routingService: RoutingService
  ) {}

  protected checkTicketPreConditions(): Observable<[string, string]> {
    return combineLatest([
      this.userIdService.getUserId(),
      this.routingService.getParams(),
    ]).pipe(
      take(1),
      map(([userId, routingParams]) => {
        if (!userId || !routingParams) {
          throw new Error('Customer tickets pre conditions not met');
        }
        return [userId, routingParams.ticketCode];
      })
    );
  }

  getTicket(): Observable<TicketDetails | undefined> {
    return this.getTicketQuery$.getState().pipe(map((state) => state.data));
  }
}
