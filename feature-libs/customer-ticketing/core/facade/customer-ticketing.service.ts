import { Injectable } from '@angular/core';
import {
  Query,
  QueryNotifier,
  QueryService,
  QueryState,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  CustomerTicketingFacade,
  GetTicketQueryReloadEvent,
  GetTicketQueryResetEvent,
  GetTicketsQueryReloadEvents,
  GetTicketsQueryResetEvents,
  TicketDetails,
  TicketList,
} from '@spartacus/customer-ticketing/root';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';
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

  /**
   * Returns the reload events for the getTickets query.
   */
  protected getTicketsQueryReloadEvents(): QueryNotifier[] {
    return [GetTicketsQueryReloadEvents];
  }

  /**
   * Returns the reset events for the getTickets query.
   */
  protected getTicketsQueryResetEvents(): QueryNotifier[] {
    return [GetTicketsQueryResetEvents];
  }

  protected getTicketQuery$: Query<TicketDetails | undefined> =
    this.queryService.create<TicketDetails | undefined>(
      () =>
        this.customerTicketingPreConditions().pipe(
          switchMap(([customerId, ticketId]) =>
            this.customerTicketingConnector.getTicket(customerId, ticketId)
          )
        ),
      {
        reloadOn: this.getTicketQueryReloadEvents(),
        resetOn: this.getTicketQueryResetEvents(),
      }
    );

  protected getTicketsQuery$: Query<TicketList | undefined> =
    this.queryService.create<TicketList | undefined>(
      () =>
        this.customerTicketingListPreConditions().pipe(
          switchMap((customerId) =>
            this.customerTicketingConnector.getTickets(customerId)
          )
        ),
      {
        reloadOn: this.getTicketsQueryReloadEvents(),
        resetOn: this.getTicketsQueryResetEvents(),
      }
    );

  constructor(
    protected queryService: QueryService,
    protected userIdService: UserIdService,
    protected customerTicketingConnector: CustomerTicketingConnector,
    protected routingService: RoutingService
  ) {}

  protected customerTicketingPreConditions(): Observable<[string, string]> {
    return combineLatest([
      this.userIdService.getUserId(),
      this.routingService.getParams().pipe(
        map((params) => params.ticketCode),
        distinctUntilChanged()
      ),
    ]).pipe(
      take(1),
      map(([userId, ticketId]) => {
        if (!userId || !ticketId) {
          throw new Error('Customer ticketing pre conditions not met');
        }
        return [userId, ticketId];
      })
    );
  }

  protected customerTicketingListPreConditions(): Observable<string> {
    return this.userIdService.getUserId().pipe(
      take(1),
      map((userId) => {
        if (!userId) {
          throw new Error('Customer ticketing list pre conditions not met');
        }
        return userId;
      })
    );
  }

  getTicketState(): Observable<QueryState<TicketDetails | undefined>> {
    return this.getTicketQuery$.getState();
  }

  getTicket(): Observable<TicketDetails | undefined> {
    return this.getTicketState().pipe(map((state) => state.data));
  }

  getTicketsState(): Observable<QueryState<TicketList | undefined>> {
    return this.getTicketsQuery$.getState();
  }

  getTickets(): Observable<TicketList | undefined> {
    return this.getTicketsState().pipe(map((state) => state.data));
  }
}
