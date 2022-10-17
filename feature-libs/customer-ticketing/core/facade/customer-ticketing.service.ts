import { Injectable } from '@angular/core';
import {
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  Query,
  QueryNotifier,
  QueryService,
  QueryState,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  AssociatedObject,
  Category,
  CreateEvent,
  CustomerTicketingFacade,
  GetTicketAssociatedObjectsQueryReloadEvent,
  GetTicketAssociatedObjectsQueryResetEvent,
  GetTicketCategoryQueryReloadEvent,
  GetTicketCategoryQueryResetEvent,
  GetTicketQueryReloadEvent,
  GetTicketQueryResetEvent,
  Ticket,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';
import { combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { CustomerTicketingConnector } from '../connectors';

@Injectable()
export class CustomerTicketingService implements CustomerTicketingFacade {
  getTicketCategoriesQueryReloadEvents(): QueryNotifier[] {
    return [GetTicketCategoryQueryReloadEvent];
  }
  getTicketCategoriesQueryResetEvents(): QueryNotifier[] {
    return [GetTicketCategoryQueryResetEvent];
  }
  getTicketAssociatedObjectsQueryReloadEvents(): QueryNotifier[] {
    return [GetTicketAssociatedObjectsQueryReloadEvent];
  }
  getTicketAssociatedObjectsQueryResetEvents(): QueryNotifier[] {
    return [GetTicketAssociatedObjectsQueryResetEvent];
  }
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

  protected createTicketCommand: Command<Ticket, unknown> =
    this.commandService.create<Ticket>(
      (ticket) =>
        this.customerTicketingPreConditions().pipe(
          switchMap(([customerId]) =>
            this.customerTicketingConnector
              .createTicket(customerId, ticket)
              .pipe(tap(() => this.eventService.dispatch({}, CreateEvent)))
          )
        ),
      {
        strategy: CommandStrategy.Queue,
      }
    );

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
  protected getTicketCategoriesQuery: Query<Category[]> =
    this.queryService.create(
      () => this.customerTicketingConnector.getTicketCategories(),
      {
        reloadOn: this.getTicketCategoriesQueryReloadEvents(),
        resetOn: this.getTicketCategoriesQueryResetEvents(),
      }
    );
  protected getTicketAssociatedObjectsQuery: Query<AssociatedObject[]> =
    this.queryService.create(
      () =>
        this.customerTicketingPreConditions().pipe(
          switchMap(([customerId]) =>
            this.customerTicketingConnector.getTicketAssociatedObjects(
              customerId
            )
          )
        ),
      {
        reloadOn: this.getTicketAssociatedObjectsQueryReloadEvents(),
        resetOn: this.getTicketAssociatedObjectsQueryResetEvents(),
      }
    );

  constructor(
    protected queryService: QueryService,
    protected userIdService: UserIdService,
    protected customerTicketingConnector: CustomerTicketingConnector,
    protected routingService: RoutingService,
    protected commandService: CommandService,
    protected eventService: EventService
  ) {}

  getTicketAssociatedObjectsState(): Observable<
    QueryState<AssociatedObject[]>
  > {
    return this.getTicketAssociatedObjectsQuery.getState();
  }
  getTicketAssociatedObjects(): Observable<AssociatedObject[]> {
    return this.getTicketAssociatedObjectsState().pipe(
      map((state) => state.data ?? [])
    );
  }

  getTicketCategoriesState(): Observable<QueryState<Category[]>> {
    return this.getTicketCategoriesQuery.getState();
  }

  getTicketCategories(): Observable<Category[]> {
    return this.getTicketCategoriesState().pipe(
      map((state) => state.data ?? [])
    );
  }

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
        if (!userId) {
          throw new Error('Customer ticketing pre conditions not met');
        }
        return [userId, ticketId];
      })
    );
  }

  getTicketState(): Observable<QueryState<TicketDetails | undefined>> {
    return this.getTicketQuery$.getState();
  }

  getTicket(): Observable<TicketDetails | undefined> {
    return this.getTicketState().pipe(map((state) => state.data));
  }

  createTicket(ticket: Ticket): Observable<Ticket | unknown> {
    return this.createTicketCommand.execute(ticket);
  }
}
