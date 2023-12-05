import { Command, CommandService, EventService, Query, QueryNotifier, QueryService, QueryState, RoutingService, UserIdService } from '@spartacus/core';
import { AssociatedObject, Category, CustomerTicketingFacade, TicketDetails, TicketEvent, TicketList, TicketStarter } from '@spartacus/customer-ticketing/root';
import { Observable } from 'rxjs';
import { CustomerTicketingConnector } from '../connectors/customer-ticketing.connector';
import * as i0 from "@angular/core";
export declare class CustomerTicketingService implements CustomerTicketingFacade {
    protected queryService: QueryService;
    protected commandService: CommandService;
    protected userIdService: UserIdService;
    protected customerTicketingConnector: CustomerTicketingConnector;
    protected routingService: RoutingService;
    protected eventService: EventService;
    protected getTicketCategoriesQueryReloadEvents(): QueryNotifier[];
    protected getTicketCategoriesQueryResetEvents(): QueryNotifier[];
    protected getTicketAssociatedObjectsQueryReloadEvents(): QueryNotifier[];
    protected getTicketAssociatedObjectsQueryResetEvents(): QueryNotifier[];
    protected getTicketQueryReloadEvents(): QueryNotifier[];
    protected getTicketQueryResetEvents(): QueryNotifier[];
    protected getTicketsQueryReloadEvents(): QueryNotifier[];
    protected getTicketsQueryResetEvents(): QueryNotifier[];
    protected createTicketCommand: Command<TicketStarter, TicketDetails>;
    protected createTicketEventCommand: Command<{
        ticketEvent: TicketEvent;
        containsAttachment?: boolean;
    }, TicketEvent>;
    protected uploadAttachmentCommand: Command<{
        file: File;
        eventCode: string;
        ticketId?: string;
    }>;
    protected downloadAttachmentCommand: Command<{
        eventCode: string;
        attachmentId: string;
    }>;
    protected getTicketQuery$: Query<TicketDetails | undefined>;
    protected getTicketsQuery$(pageSize: number, currentPage: number, sort: string): Query<TicketList | undefined>;
    protected getTicketCategoriesQuery: Query<Category[]>;
    protected getTicketAssociatedObjectsQuery: Query<AssociatedObject[]>;
    protected customerTicketingPreConditions(): Observable<[string, string]>;
    protected customerTicketingListPreConditions(): Observable<string>;
    constructor(queryService: QueryService, commandService: CommandService, userIdService: UserIdService, customerTicketingConnector: CustomerTicketingConnector, routingService: RoutingService, eventService: EventService);
    getTicketAssociatedObjectsState(): Observable<QueryState<AssociatedObject[]>>;
    getTicketAssociatedObjects(): Observable<AssociatedObject[]>;
    getTicketCategoriesState(): Observable<QueryState<Category[]>>;
    getTicketCategories(): Observable<Category[]>;
    getTicketState(): Observable<QueryState<TicketDetails | undefined>>;
    getTicket(): Observable<TicketDetails | undefined>;
    createTicket(ticketStarted: TicketStarter): Observable<TicketStarter | TicketDetails>;
    getTicketsState(pageSize: number, currentPage: number, sort: string): Observable<QueryState<TicketList | undefined>>;
    getTickets(pageSize: number, currentPage: number, sort: string): Observable<TicketList | undefined>;
    createTicketEvent(ticketEvent: TicketEvent, containsAttachment?: boolean): Observable<TicketEvent>;
    uploadAttachment(file: File, eventCode: string, ticketId?: string): Observable<unknown>;
    downloadAttachment(eventCode: string, attachmentId: string): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerTicketingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CustomerTicketingService>;
}
