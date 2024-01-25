/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  HttpErrorModel,
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
  GetTicketCategoryQueryReloadEvent,
  GetTicketCategoryQueryResetEvent,
  GetTicketQueryReloadEvent,
  GetTicketQueryResetEvent,
  GetTicketsQueryReloadEvents,
  GetTicketsQueryResetEvents,
  NewMessageEvent,
  STATUS,
  TicketClosedEvent,
  TicketCreatedEvent,
  TicketDetails,
  TicketEvent,
  TicketList,
  TicketReopenedEvent,
  TicketStarter,
  UploadAttachmentSuccessEvent,
} from '@spartacus/customer-ticketing/root';
import { combineLatest, Observable, of, throwError } from 'rxjs';
import {
  concatMap,
  distinctUntilChanged,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { CustomerTicketingConnector } from '../connectors/customer-ticketing.connector';

@Injectable()
export class CustomerTicketingService implements CustomerTicketingFacade {
  protected getTicketCategoriesQueryReloadEvents(): QueryNotifier[] {
    return [GetTicketCategoryQueryReloadEvent];
  }
  protected getTicketCategoriesQueryResetEvents(): QueryNotifier[] {
    return [GetTicketCategoryQueryResetEvent];
  }
  protected getTicketAssociatedObjectsQueryReloadEvents(): QueryNotifier[] {
    return [GetTicketAssociatedObjectsQueryReloadEvent];
  }
  protected getTicketAssociatedObjectsQueryResetEvents(): QueryNotifier[] {
    return [GetTicketAssociatedObjectsQueryResetEvent];
  }

  protected getTicketQueryReloadEvents(): QueryNotifier[] {
    return [GetTicketQueryReloadEvent];
  }

  protected getTicketQueryResetEvents(): QueryNotifier[] {
    return [GetTicketQueryResetEvent];
  }

  protected getTicketsQueryReloadEvents(): QueryNotifier[] {
    return [GetTicketsQueryReloadEvents];
  }

  protected getTicketsQueryResetEvents(): QueryNotifier[] {
    return [GetTicketsQueryResetEvents];
  }

  protected createTicketCommand: Command<TicketStarter, TicketDetails> =
    this.commandService.create<TicketStarter, TicketDetails>(
      (ticketStarted) =>
        this.customerTicketingPreConditions().pipe(
          switchMap(([customerId]) =>
            this.customerTicketingConnector.createTicket(
              customerId,
              ticketStarted
            )
          ),
          tap(() => {
            this.eventService.dispatch({}, TicketCreatedEvent);
          })
        ),
      {
        strategy: CommandStrategy.Queue,
      }
    );

  protected createTicketEventCommand: Command<
    { ticketEvent: TicketEvent; containsAttachment?: boolean },
    TicketEvent
  > = this.commandService.create<
    { ticketEvent: TicketEvent; containsAttachment?: boolean },
    TicketEvent
  >(
    (payload) =>
      this.customerTicketingPreConditions().pipe(
        switchMap(([customerId, ticketId]) =>
          this.customerTicketingConnector
            .createTicketEvent(customerId, ticketId, payload.ticketEvent)
            .pipe(
              tap(() => {
                if (payload.ticketEvent.toStatus?.id === STATUS.CLOSED) {
                  this.eventService.dispatch({}, TicketClosedEvent);
                } else if (!payload.containsAttachment) {
                  if (
                    payload.ticketEvent.toStatus?.id === STATUS.OPEN ||
                    payload.ticketEvent.toStatus?.id === STATUS.INPROCESS
                  ) {
                    this.eventService.dispatch({}, TicketReopenedEvent);
                  } else {
                    this.eventService.dispatch({}, NewMessageEvent);
                  }
                }
              })
            )
        )
      ),
    {
      strategy: CommandStrategy.Queue,
    }
  );

  protected uploadAttachmentCommand: Command<{
    file: File;
    eventCode: string;
    ticketId?: string;
  }> = this.commandService.create<{
    file: File;
    eventCode: string;
    ticketId?: string;
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
                this.eventService.dispatch({}, UploadAttachmentSuccessEvent)
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
  }> = this.commandService.create<{ eventCode: string; attachmentId: string }>(
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

  protected getTicketsQuery$(
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

  constructor(
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected userIdService: UserIdService,
    protected customerTicketingConnector: CustomerTicketingConnector,
    protected routingService: RoutingService,
    protected eventService: EventService
  ) {}

  getTicketAssociatedObjectsState(): Observable<
    QueryState<AssociatedObject[]>
  > {
    return this.getTicketAssociatedObjectsQuery.getState();
  }
  getTicketAssociatedObjects(): Observable<AssociatedObject[]> {
    return this.getTicketAssociatedObjectsState().pipe(
      concatMap((state) =>
        state?.error ? throwError(state.error as HttpErrorModel) : of(state)
      ),
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

  getTicketState(): Observable<QueryState<TicketDetails | undefined>> {
    return this.getTicketQuery$.getState();
  }

  getTicket(): Observable<TicketDetails | undefined> {
    return this.getTicketState().pipe(map((state) => state.data));
  }

  createTicket(
    ticketStarted: TicketStarter
  ): Observable<TicketStarter | TicketDetails> {
    return this.createTicketCommand.execute(ticketStarted);
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
    ticketEvent: TicketEvent,
    containsAttachment = false
  ): Observable<TicketEvent> {
    return this.createTicketEventCommand.execute({
      ticketEvent,
      containsAttachment,
    });
  }

  uploadAttachment(
    file: File,
    eventCode: string,
    ticketId?: string
  ): Observable<unknown> {
    return this.uploadAttachmentCommand.execute({ file, eventCode, ticketId });
  }

  downloadAttachment(
    eventCode: string,
    attachmentId: string
  ): Observable<unknown> {
    return this.downloadAttachmentCommand.execute({ eventCode, attachmentId });
  }
}
