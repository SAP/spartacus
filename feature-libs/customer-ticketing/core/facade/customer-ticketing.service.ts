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
  WindowRef,
} from '@spartacus/core';
import {
  AssociatedObject,
  Category,
  CustomerTicketingFacade,
  GetTicketAssociatedObjectsQueryReloadEvent,
  GetTicketAssociatedObjectsQueryResetEvent,
  GetTicketCategoryQueryReloadEvent,
  GetTicketCategoryQueryResetEvent,
  GetTicketQueryReloadEvent,
  GetTicketQueryResetEvent,
  GetTicketsQueryReloadEvents,
  GetTicketsQueryResetEvents,
  TicketDetails,
  TicketEvent,
  TicketEventCreatedEvent,
  TicketList,
  TicketStarter,
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

  protected createTicketCommand: Command<TicketStarter, unknown> =
    this.commandService.create<TicketStarter>(
      (ticket) =>
        this.customerTicketingPreConditions().pipe(
          switchMap(([customerId]) =>
            this.customerTicketingConnector.createTicket(customerId, ticket)
          )
        ),
      {
        strategy: CommandStrategy.Queue,
      }
    );
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

  protected createTicketEventCommand: Command<TicketEvent, unknown> =
    this.commandService.create<TicketEvent>(
      (ticketEvent) =>
        this.customerTicketingPreConditions().pipe(
          switchMap(([customerId, ticketId]) =>
            this.customerTicketingConnector
              .createTicketEvent(customerId, ticketId, ticketEvent)
              .pipe(
                tap(() => {
                  if (ticketEvent.toStatus?.id)
                    this.eventService.dispatch(
                      { status: ticketEvent.toStatus?.id },
                      TicketEventCreatedEvent
                    );
                })
              )
          )
        ),
      {
        strategy: CommandStrategy.Queue,
      }
    );

  protected uploadAttachmentCommand: Command<{
    file: File | null;
    eventCode: string;
    ticketId?: string;
  }> = this.commandService.create<{
    file: File;
    eventCode: string;
    ticketId: string;
  }>(
    (payload) =>
      this.customerTicketingPreConditions().pipe(
        switchMap(([customerId, ticketId]) =>
          this.customerTicketingConnector
            .uploadAttachment(
              customerId,
              payload.ticketId ?? ticketId,
              payload.eventCode,
              payload.file
            )
            .pipe(
              tap(() =>
                this.eventService.dispatch({ status }, TicketEventCreatedEvent)
              )
            )
        )
      ),
    {
      strategy: CommandStrategy.Queue,
    }
  );

  protected downloadAttachmentCommand: Command<{
    eventCode: string;
    attachmentId: string;
  }> = this.commandService.create<{
    eventCode: string;
    attachmentId: string;
  }>(
    (payload) =>
      this.customerTicketingPreConditions().pipe(
        switchMap(([customerId, ticketId]) =>
          this.customerTicketingConnector.downloadAttachment(
            customerId,
            ticketId,
            payload.eventCode,
            payload.attachmentId
          )
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

  getTicketsQuery$(
    pageSize: number,
    currentPage: number,
    sort: string
  ): Query<TicketList | undefined> {
    return this.queryService.create<TicketList | undefined>(
      () =>
        this.customerTicketingListPreConditions().pipe(
          switchMap((customerId) =>
            this.customerTicketingConnector.getTickets(
              customerId,
              pageSize,
              currentPage,
              sort
            )
          )
        ),
      {
        reloadOn: this.getTicketsQueryReloadEvents(),
        resetOn: this.getTicketsQueryResetEvents(),
      }
    );
  }

  constructor(
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected userIdService: UserIdService,
    protected customerTicketingConnector: CustomerTicketingConnector,
    protected routingService: RoutingService,
    protected eventService: EventService,
    protected windowRef: WindowRef
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

  createTicket(ticket: TicketStarter): Observable<TicketStarter | unknown> {
    return this.createTicketCommand.execute(ticket);
  }
  getTicketsState(
    pageSize: number,
    currentPage: number,
    sort: string
  ): Observable<QueryState<TicketList | undefined>> {
    return this.getTicketsQuery$(pageSize, currentPage, sort).getState();
  }

  getTickets(
    pageSize: number,
    currentPage: number,
    sort: string
  ): Observable<TicketList | undefined> {
    return this.getTicketsState(pageSize, currentPage, sort).pipe(
      map((state) => state.data)
    );
  }

  createTicketEvent(
    ticketEvent: TicketEvent
  ): Observable<TicketEvent | unknown> {
    return this.createTicketEventCommand.execute(ticketEvent);
  }

  uploadAttachment(
    file: File | null,
    eventCode: string,
    ticketId?: string
  ): Observable<unknown> {
    return this.uploadAttachmentCommand.execute({ file, eventCode, ticketId });
  }

  downloadAttachment(
    eventCode: string,
    attachmentId: string
  ): Observable<unknown> {
    return this.downloadAttachmentCommand.execute({
      eventCode,
      attachmentId,
    });
  }
}
