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
  AssociatedObject,
  Category,
  CustomerTicketingFacade,
  GetTicketAssociatedObjectsQueryReloadEvent,
  GetTicketAssociatedObjectsQueryResetEvent,
  GetTicketCatQueryReloadEvent,
  GetTicketCatQueryResetEvent,
  GetTicketQueryReloadEvent,
  GetTicketQueryResetEvent,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';
import { CustomerTicketingConnector } from '../connectors';

@Injectable()
export class CustomerTicketingService implements CustomerTicketingFacade {
  getTicketCategoriesQueryReloadEvents(): QueryNotifier[] {
    return [GetTicketCatQueryReloadEvent];
  }
  getTicketCategoriesQueryResetEvents(): QueryNotifier[] {
    return [GetTicketCatQueryResetEvent];
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
        this.customerTicketingAssociatedObjectsPreConditions().pipe(
          switchMap((customerId) =>
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
    protected routingService: RoutingService
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
  getTicketCategories(): Observable<Category[]> {
    return this.getTicketCategoriesState().pipe(
      map((state) => state.data ?? [])
    );
  }

  getTicketCategoriesState(): Observable<QueryState<Category[]>> {
    return this.getTicketCategoriesQuery.getState();
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
        if (!userId || !ticketId) {
          throw new Error('Customer ticketing pre conditions not met');
        }
        return [userId, ticketId];
      })
    );
  }
  protected customerTicketingAssociatedObjectsPreConditions(): Observable<string> {
    return this.userIdService.getUserId().pipe(
      take(1),
      map((userId) => {
        if (!userId) {
          throw new Error(
            'Customer ticketing associated objects pre conditions not met'
          );
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
}
